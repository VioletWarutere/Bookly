const mongoose = require("mongoose");

const connectionString = "mongodb+srv://violetwarutere:mongoDB2024@violet-atlas.ublwfkn.mongodb.net/Bookly?retryWrites=true&w=majority&appName=Violet-Atlas";

const connect_db = async () => {
  
    await mongoose
        .connect(connectionString)
        .then(() => console.log('Database connection established'))
        .catch((error) => console.log(error.message));
    
};

module.exports = {connect_db};