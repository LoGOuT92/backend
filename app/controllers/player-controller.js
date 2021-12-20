const Player = require('../db/models/player');



class PlayerControler{
    async createPlayer(req,res){
        const player = new Player({
            Name: req.body.Name,
            SurName: req.body.SurName,
            Number: req.body.Number,
            Positions: req.body.Positions,
        })
        console.log(player)
        try{
            await player.save();
        }catch(err){
            return res.status(422).json({ message: err.message });
        }
        res.status(201).json(player);
    }
    async getPlayers(req, res){
        const players = await Player.find()
        res.status(200).json({ players})
    }
    async getPlayer(req, res){
        const {SurName} = req.params
        try{
            const player = await Player.findOne({SurName:SurName})
            res.status(200).json({ player})
        }catch(err){
            console.log(err);
        }
    }
    async deletePlayer(req, res){
        const {_id} = req.params
        try{
            await Player.findOneAndDelete({_id:_id})
            res.sendStatus(204);
        }catch(e){
            console.log(e);
        }
    }
    async editPlayer(req, res){
        const {_id}=req.params;
        const playerData = await Player.findOne({_id: _id})
        console.log(playerData)
        playerData.Name = req.body.Name;
        playerData.SurName = req.body.SurName;
        playerData.Number = req.body.Number;
        playerData.Positions = req.body.Positions;
        try{
            console.log(playerData)
            await playerData.save()
        }catch(err){
            return res.status(422).json({ message: err.message });
        }
        res.status(201).json(playerData);
    }

}

module.exports = new PlayerControler();
