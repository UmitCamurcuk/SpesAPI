const router = require('express').Router();
const itemValuesModel = require('../Models/ItemValuesModel');


// GET all Attributes
router.get('/getItemValues' , async (req,res) => {
    const allItemValues = await itemValuesModel.find()
    .populate("ItemTypes" , 'Name Code')
    .populate("CreatedUser", 'Name LastName UserName Role')
    .populate("UpdatedUser", 'Name LastName UserName Role');
    
    if(!allItemValues) return res.status(200).send('There is no Attributes')

    return res.status(200).send(allItemValues);
 })



module.exports = router;