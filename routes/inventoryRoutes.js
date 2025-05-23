const express=require("express");
const router=express.Router();
const inventoryRoute=require("../controller/inventoryController")

router.get("/get-items", inventoryRoute.getInventory)

module.exports=router