module.exports = function Database(conf) {
var express = require('express'),
    port = process.env.PORT || 5000,
    collections = conf.collections;
    db = require('monk')(conf.user + ':' + conf.pass + '@' + conf.url + '/' + conf.database),
	app = express.createServer(), 
	_ = require('underscore');
	
app.configure(function () {
	app.use(express.bodyParser());
	app.use(allowCrossDomain);
});

app.get('/:collection', function(req, res) {
  var collection = db.get(req.params.collection);
  console.log('read ' + req.params.collection);
  if (collections.indexOf(req.params.collection)==-1) {
    res.send(404);
    return;
  }
  collection.find({},req.query, function(err, docs) {
      res.send(docs);
  });
});

// create -> POST /collection
app.post('/:collection', function(req, res){
  console.log('create ' + req.params.collection);
  console.log(req.body.id);
  req.body.id = idCounter++;
  data[req.params.collection] = data[req.params.collection] || [];
  data[req.params.collection].push(req.body);
  res.send({ id: req.body.id });
});

// read -> GET /collection[/id]
app.get('/:collection/:id', function (req,res) {
	console.log('read ' + (req.params.id || ('collection ' + req.params.collection)));
    var collection = db.get(req.params.collection);
	if (collections.indexOf(req.params.collection)==-1) {
      res.send(404);
      return;
    }
    collection.findById(req.params.id, function(err, doc) {
	  if (!doc && req.params.id) {
	    res.send('cant find model ' + req.params.id, 404);
		return;	
	  }
	  res.send(doc);
	});
});

// update -> PUT /collection/id
app.put('/:collection/:id', function (req,res) {
  	var collection = db.get(req.params.collection);
	if (collections.indexOf(req.params.collection)==-1) {
      res.send(404);
      return;
    }
    if (req.params.id=='new') {
  	  collection.insert(req.body, function (err, doc) {
        if (err) throw err;
      });
      console.log('insert ' + req.params.collection + ' - ' + req.params.id);
    }
    else {
      collection.updateById(req.params.id,req.body, function (err, doc) {
        if (err) throw err;
      });
      console.log('update ' + req.params.collection + ' - ' + req.params.id);
    }
	res.send(200);
});

// delete -> DELETE /collection/id
app.delete('/:collection/:id', function (req,res) {
	var collection = db.get(req.params.collection);
	if (collections.indexOf(req.params.collection)==-1) {
      res.send(404);
      return;
    }
    collection.findById(req.params.id, function(err, doc) {
	  if (!doc && req.params.id) {
	    res.send('cant find model ' + req.params.id, 404);
		return;	
	  }
	  doc.remove;
	  console.log('delete ' + req.params.id);
	});
	res.send(200);
});

app.listen(port);

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
};