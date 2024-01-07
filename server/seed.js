const mongoose = require('mongoose');
const Product = require('./models/ProductsModel');
require('dotenv').config()

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true });

const products = [
    { name: "Samsung QLED 4K Smart TV", price: 1200, image: 'tv-samsung.png' },
    { name: "LG OLED 55 inch TV", price: 1500, image: 'tv-lg.png' },
    { name: "Sony Bravia 4K Ultra HD", price: 1300, image: 'tv-sony.png' },

    { name: "Bosch Series 4 Freestanding Fridge", price: 1100, image: 'fridge-bosh.png' },
    { name: "Whirlpool Double Door Refrigerator", price: 900, image: 'fridge-whirlpool.png' },
    { name: "Samsung Family Hub Refrigerator", price: 2000, image: 'fridge-samsung.png' },

    { name: "Dyson V11 Torque Drive", price: 600, image: 'cleaner-dyson.png' },
    { name: "Shark Navigator Lift-Away", price: 200, image: 'cleaner-shark.png' },
    { name: "iRobot Roomba s9+", price: 900, image: 'cleaner-irobot.png' },

    { name: "Apple MacBook Pro 16-inch", price: 2400, image: 'laptop-apple.png' },
    { name: "Dell XPS 15", price: 1800, image: 'laptop-dell.png' },
    { name: "Lenovo ThinkPad X1 Carbon", price: 1500, image: 'laptop-lenovo.png' },

    { name: "Apple iPhone 13 Pro Max", price: 1100, image: 'phone-apple.png' },
    { name: "Samsung Galaxy S21 Ultra", price: 1200, image: 'phone-samsung.png' },
    { name: "Google Pixel 6 Pro", price: 900, image: 'phone-google.png' },

    { name: "Apple iPad Pro 12.9-inch", price: 1100, image: 'ipad-apple.png' },
    { name: "Samsung Galaxy Tab S7+", price: 850, image: 'ipad-samsung.png' },
    { name: "Microsoft Surface Pro 7", price: 900, image: 'ipad-microsoft.png' },

    { name: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones", price: 350, image: 'headphone-sony.png' },
    { name: "Bose QuietComfort 35 II", price: 300, image: 'headphone-bose.png' },
    { name: "Apple AirPods Max", price: 550, image: 'headphone-apple.png' },

    { name: "Sony PlayStation 5", price: 500, image: 'console-sony.png' },
    { name: "Microsoft Xbox Series X", price: 500, image: 'console-microsoft.png' },
    { name: "Nintendo Switch", price: 300, image: 'console-nintendo.png' },

    { name: "Apple Watch Series 7", price: 400, image: 'watch-apple.png' },
    { name: "Samsung Galaxy Watch 4", price: 250, image: 'watch-samsung.png' },
    { name: "Garmin Fenix 6", price: 600, image: 'watch-garmin.png' },

    { name: "Canon EOS R5", price: 3900, image: 'camera-canon.png' },
    { name: "Nikon Z7 II", price: 3000, image: 'camera-nikon.png' },
    { name: "Sony Alpha A7 III", price: 2000, image: 'camera-sony.png' }
];

Product.insertMany(products)
    .then(res => {
        console.log("Data inserted")
        mongoose.connection.close();
    })
    .catch(e => {
        console.error("Error inserting data", e)
    });