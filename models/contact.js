const mongoose = require('mongoose');

// Defining the scheme for contacts
// adding the restaurant and the pets as subdocuments
// inside the contact document

// Restaurants
let restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    address: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    }
});

// Pets
let petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['dog', 'cat', 'others']
    }
});

// Contacts
let contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    },
    age: {
        type: Number,
        min: 18,
        max: 120
    },
    favouriteRestaurant: restaurantSchema,
    pets: [petSchema]
});

// Association with the model (contacts collection)
let Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;
