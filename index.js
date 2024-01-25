const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
const blogSchema = new Schema({
  title: {
    type: String,
  },
  publishAt: {
    type: Date,
    default: new Date(),
  },
});
const Blog = mongoose.model("blog", blogSchema);
(async function () {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://amanshaw9010:4janxSibTGFTPWsy@cluster0.fmxhghv.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(db.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
app.get("/", (req, res) => {
  res.send("Hello Server is live");
});

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      data: blogs,
      message: "blog fetched succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error,
    });
  }
});
app.post("/blog/create", async (req, res) => {
  try {
    const { title } = req.body;
    const blogs = await Blog.create({
      title,
    });
    res.status(200).json({
      data: blogs,
      message: "blog fetched succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error,
    });
  }
});
app.listen(4000, () => {
  console.log("Server is running on PORT : 4000");
});
