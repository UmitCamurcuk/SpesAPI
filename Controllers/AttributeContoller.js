const router = require('express').Router();
const attributeModel = require('../Models/AttributesModel');


// GET all Attributes
router.get('/getAttributes' , async (req,res) => {
    const allAttributes = await attributeModel.find()
    .populate("ItemTypes" , 'Name Code')
    .populate("CreatedUser", 'Name LastName UserName Role')
    .populate("UpdatedUser", 'Name LastName UserName Role');
    
    if(!allAttributes) return res.status(200).send('There is no Attributes')

    return res.status(200).send(allAttributes);
 })

 //GET Filtered Attributes
 router.get('/getAttribute' , async (req,res) => {
    const allAttributes = await attributeModel.findOne({
        Code : req.query.Code,
        });
        
    if(!allAttributes) return res.status(200).send('There is no Attributes')

    return res.status(200).send(allAttributes);
 })

 router.get('/test' , (req,res) => {
    res.send('test');
 })

//Create a new Attribute
router.post('/createAttribute' , async (req,res) => {
   //Check if there is already this item created.
   const attributeExist = await attributeModel.findOne({Code : req.body.Code })
   if(attributeExist) return res.status(200).send("This Attribute Code Already Exist !")

    //Create new attributeModel with attributeModel
    const newAttribute =  new attributeModel({
        Name : req.body.Name,
        Code: req.body.Code,
        Type : req.body.Type,
        ItemTypes : req.body.ItemTypes,
        isRequired : req.body.isRequired,
        CreatedUser : req.body.CreatedUser,
        UpdatedUser : req.body.UpdatedUser
    })

    //Try to save this data to DB
    try {
        const savedAttributes = await newAttribute.save();
        res.send(savedAttributes);

    } catch (err) {
        res.status(400).send(err);
    }
    
})


module.exports = router;