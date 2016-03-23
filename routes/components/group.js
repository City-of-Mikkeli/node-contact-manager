var Group = require('../../model/group');
var _ = require('underscore');

exports.view = function(req, res){
  Group.find({}, function(err, groups){
    if(err){
      res.status(500).send(err);
    }else{
      res.render('groups', {groups: groups});
    }
  });
};
   
exports.create = function(req, res){
  var group = new Group(req.body.group);
  Group.save(function(err, group){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(group);
    }
  });
};

exports.update = function(req, res){
  var id = req.params.id;
  Group.findById(id, function(err, group){
    if(err){
      res.status(400).send(err);
    }else{
      group = _.extend(group, req.body.group);
      group.save(function(err, group){
        if(err){
          res.status(400).send(err);
          res.send(group);
        }
      });
    }
  })
}

exports.find = function(req, res){
  var id = req.params.id;
  Group.findById(id, function(err, group){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(group);
    }
  });
}

exports.list = function(req, res){
  Group.find({}, function(err, groups){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(groups);
    }
  });
}

exports.remove = function(req, res){
  var id = req.params.id;
  Group.findByIdAndRemove(id, function (err, group){
      if(err){
        res.status(400).send(err);
      }else{
        res.send(group);
      } 
  });
}