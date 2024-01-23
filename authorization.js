const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Get config vars
dotenv.config();

let User = require(__dirname + '/models/user.js');

let protectRoute = role => {
    return (req, res, next) => {
        let token = req.headers['authorization'];
        if (token) {
            //We omit the "Bearer " part
            token = token.substring(7);
            let result = jwt.verify(token, process.env.TOKEN_SECRET);
            User.findOne({email: result.login})
            .then(result => {
                if (result && (role === "" || result.role === "admin" || role === result.role))
                    next();
                else
                    res.status(401)
                        .send({ok: false, error: "Unauthorized user"});  
            }).catch(error => {
                res.status(400)
                    .send({ok: false, error: "User not found"});
            });
                  
        } else 
            res.status(401)
                .send({ok: false, error: "Unauthorized user"});        
    }
};
exports.protectRoute = protectRoute;