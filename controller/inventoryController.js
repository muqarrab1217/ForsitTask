const Inventory = require("../models/inventory");

exports.getInventory = async (req, res) => {
  try {
    const lowStock = parseInt(req.query.low || 5);

    const inventory = await Inventory.find();

    const result = inventory.map(i => {
      console.log(i); 
      return {
        product_id: i._id,
        quantity: i.quantity,
        low_stock: i.quantity <= lowStock,
        last_updated: i.last_updated,
        created_at: i.createdAT
      };
    });


    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inventory data." });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params; // This is the inventory document _id
    const { quantity } = req.body;

    const updated = await Inventory.findByIdAndUpdate(
      id,
      { quantity, last_updated: new Date() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Inventory item not found." });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update inventory." });
  }
};
