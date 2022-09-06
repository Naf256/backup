const mongoose = require('mongoose')

/*if (process.argv.length < 3) {
	console.log('please provide the password as an argument')
	process.exit(1)
}


//const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.1xynz.mongodb.net/?retryWrites=true&w=majority`

*/
const url2 = 'mongodb+srv://fullstack:thisiscs50@cluster0.1xynz.mongodb.net/susuke?retryWrites=true&w=majority'

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	important: Boolean
})

const Note = mongoose.model('uchiha', noteSchema)

const note = new Note({
	content: 'this is cs50',
	date: new Date(),
	important: true
})

note.save()

mongoose
  .connect(url2)
  .then(result => {
	  console.log('connected')
	  Note.find({ important: true }).then(result => {
		  result.forEach(note => {
			  console.log(note)
		  })
		mongoose.connection.close()
	  })
  })
  .catch(err => console.log(err))
