// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message
db.once("open", (err) => {
    if (err) {
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else {
        console.log('Successfully connected to MongoDB Exercise data using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: Date, required: true },
});

// Compile the model from the schema.
const Exercise = mongoose.model("Exercise", exerciseSchema);


// CREATE model
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return exercise.save();
}


// RETRIEVE models 
const findExercises = async () => {
    const query = Exercise.find();
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findExercisesById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

// Update model using PUT 
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id }, {
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return result.modifiedCount;
}

// DELETE model based on ID 
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
};


// Exporting variables to use in the controller file.
export { createExercise, findExercises, findExercisesById, replaceExercise, deleteById }