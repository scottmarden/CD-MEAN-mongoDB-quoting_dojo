let express = require("express");

let app = express();

let path = require("path");

let bodyParser = require("body-parser");

let mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/quotes_db')

mongoose.Promise = global.Promise;

var server = app.listen(3316, () => {
	console.log("App listening on port 3316");
});

var quoteSchema = new mongoose.Schema({
	name: {type: String},
	quote: {type: String}
}, {timestamps: true});

mongoose.model('Quote', quoteSchema)
var Quote = mongoose.model('Quote');

// Root route
app.get('/', (req, res) => {
	res.render('index');
});

// Add new Quote
app.post('/quotes', (req, res) => {
	let quote = new Quote(req.body)
	quote.save(  (err, data) => {
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	})
	res.redirect('/quotes');
})

app.get('/quotes', (req, res) => {
	let quotes = Quote.find({}, (err, quotes) => {
		if(err){
			console.log(err);
		}else{
			console.log(quotes)
			res.render('quotes', {quotes: quotes})
		}
	});

})

// Render page of quotes
