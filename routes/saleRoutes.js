const express=require("express");
const router=express.Router();
const salesRoute=require("../controller/saleController")

router.get("/", salesRoute.getSales)
router.get("/revenue", salesRoute.getRevenueByPeriod)

module.exports=router