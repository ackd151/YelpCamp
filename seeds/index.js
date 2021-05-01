const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "602c1479834c1c0be8332197",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/ackd151/image/upload/v1613952026/YelpCamp/v9wi00zbfwb4ypyyrax5.jpg",
          filename: "YelpCamp/v9wi00zbfwb4ypyyrax5",
        },
        {
          url:
            "https://res.cloudinary.com/ackd151/image/upload/v1613952027/YelpCamp/pedcwle6jwkrg2pvnkcq.jpg",
          filename: "YelpCamp/pedcwle6jwkrg2pvnkcq",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel dolore ipsum reiciendis hic quod ratione omnis quae optio incidunt officiis ducimus atque fuga voluptas, repellendus eos labore rem! Aspernatur, cum.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
