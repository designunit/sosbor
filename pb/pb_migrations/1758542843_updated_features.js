/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1324600951")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool1512114028",
    "name": "isBanned",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1324600951")

  // remove field
  collection.fields.removeById("bool1512114028")

  return app.save(collection)
})
