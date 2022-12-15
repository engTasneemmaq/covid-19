'use strict';
require("dotenv").config();


async function usersUpdateRouter(req, res, next) {
  console.log("hhhhhhhhhhhh");
    try {
      console.log(req.body.fav);
      let id = parseInt(req.params.id);
      let found = await users.findOne({ where: { id:id } });
      if (found) {
        let updated = await found.update(
          {favItems: req.body.fav},
          {where: {id: req.params.id}}
         );
        res.status(201).json(updated);
      }
    } catch (e) {
    
      next(e);
    }
  }

  module.exports = usersUpdateRouter;