/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1324600951")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool1512114028",
    "name": "isBanned",
    "presentable": true,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1324600951")

  // update field
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
})
