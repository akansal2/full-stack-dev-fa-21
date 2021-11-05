var jwt = require('jsonwebtoken');
const db = require('./db')

function getList(req, res) {
    console.log(req.get("token"));
    //TODO: check if there is a token
    jwt.verify(req.get("token"), "privateKey", function(err, decoded) {
        console.log(decoded.username);
        db.User.findOne(
            {username: decoded.username},
            function (error, result) {
                // TODO: check error
                if (!result) {
                    res.status(401).json({
                        error: "user doesn't exist"
                    });
                } else {
                    res.json({
                        shoppingList: result.shoppinglist
                    })
                }             
            }
        )
    
      });
}

function addItem(req, res) {
    jwt.verify(req.get("token"), "privateKey", function(err, decoded) {
        console.log(decoded.username);
        db.User.updateOne(
            {username: decoded.username},
            { $push: { shoppinglist: req.body.item} },
            function (error, result) {
                // TODO: check error
                db.User.findOne(
                    {username: decoded.username},
                    function (error, result) {
                        // TODO: check error
                        if (!result) {
                            res.status(401).json({
                                error: "user doesn't exist"
                            });
                        } else {
                            res.json({
                                shoppingList: result.shoppinglist
                            })
                        }             
                    }
                )
        
            }
        )
    
      });

}

function deleteItem(req,res) {
    jwt.verify(req.get("token"), "privateKey", function(err, decoded) {
        console.log(decoded.username);
        db.User.updateOne(
            {username: decoded.username},
            { $pull: { shoppinglist: req.body.item} },
            function (error, result) {
                // TODO: check error
                db.User.findOne(
                    {username: decoded.username},
                    function (error, result) {
                        // TODO: check error
                        if (!result) {
                            res.status(401).json({
                                error: "user doesn't exist"
                            });
                        } else {
                            res.json({
                                shoppingList: result.shoppinglist
                            })
                        }             
                    }
                )
        
            }
        )
    
      });

}

module.exports = {getList, addItem, deleteItem};