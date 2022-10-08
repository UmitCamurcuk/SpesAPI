const jwt = require('jsonwebtoken');

module.exports = function (req,res,next)  {
    const token = req.headers['authorization'];

    if(!token) return res.status(403).send({Message: 'There is no Token Found in your Request !'})

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err) return res.status(403).send(err)
        req.User = {
            UserName : user.UserName,
            Role : user.Role,
            iat : user.iat,
            exp : user.exp
        }
        next();
    })
}