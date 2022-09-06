const mongoose = require('mongoose')

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
	important: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

noteSchema.set('toJSON', {
	transform: (document, responseObject) => {
		responseObject.id = responseObject._id.toString()
		delete responseObject._id
		delete responseObject.__v
	}
})

module.exports = mongoose.model('Note', noteSchema)
