const { log } = require("console");
const express = require("express")
const app = express()
const mongoose = require('mongoose');

app.set('view engine', 'ejs')
const mongodb = "mongodb://db:27017/School";
mongoose.connect(mongodb).then(() => console.log("Connected!")).catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
	name: String,
});
const Student = mongoose.model('Student', studentSchema);

app.get('/insert', (req, res) => {
	var stud = new Student({ name: req.query.name })
	stud.save()
	res.redirect('/')
})

app.get('/delete', async (req, res) => {
	var sid = req.query.studentId
	console.log(sid)
	await Student.deleteOne({ _id: sid })
	res.redirect('/')
})

app.get('/', (req, res) => {
	Student.find({}).then((students) => {
		res.render('index', { students })
	});
})

app.listen(8888, () => console.log("Listening ...."))




// Student.find({
// })
// 	.then((doc) => {
// 		console.log(doc);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

