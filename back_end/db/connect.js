const mongoose = require("mongoose");

const connectionString = "mongodb+srv://violetwarutere:violetwarutere@violet-atlas.ublwfkn.mongodb.net/Bookly";

const connect_db = async () => {
  
    await mongoose
        .connect(connectionString)
        .then(() => console.log('Database connection established'))
        .catch((error) => console.log(error.message));
    
};

module.exports = {connect_db};