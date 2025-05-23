const mongoose=require("mongoose");
const Product = require("../models/product");

const saleSchema=new mongoose.Schema(
    {
        productID:{type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
        quantity:Number,
        salePrice:Number,
        saleDate:{type:Date, default:Date.now}
    }
);

const Sale=mongoose.model("Sale", saleSchema)

const seedProducts=async() => {
  const count=await Product.countDocuments();
  if (count === 0) {
    const products = await Product.find().limit(5);
    if (products.length === 0) {
      console.log("No products found to seed sales");
      return;
    }

    const salesData = products.map((product) => ({
      productId: product._id,
      quantity: Math.floor(Math.random() * 10) + 1, // random quantity 1-10
      salePrice: product.price,
      saleDate: new Date()
    }));

    await Sale.insertMany(salesData);
    console.log("Placed 5 dummy records for sales");
  }
};

seedProducts().catch(console.error);

module.exports=Sale;