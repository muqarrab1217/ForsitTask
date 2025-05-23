const Sale = require("../models/sales");
const Product = require("../models/product");

exports.getSales = async (req, res) => {
  const { start, end, category, product_id } = req.query;
  const filter = {};
  if (start && end) filter.sale_date = { $gte: new Date(start), $lte: new Date(end) };
  if (product_id) filter.product_id = product_id;

  if (category) {
    const productIds = await Product.find({ category }).distinct("_id");
    filter.product_id = { $in: productIds };
  }

  const sales = await Sale.find(filter);
  res.json(sales);
};

exports.getRevenueByPeriod = async (req, res) => {
  const { period } = req.query;
  let groupFormat = "%Y-%m-%d";

  if (period === "weekly") groupFormat = "%Y-%U";
  else if (period === "monthly") groupFormat = "%Y-%m";
  else if (period === "yearly") groupFormat = "%Y";

  const result = await Sale.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: groupFormat, date: "$sale_date" } },
        total_revenue: { $sum: { $multiply: ["$quantity", "$sale_price"] } }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json(result);
};

exports.compareRevenue = async (req, res) => {
  const { start1, end1, start2, end2 } = req.query;

  const calcRevenue = async (start, end) => {
    const result = await Sale.aggregate([
      { $match: { sale_date: { $gte: new Date(start), $lte: new Date(end) } } },
      { $group: { _id: null, revenue: { $sum: { $multiply: ["$quantity", "$sale_price"] } } } }
    ]);
    return result[0]?.revenue || 0;
  };

  const rev1 = await calcRevenue(start1, end1);
  const rev2 = await calcRevenue(start2, end2);
  res.json({ period1: rev1, period2: rev2, difference: rev2 - rev1 });
};
