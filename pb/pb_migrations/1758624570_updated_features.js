/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1324600951")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json534213990",
    "maxSize": 0,
    "name": "feature",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1324600951")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json534213990",
    "maxSize": 0,
    "name": "feature",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
