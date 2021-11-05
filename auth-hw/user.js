var jwt = require('jsonwebtoken');
const db = require('./db')

// TODO: validate username and password
function signUpUser(req, res) {
    db.User.update(
        {username: req.body.username},
        {username: req.body.username,
        password: req.body.password},
        {upsert: true},
        function (error, result) {
            // TODO: check error
            jwt.sign({"username": req.body.username}, "privateKey", function(err, token) {
                console.log(req.body);
                // TODO: check error
                res.json({
                    "token": token
                });
              });              
        }
    )
}

function loginUser(req, res) {
    db.User.findOne(
        {username: req.body.username},
        function (error, result) {
            // TODO: check error
            if (!result) {
                res.status(401).json({
                    error: "user doesn't exist"
                });
            } else {
                if (req.body.password === result.password) {
                    jwt.sign({"username": req.body.username}, "privateKey", function(err, token) {
                        console.log(req.body);
                        // TODO: check error
                        res.json({
                            "token": token
                        });
                    }); 
                } else {
                    res.status(401).json({
                        error: "password doesn't match"
                    });
                
                }
            }             
        }
    )
}

module.exports = {signUpUser, loginUser};