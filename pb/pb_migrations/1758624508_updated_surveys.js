/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1056657741")

  // update collection data
  unmarshal({
    "createRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1056657741")

  // update collection data
  unmarshal({
    "createRule": "@request.body.data:isset = true"
  }, collection)

  return app.save(collection)
})
