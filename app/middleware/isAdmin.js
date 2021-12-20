const {ACCES_TOKEN}=require('../config')
const jwt = require('jsonwebtoken');
const User = require('../db/models/user');

module.exports =async function isAdminMiddleware(req,res,next){
    const data= req.body;
    const user = await User.findOne({_id:data.author});
    if(!user.isAdmin){
        res.sendStatus(401);
    }
    next();
}