const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/node-mongo-hw' // change this as needed

mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const Schema = mongoose.Schema

const item = new Schema({
  date: String,
  url: String,
	title: String,
	explanation: String
})

const fav = mongoose.model("fav", item)

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();


// The method of the root url. Be friendly and welcome our user :)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the APOD app.' });   
});

router.get("/db/all", (req, res) => {
  fav.find().then((favorites) => {
    res.json({message: "Return all favorites!", favorites: favorites});
  })
});

router.route("/db/:id")
	.get((req, res) => {
		fav.findById(req.params.id, (error, favorite) => {
			if (error) {
					res.status(500).json({ status: "failure" })
			} else {
					res.json(favorite)
	    }
	  })
  })
  .put("/db/:id", (req, res) => {
	  fav.findByIdAndUpdate(req.params.id, req.body, (error, favorite) => {
			if (error) {
				res.status(500).json({ status: "failure" })
      }	else {
				res.status(200).json(favorite)
			}
	  });
  })
	.delete("/db/:id", (req, res) => {
		fav.findByIdAndDelete(req.params.id, (error, favorite) => {
			if (error) {
				res.status(500).json({ status: "failure"})
			} else {
				res.json(favorite)
			}
	})
})


router.post("/db", (req, res) => {
  const fav_item = fav({        // Create TODO item with the appropriate fields
		date: req.body.date,
		url: req.body.hdurl,
		title: req.body.title,
		explanation: req.body.explanation,
	})
	fav_item.save((error, document) => {
		res.json({               // Save TODO item to the database
			status: "success",
			id: fav_item._id,
			content: req.body
    })
  });
});


app.use('/api', router); // API Root url at: http://localhost:8080/api

app.listen(port);
console.log('Server listenning on port ' + port);