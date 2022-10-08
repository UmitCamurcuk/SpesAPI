const router = require('express').Router();
const itemtypeModel = require('../Models/ItemTypeModel');


// GET all ItemTypes
router.get('/getItemTypes' , async (req,res) => {
    const allItemTypes = await itemtypeModel.find()
    .populate("Attributes")
    .populate("CreatedUser", 'Name LastName UserName Role')
    .populate("UpdatedUser", 'Name LastName UserName Role');

    if(!allItemTypes) return res.status(200).send('There is no ItemTypes')

    return res.status(200).send(allItemTypes);
 })

 //GET Filtered ItemTypes
 router.get('/getItemType' , async (req,res) => {
    const allItemTypes = await itemtypeModel.find({
        Code : req.query?.Code,
        });
        
    if(!allItemTypes) return res.status(200).send('There is no ItemTypes')

    return res.status(200).send(allItemTypes);
 })


//Create a new ItemTypes
router.post('/createItemType' , async (req,res) => {
   //Check if there is already this item created.
   const itemTypeExist = await itemtypeModel.findOne({Code : req.body.Code })
   if(itemTypeExist) return res.status(200).send("This ItemType Code Already Exist !")

    //Create new itemtypeModel with itemtypeModel
    const newItemType =  new itemtypeModel({
        Name : req.body.Name,
        Code: req.body.Code,
        Attributes : req.body.Attributes,
        ShowOnNavbar : req.body.ShowOnNavbar,
        CreatedUser : req.body.CreatedUser,
        UpdatedUser : req.body.UpdatedUser
    })

    //Try to save this data to DB
    try {
        const savedItemType = await newItemType.save();
        res.send(savedItemType);

    } catch (err) {
        res.status(400).send(err);
    }
    
})


module.exports = router;