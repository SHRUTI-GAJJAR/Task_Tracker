const dns = require("dns");
const mongoose = require("mongoose");

// Avoid intermittent SRV lookup failures on some Windows DNS setups
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

/**
 * Connect to MongoDB using Mongoose.
 * Reads connection string from MONGO_URI in environment variables.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
