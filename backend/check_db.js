require('dotenv').config();
const mongoose = require('mongoose');

const checkDb = async () => {
  const uri = "mongodb+srv://samvegjain014_db_user:Sam%401330@cluster0.be9pnwg.mongodb.net/DarshanEase?appName=Cluster0";
  console.log("Connecting to DarshanEase db...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const temples = await db.collection('temples').find({}).toArray();
  console.log(`test db has ${temples.length} temples`);

  const names = temples.map(t => t.templeName);
  console.log(names);
  process.exit(0);
};

checkDb();
