var express = require('express');
var compression = require('compression');
var columnsModel = require('../models/columnModel');
var cardsModel = require('../models/cardModel');
var router = express.Router();
 var app = express();
 app.use(compression());
module.exports = function(passport){
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/next',
    failureRedirect: '/errLog',
    failureFlash : true 
  }));

    router.get('/signup', function(req, res){
    res.render('registration', { message: req.flash('message') });
  });

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/errReg',
    failureFlash : true 
  }));
  
  router.get('/next', function(req, res){
    res.render('kanbanTable', { message: req.flash('message') });
  });

  router.get('/errReg', function(req, res){
    res.send('Registration ERROR!!!');
  });

  router.get('/errLog', function(req, res){
    res.send('Login ERROR!!!');
  });
  function middleware(req, res, next){
    columnsModel.find(function(err,src){
      if(src.length === 0){
        var columnArr = [{id: 5,title: "To Do"},{id: 7,title: "In Progress"},{id: 8,title: "Done"}];
        res.type("application/json").send(JSON.stringify(columnArr));
      }
    });
    next();
  }
  router.get('/api/column', middleware, function(req, res){
  columnsModel.find(function(err,src){
    if(src.length === 0){
      /*var columnArr = [{id: 5,title: "To Do"},{id: 7,title: "In Progress"},{id: 8,title: "Done"}];
      console.log("1");
      res.type("application/json").send(JSON.stringify(columnArr));
      console.log("2");*/
      var columnArr = [{id: 5,title: "To Do"},{id: 7,title: "In Progress"},{id: 8,title: "Done"}];
      for(let i=0; i<3; i++){
        var columnObj = new columnsModel(columnArr[i]);
        console.log("3");
        columnObj.save(()=>console.log("Column save to DB"));
        console.log("4");
      }
    }
    else if(err)
      console.log(err);
    else{
      console.log("get columns");
      console.log(src);
      res.type("application/json").send(JSON.stringify(src));
    }
  });
});

  router.get("/api/card", function(req, res){
  cardsModel.find(function(err,src){
    if(err){
      console.log(err);
    }
    else{
      console.log("get cards");
      res.type("application/json").send(JSON.stringify(src));
    }
  });
});

  router.post("/api/card", function(req,res){
  var card = req.body;
  cardsModel.find(function(err,src){
    if(err){
      console.log(err);
    }
    else{
      card.id = Math.max(0, ...(src || []).map(item => item.id || 0)) + 1;
      res.type("application/json").send(JSON.stringify(card, null, 2));

      var cardsObj = new cardsModel(card);
      cardsObj.save(function(err){
        if(err)
          throw err;
        else{
          console.log("Cards save to database");
        }
      }); 
    }
  });
});

  router.delete("/api/card/:id", function(req, res){
  const ID = +req.params.id;
  let src = cardsModel.findOneAndDelete({id: ID}, function(err){
    if(err){
      throw err;
    }
  });
});

  router.patch("/api/card/:id", function(req, res) {
  const ID = +req.params.id;
  var patch = req.body;
  cardsModel.find(function(err,src){
    if(err){
      throw err;
    }
    else{
      cardsModel.findOne({id: ID}, function (err, doc) {
        if (err){
          throw err;
        }
        else{
          if(!patch.title && patch.columnId){
            if(patch.title!=undefined){
              doc.title = patch.title;
            }
            else{
              doc.columnId = patch.columnId;
            }
          }
          else if(patch.title && !patch.columnId){
            doc.title = patch.title;
          }
          else{
            doc.title = patch.title;
          }
          doc.save(()=>console.log("Document updated"));
        }
      });
    }
  });
});
  return router;
}