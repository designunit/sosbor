import { IndexPage } from '@/components/IndexPage'

export default function Page({ data }: { data?: any }) {
    return (
        <IndexPage
        // data={data}
        />
    )
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//     const query = {
//         limit: 1000,
//     }
//     let dataCms = await fetch(
//         `${process.env.BACKEND_URL}/api/news${qs.stringify({ where: query }, { addQueryPrefix: true })}`,
//         {
//             method: 'get',
//         },
//     )
//         .then(async res => await res.json())
//         .catch(err => console.log(err))

//     const data = dataCms.docs.map(x => ({
//         id: x.id,
//         image: x.image,
//         title: x.title,
//     }))

//     return {
//         props: {
//             data,
//         },
//     }
// }