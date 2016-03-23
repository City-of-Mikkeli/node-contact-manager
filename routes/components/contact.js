var Contact = require('../../model/contact');
var _ = require('underscore');
   
exports.create = function(req, res){
  var contact = new Contact(req.body.contact);
  contact.save(function(err, contact){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(contact);
    }
  });
};

exports.update = function(req, res){
  var id = req.params.id;
  Contact.findById(id, function(err, contact){
    if(err){
      res.status(400).send(err);
    }else{
      contact = _.extend(contact, req.body.contact);
      contact.save(function(err, contact){
        if(err){
          res.status(400).send(err);
          res.send(contact);
        }
      });
    }
  })
}

exports.find = function(req, res){
  var id = req.params.id;
  Contact.findById(id, function(err, contact){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(contact);
    }
  });
}

exports.list = function(req, res){
  Contact.find({}, function(err, contacts){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(contacts);
    }
  });
}

exports.remove = function(req, res){
  var id = req.params.id;
  Contact.findByIdAndRemove(id, function (err, contact){
      if(err){
        res.status(400).send(err);
      }else{
        res.send(contact);
      } 
  });
}