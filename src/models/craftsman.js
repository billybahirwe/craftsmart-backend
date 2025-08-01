const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Craftsman model
const CraftsmanSchema = new Schema({
    // The name of the craftsman, required and must be a string
    name: {
        type: String,
        required: true,
        trim: true // trim whitespace from the beginning and end of the string
    },
    // The craftsman's profession or specialty
    specialty: {
        type: String,
        required: true,
        trim: true
    },
    // A brief description of the craftsman's work or background
    description: {
        type: String,
        trim: true
    },
    // An array of services they offer
    services: [String],
    // The craftsman's contact information
    contact: {
        email: {
            type: String,
            required: true,
            unique: true, // ensure email is unique
            trim: true
        },
        phone: String,
        website: String
    },
    // The location of the craftsman
    location: {
        city: String,
        country: String
    },
    // A rating for the craftsman (e.g., from 1 to 5)
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    // A reference to the user who created this craftsman profile (assuming you have a User model)
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' // 'User' is the name of your User model
    }
}, {
    timestamps: true // This adds `createdAt` and `updatedAt` timestamps automatically
});

// Create and export the model
module.exports = mongoose.model('Craftsman', CraftsmanSchema);