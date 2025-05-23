const mongoose=require("mongoose");

const productSchema=new mongoose.Schema(
    {
        _id:Number,
        name:String,
        category:String,
        price:Number,
        createdAT:{type:Date, default:Date.now}
    }
);

const Product = mongoose.model("Product", productSchema)

const seedProducts=async() => {
  const count=await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      {
        name: 'Wireless Mouse',
        category: 'Electronics',
        price: 25.99
      },
      {
        name: 'Bluetooth Speaker',
        category: 'Electronics',
        price: 45.00
      },
      {
        name: 'Running Shoes',
        category: 'Footwear',
        price: 70.00
      },
      {
        name: 'LED Monitor',
        category: 'Electronics',
        price: 120.00
      },
      {
        name: 'Coffee Maker',
        category: 'Home Appliances',
        price: 89.99
      }
    ]);
    console.log('placed 5 dummy records for products');
  }
};

seedProducts().catch(console.error);

module.exports=Product;