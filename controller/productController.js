const Product=require('../models/product')
const Inventory=require('../models/inventory')

exports.createProduct=async(req, res) => {
try{

    const { id,name, category, price } = req.body

    const product=new Product({ id, name, category, price });
    await product.save();

    const inventory = new Inventory({ id, quantity: 0 });
    await inventory.save();
    
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

};
