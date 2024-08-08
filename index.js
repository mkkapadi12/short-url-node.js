const express = require("express");
const path = require("path");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRoutes");
const userRouter = require("./routes/user");

const { connectToMongoDb } = require("./connect");
const URL = require("./models/url");

const app = express();
const port = 8001;

//connect to mongodb
connectToMongoDb("mongodb://127.0.0.1:27017/short-url");

//set template engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/url", urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  // console.log(entry);

  res.redirect(entry.redirectURL);
});

//server
app.listen(port, () => console.log(`Server started on port ${port}!`));
