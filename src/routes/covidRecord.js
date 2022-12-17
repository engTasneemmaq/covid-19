const express = require("express");

const {recordCollection} = require("../module/index");
const recordRouter = express.Router();
const bearer=require("../middlewares/bearer");
recordRouter.get("/record",bearer,getAll);
recordRouter.post("/record",bearer,creatRecord);
recordRouter.put("/record/:id",bearer,updating);
recordRouter.delete("/record/:id",bearer,deleting);
recordRouter.get("/record/:id",bearer,getOneRecored);

//create record
async function creatRecord(req,res){
let newrecord =req.body;
let newRecored=await recordCollection.create(newrecord);
res.status(201).json(newRecored);


}
///////////select *//////////////////
async function getAll(req,res){
    let record = await recordCollection.get();
    res.status(200).json(record);

}

///////////////update/////////
async function updating(req,res){

    let id = parseInt(req.params.id);
    let newRecored = req.body;
    let found = await recordCollection.get(id);
    if (found) {
        let updated = await found.update(newRecored);
        res.status(201).json(updated);
    }
}
/////////////delete///////////////
async function deleting(req,res){

    let id = parseInt(req.params.id);
    let deleted = await recordCollection.delete(id);
    res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req,res)
{
    const id = parseInt(req.params.id);
    let recored = await recordCollection.get(id);
    res.status(200).json(recored);
}
module.exports=recordRouter;