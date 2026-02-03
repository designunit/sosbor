# set up payload on vps
### Note: login to ghcr before these steps
```sh
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```
Create network:  
```sh
docker network create payload
```
Create volume for payload:
```sh
docker volume create payload-volume
```
Mongo:  
```sh
docker run -d --network payload --restart unless-stopped --network-alias mongo -p 27017:27017 -v ${PWD}/data:/data/db mongo:latest --storageEngine=wiredTiger
```
Payload:  
```sh
docker run -d --mount source=payload-volume,target=/home/node/ --network payload --restart unless-stopped -e DATABASE_URI=mongodb://mongo/payload-template-blank -e PAYLOAD_SECRET=f98812f27f5d0d98054efaf9b -p 3000:3000 ghcr.io/designunit/shali-payload:latest
#docker run -d --network payload --restart unless-stopped -e DATABASE_URI=mongodb://mongo/payload-template-blank -e PAYLOAD_SECRET=<your secret> -p 3000:3000 ghcr.io/designunit/shali-payload:latest
```

Note: payload secret is arbitrary and generated manually.  

Watchtower:
```sh
docker run -d --restart always --name watchtower -v $HOME/.docker/config.json:/config.json -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --debug --interval 10
```
