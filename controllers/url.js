const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
  const shortID = shortid();
  //   console.log(shortID);

  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url is required !" });

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  res.render("home", {
    id: shortID,
  });
  // res.json({ id: shortID });
};

const handleAnalytics = async (req, res) => {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });
  res.json({
    totalClicks: result.visitHistory.length,
    Analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortUrl,
  handleAnalytics,
};
