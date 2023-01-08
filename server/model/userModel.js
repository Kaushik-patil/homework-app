const mongoose = require('mongoose')

module.exports = mongoose.model("Route", new mongoose.Schema({

    name: { type: String, },
    
    direction: { type: String, },
    
    id: { type: String, },
    
    status: { type: String, },
    
    stops: { type: Array, }
    
    }));
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },

        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true
        },



        password: {
            type: String,
            required: [true, 'Please add a password']
        }

    },{
        timestamps : true
    })

    module.exports =mongoose.model('User',userSchema)