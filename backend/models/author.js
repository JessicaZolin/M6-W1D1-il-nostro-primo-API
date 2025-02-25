import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,                                    // email must be unique
        lowercase: true,                                 // the email adress will be converted to lowercase before it is saved
        match: [
            /.+\@.+\..+/, 
            "Please enter a valid email address"
        ],                                               // email validation
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
});

export default mongoose.model("Author", authorSchema);