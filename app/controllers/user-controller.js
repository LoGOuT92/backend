const User = require('../db/models/user');
const TokenDB = require('../db/models/token');
const jwt = require('jsonwebtoken');
const {ACCES_TOKEN} = require('../config');

const REFRESH_TOKEN = 'f2092982jvv09392hfjv932u4h234u3h434j3df34';


class UserControler{
    
    async createUser(req,res){
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        try {
            await user.save();
        }catch(err){
            return res.status(422).json({ message: err.message });
        }
        res.status(201).json(user);
    }
    async login(req, res) {
        
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                throw new Error('user not found');
            } 
            const isValidPassword = user.comparePassword(req.body.password);
            if (!isValidPassword) {
              throw new Error('password not valid');
            }
            //zwracam token
            const payload = user.toJSON()
            const token = jwt.sign(payload, process.env.ACCES_TOKEN,{expiresIn:'30m'});
            const refreshToken = jwt.sign(payload, REFRESH_TOKEN);
            const tokenDB = new TokenDB({
                token: refreshToken,
            })
            await tokenDB.save()
            res.status(200).json({token,refreshToken})
        }catch (e){
            res.sendStatus(403);
            console.log(e);
        }
    }
    async refleshToken (req, res){
        const { token } = req.body;
        const tokens = await TokenDB.find({token})
        if (tokens.length===0){
            return res.sendStatus(403)
        }
        jwt.verify(token, REFRESH_TOKEN, (err, data) => {
            if (err) {
              return res.sendStatus(403);
            }
            const payload ={
                email: data.email,
                username: data.username,
                password: data.password,
            }
            const token1 = jwt.sign(payload, process.env.ACCES_TOKEN,{expiresIn:'30m'});
            res.json({ token2: token1 });
          });
    }

    async logout(req, res){
        const { token } = req.body;
        await TokenDB.findOneAndDelete({token : token})
        res.sendStatus(204)
    }
}

module.exports = new UserControler();
