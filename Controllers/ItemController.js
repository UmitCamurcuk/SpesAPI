const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const itemModel = require('../Models/ItemModel');
const ItemTypeModel = require('../Models/ItemTypeModel');
const itemValueModel = require('../Models/ItemValuesModel');
const VerifyToken = require('../Auth/VerifyToken');

// GET all Items
router.get('/getItems', async (req, res) => {
  const allItems = await itemModel.find()
    .populate('ItemType');
  if (!allItems) return res.status(200).send('There is no Item')

  return res.status(200).send(allItems);
})

//Get Items Table Items with ItemType 
router.get('/getTableItems', async (req, res) => {
  const itemType = await ItemTypeModel.findOne({ Code: req.query.itemType })
  if(!itemType) return res.status(400).send({error:'1'})

  const items = await itemModel.find({ ItemType: itemType._id })
  .populate('UpdatedUser', 'UserName')
  res.status(200).send(items);
})

router.get('/test2', VerifyToken, async (req, res) => {
  itemModel.aggregate(
    [
      {
        $match: { Code: 'UmitHesapCode11223' }
      },
      {
        $lookup:
        {
          from: "itemvalues",
          localField: "_id",
          foreignField: "Item",
          as: "ItemValues"
        },
      },
      {
        $group: {
          _id: "$_id"
        }
      }
    ]
  )
    .exec((err, result) => {
      if (err) return res.status(400).send(err)
      res.status(200).send(result)
    })
})

//TEST GET REQUEST
router.get('/test', VerifyToken, async (req, res) => {
  itemModel.aggregate([
    {
      $lookup:
      {
        from: "itemvalues",
        localField: "_id",
        foreignField: "Item",
        as: "ItemValues"
      },
    },
    {
      $project: {
        Name: 1,
        Code: 1,
        Type: 1,
        Family: 1,
        CreatedOn: 1,
        UpdatedOn: 1,
        CratedUser: 1,
        UpdatedUser: 1,
        "ItemValues.Attribute": 1,
        "ItemValues.Value": 1,
      }
    }
  ])
    .exec((err, result) => {
      if (err) return res.status(400).send(err)

      res.status(200).send(result)
    })
})



//Get ItemsTable Data
router.get('/getFilteredItems', VerifyToken, async (req, res) => {
  //first Check itemType name exist from the ItemType Table
  var isItemTypeExist = await ItemTypeModel.findOne({ Name: req.query.itemType })
  //if There is no itemType
  if (!isItemTypeExist) return res.status(200).send('There is no itemType')

  //find existing ItemTypeId
  const existItemType = isItemTypeExist._id;


  var tableData = await itemModel.find({ ItemType: existItemType })
  if (!tableData) return res.status(200).send('There is no Item');

  res.status(200).send(tableData);
})



//GET Filtered Items
router.get('/getItem', VerifyToken, async (req, res) => {

  const allItems = await itemModel.findOne({
    Code: req.query.Code,
  })
    .populate('ItemType', 'Name')
    .populate('CreatedUser', 'UserName')
    .populate('UpdatedUser', 'UserName')
    .populate('Attributes', 'Name Type Code isRequired UpdatedOn UpdatedUser');

  if (!allItems) return res.status(200).send('There is no Item')

  return res.status(200).send(allItems);
})


//Create a new Item
router.post('/createItem', VerifyToken, async (req, res) => {
  //Check if there is already this item created.
  const itemExist = await itemModel.findOne({ Code: req.body.Code })
  if (itemExist) return res.status(200).send("This Item Code Already Exist !")

  const AttributesList = req.body.Attributes;
  const AttributesId = [];


  // Create new itemModel with itemModel
  const newItem = new itemModel({
    Name: req.body.Name,
    Code: req.body.Code,
    ItemType: req.body.ItemType,
    Family: req.body.Family,
    Attributes: AttributesId,
    CreatedUser: req.body.CreatedUser,
    UpdatedUser: req.body.UpdatedUser
  })

  //Try to save this data to DB
  try {
    var savedItem = await newItem.save();


  } catch (err) {
    res.status(400).send(err);
  }

  const savedItemId = savedItem._id.toString();

  const itemValueRows = [];
  const itemValueRowsTEMP = {};
  Object.keys(AttributesList).forEach((key, value) => {
    itemValueRows.push({
      Item: savedItem._id,
      Attribute: key,
      Value: AttributesList[key],
      CreatedUser: req.body.CreatedUser,
      UpdatedUser: req.body.UpdatedUser
    })
  })

  itemValueModel.insertMany(itemValueRows)
    .then(() => {
      console.log("Data inserted")  // Success
    })

  res.status(200).send(savedItem);

})


module.exports = router;