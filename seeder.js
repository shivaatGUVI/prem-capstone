const products = require("./data/products.json");
const Product = require("./models/productModel");
const restarunt = require("./data/restarunts.json");
const Restarunt = require("./models/restaruntModel");
const kitchen = require("./data/kitchens.json");
const CldKitchen = require("./models/kitchenModel");

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("product deleted");
    await Product.insertMany(products);
    console.log("all product Added");
  } catch (error) {
    console.log(error.message);
  }
};

seedProducts();

const seedRestarunt = async () => {
  try {
    await Restarunt.deleteMany();
    console.log("product deleted");
    await Restarunt.insertMany(restarunt);
    console.log("all restarunt Added");
  } catch (error) {
    console.log(error.message);
  }
};

seedRestarunt();

const seedKitchen = async () => {
  try {
    await CldKitchen.deleteMany();
    console.log("product deleted");
    await CldKitchen.insertMany(kitchen);
    console.log("all kitchen Added");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedKitchen();
