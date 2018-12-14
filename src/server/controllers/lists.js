const express = require('express');
const router = express.Router();
const List = require('../models/lists');

router.get('/', (req, res, next) => {
  List.find((err, lists) => {
    if (err) { console.log('Error'); }
    res.json({
      status: 200,
      data: lists
    });
  });
});

router.get('/:list_id',(req,res,next)=>{
  List.findById(req.params.list_id,(err,list)=>{
    if (err) { console.log('Error'); }
    res.json({
      status : 200,
      data: list
    });
  });
});

router.post('/', (req, res, next) => {
  let list = new List();
  list.name = req.body.name;
  list.visible = req.body.visible;
  console.log(req.body.visible);
  list.save((err) => {
    if (err) { console.log(err); }
    res.json({
      status: 201,
      message: "List created",
    })
  })
});

router.put('/:list_id', (req, res, next) => {
  List.findById(req.params.list_id, (err, list) => {
    if (err) { console.log('Error'); }
    list.name = req.body.name;
    list.visible = req.body.visible
    list.save((err) => {
      if (err) { console.log(err); }
      res.json({
        status : 200,
        message: "List updated",     
      });
    });
  });
});

router.delete('/:list_id',(req,res,next)=>{
  List.remove({
    _id : req.params.list_id
  },(err,list)=>{
    if (err) { console.log(err); }
      res.json({
        status : 200,
        message: "List deleted",
      });
  });
});

module.exports = router;
