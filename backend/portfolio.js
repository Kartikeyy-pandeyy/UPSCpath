// portfolio.js (CommonJS)
const mongoose = require("mongoose");

// Separate connection only for the views counter
const viewsConn = mongoose.createConnection(process.env.MONGODB_URI_VIEWS, {
  autoIndex: true,
});

const viewSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "heroViews" }, // single fixed document
    total: { type: Number, default: 0 },
  },
  { collection: "portfolio_views", versionKey: false }
);

const ViewCounter = viewsConn.model("ViewCounter", viewSchema);

async function getViews() {
  const doc =
    (await ViewCounter.findById("heroViews").lean()) ||
    (await ViewCounter.create({ _id: "heroViews", total: 0 }));
  return doc.total || 0;
}

async function incrementViews() {
  const updated = await ViewCounter.findOneAndUpdate(
    { _id: "heroViews" },
    { $inc: { total: 1 } },
    { new: true, upsert: true }
  ).lean();
  return updated.total || 0;
}

module.exports = { getViews, incrementViews };
