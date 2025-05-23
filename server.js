require("dotenv").config();
const express=require("express");
const cors = require("cors");
const mongoose=require("mongoose");

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => 
    console.log("Database is running"
));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/sales", require("./routes/saleRoutes"));

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));