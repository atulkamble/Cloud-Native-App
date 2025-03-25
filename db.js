const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/cloudnative", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

module.exports = mongoose;
