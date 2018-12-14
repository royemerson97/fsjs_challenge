const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const List = require('../models/lists');

router.get('/',(req,res,next)=>{
  Item
  .find()
  .populate("list","name")
  .exec((err,items)=>{
    if (err) { console.log(err);}
    res.json({
      status : 200,
      data : items
    });
  });
});

router.get('/:item_id',(req,res,next)=>{
  Item.findById(req.params.item_id,(err,item)=>{
    if (err) { console.log(err);}
    res.json({
      status : 200,
      data : item
    });
  })
})

router.post('/', (req, res, next) => {
  let item = new Item();
  item.list = req.body.list_id;
  item.description = req.body.description;
  item.save((err) => {
    if (err) { console.log(err);}
    List.findById(req.body.list_id, (err, list) => {
      list.items.push(item._id);
      list.save((err) => {
        if (err) { console.log(err);}
        res.send({
          status: 201,
          message : "Item created"
        })
      });
    });
  });
});

router.put('/:item_id',(req,res,next)=>{
  Item.findById(req.params.item_id,(err,item)=>{
    if (err) { console.log(err);}
    item.description = req.body.description;
    item.list = req.body.list_id;
    item.save((err)=>{
      if (err) { console.log(err);}
      res.json({
        status : 200,
        message : "Item updated"
      })
    })
  })
})

router.delete('/:item_id',(req,res,next) =>{
  Item.remove({
    _id : req.params.item_id
  },(err,Item)=>{
      if (err) { console.log(err);}
      res.json({
        status : 200,
        message : "Item deleted"
      })
  });
})

module.exports = router;
