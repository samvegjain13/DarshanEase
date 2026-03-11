require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const axios = require('axios');

const Temple = require('./models/Temple');
const Darshan = require('./models/Darshan');
const Organizer = require('./models/Organizer');
const Booking = require('./models/Booking');

const templesData = [
  {
    templeName: "Shri Banke Bihari Ji Mandir",
    location: "Vrindavan, Uttar Pradesh",
    description: "Shri Banke Bihari Mandir is a Hindu temple dedicated to Lord Krishna, in the holy city of Vrindavan in the Mathura district. It is one of the most revered and famous temples of Lord Krishna in the world.",
    imageUrl: "https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg",
    open: "07:45",
    close: "21:30"
  },
  {
    templeName: "Shiv Khori Mandir",
    location: "Reasi, Jammu & Kashmir",
    description: "Shiv Khori is a famous cave shrine of Hindus devoted to lord Shiva, situated in the Reasi district of Jammu and Kashmir. The cave contains a naturally formed lingam.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg",
    open: "05:00",
    close: "19:00"
  },
  {
    templeName: "Tirupati Tirumala Temple",
    location: "Tirupati, Andhra Pradesh",
    description: "Sri Venkateswara Swami Temple is a landmark Vaishnavite temple situated in the hill town of Tirumala at Tirupati in Tirupati district of Andhra Pradesh, India. The Temple is dedicated to Venkateshwara, a form of Vishnu.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg",
    open: "03:00",
    close: "23:00"
  },
  {
    templeName: "Padmanabhaswamy Temple",
    location: "Thiruvananthapuram, Kerala",
    description: "The Shree Padmanabhaswamy Temple is a Hindu temple located in Thiruvananthapuram, the state capital of Kerala, India. It is widely considered as the world's richest Hindu temple.",
    imageUrl: "https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg?height=459&width=711&fit=bounds",
    open: "04:15",
    close: "19:30"
  },
  {
    templeName: "Shirdi Sai Baba Mandir",
    location: "Shirdi, Maharashtra",
    description: "Shirdi Sai Baba Temple is a highly revered shrine located in Shirdi, Maharashtra. It is dedicated to Sai Baba, a spiritual master who is regarded by his devotees as a saint, fakir, and satguru.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg",
    open: "04:00",
    close: "22:45"
  },
  {
    templeName: "Golden Temple",
    location: "Amritsar, Punjab",
    description: "The Golden Temple, also known as Harmandir Sahib, is a gurdwara located in the city of Amritsar, Punjab, India. It is the preeminent spiritual site of Sikhism.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg",
    open: "00:00",
    close: "23:59"
  }
];

const downloadImage = async (url, filename) => {
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }
  const filepath = path.join(uploadDir, filename);
  const response = await axios({ 
    url, 
    responseType: 'stream',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  return new Promise((resolve, reject) => {
    response.data.pipe(fs.createWriteStream(filepath))
      .on('finish', () => resolve(`uploads\\${filename}`))
      .on('error', e => reject(e));
  });
};

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully!");

    console.log("Clearing existing data...");
    await Temple.deleteMany({});
    await Darshan.deleteMany({});
    await Organizer.deleteMany({});
    await Booking.deleteMany({});

    console.log("Creating default organizer...");
    const organizer = await Organizer.create({
      name: "Global Temple Trust",
      email: "trust@darshanease.com",
      password: "password123"
    });

    console.log("Seeding Temples...");
    for (let i = 0; i < templesData.length; i++) {
        const data = templesData[i];
        console.log(`Downloading image for ${data.templeName}...`);
        const filename = `temple_${i}_${Date.now()}.jpg`;
        const localImagePath = await downloadImage(data.imageUrl, filename);
        
        const newTemple = await Temple.create({
            organizerId: organizer._id,
            organizerName: organizer.name,
            templeName: data.templeName,
            description: data.description,
            open: data.open,
            close: data.close,
            location: data.location,
            templeImage: localImagePath.replace(/\\/g, '/')
        });

        // Add 2 darshans per temple
        console.log(`Creating Darshans for ${data.templeName}...`);
        await Darshan.create({
            darshanName: "Morning Aarti Darshan",
            templeName: data.templeName,
            templeImage: localImagePath.replace(/\\/g, '/'),
            location: data.location,
            open: "06:00",
            close: "09:00",
            description: `Experience the divine morning aarti and seek blessings at ${data.templeName}. Dedicated fast-track queues for VIP ticket holders.`,
            prices: { normal: "50", vip: "250" },
            organizerId: organizer._id,
            organizerName: organizer.name
        });

        await Darshan.create({
            darshanName: "Evening Sandhya Darshan",
            templeName: data.templeName,
            templeImage: localImagePath.replace(/\\/g, '/'),
            location: data.location,
            open: "17:00",
            close: "20:00",
            description: `Join us for the peaceful evening sandhya darshan at ${data.templeName}. A beautiful spiritual experience to end your day.`,
            prices: { normal: "50", vip: "300" },
            organizerId: organizer._id,
            organizerName: organizer.name
        });
    }

    console.log("✅ Seed complete! All temples and darshans added.");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
