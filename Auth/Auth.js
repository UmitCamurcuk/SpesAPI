const router = require('express').Router();
const userModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    //Check if user Exist
    const user = req.body;

    const userExist = await userModel.findOne({ UserName: user.username })
    if (!userExist) return res.status(400).send({ Error: true, Code: 400, Message: "Username is not exist" })

    if (userExist.Password != user.password) return res.status(400).send('Password is not correct')
    user.Role = userExist.Role;
    const accessToken = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRE_TIME }
    )
    res.status(200).send({
        Error: false,
        Code: 200,
        Message: 'Login Success',
        AccessToken: accessToken,
        User : 'Umit Camurcuk'
    })

})


module.exports = router;