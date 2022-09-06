const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
	console.log('connected to MONGODB')
})
.catch(err => {
	console.log('error connecting to MONGODB:', err.message)
})

const phoneSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: function(v) {
				return (/^(\d{2,3}-\d{6,10})/).test(v)
			},
			message: 'You must provide a valid number'
		},
		required: [true, 'User phone number is required']
	},
})

phoneSchema.set('toJSON', {
	transform: (document, responseObject) => {
		responseObject.id = responseObject._id.toString()
		delete responseObject._id
		delete responseObject.__v
	}
})

module.exports = mongoose.model('Register', phoneSchema)


