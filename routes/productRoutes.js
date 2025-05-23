const express=require("express");
const router=express.Router();
const prodRoute=require("../controller/productController")

router.post("/", prodRoute.createProduct)

module.exports=router