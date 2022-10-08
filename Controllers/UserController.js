const router = require('express').Router();
const userModel = require('../Models/UserModel');


// GET all Users
router.get('/getUsers' , async (req,res) => {
    const allUsers = await userModel.find();
    if(!allUsers) return res.status(200).send('There is no Item')

    return res.status(200).send(allUsers);
 })

 //GET Filtered Users
 router.get('/getUser' , async (req,res) => {
    const allUsers = await userModel.find({
        UserName : req.query?.UserName,
        });
        
    if(!allUsers) return res.status(200).send('There is no Item')

    return res.status(200).send(allUsers);
 })


//Create a new User
router.post('/createUser' , async (req,res) => {
   //Check if there is already this user created.
   const userExist = await userModel.findOne({UserName : req.body.UserName })
   if(userExist) return res.status(200).send("This Username Already Exist !")

    //Create new UserModel with UserModel
    const newUser =  new userModel({
        Name : req.body.Name,
        LastName: req.body.LastName,
        UserName : req.body.UserName,
        Email : req.body.Email,
        Password : req.body.Password,
        Role : req.body.Role,
        BirthDate : req.body.BirthDate,
        Location : req.body.Location,
        Phone : req.body.Phone
    })

    //Try to save this data to DB
    try {
        const savedUser = await newUser.save();
        res.send(savedUser);

    } catch (err) {
        res.status(400).send(err);
    }
    
})


module.exports = router;