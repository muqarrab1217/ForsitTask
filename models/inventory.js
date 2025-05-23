const mongoose=require("mongoose");
const Product=require("../models/product")

const inventorySchema=new mongoose.Schema(
    {
        productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity:Number,
        last_updated:{type:Date, default:Date.now},
        createdAT:{type:Date, default:Date.now}
    }
);

module.exports=mongoose.model("Inventory", inventorySchema); 

