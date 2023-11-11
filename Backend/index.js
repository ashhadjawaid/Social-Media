import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from 'morgan';
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Import routes
import userRoute from "./Routes/users.js";
import authRoute from "./Routes/auth.js";
import postRoute from "./Routes/post.js";
const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB Successfully"))
  .catch((err) => { console.error(err); });



app.use("/images", express.static(path.join(__dirname, "Public/images")));

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
    console.log(req.body.name, "body name")
    console.log(req.file, "file name")
    console.log(file.originalname, "orignal name")
  }
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req,res) => {
  try {
    return res.status(200).json("file uploaded successfully")
  } catch (error) {
    console.log("data not found");
  }
  })

app.use((req, res, next)=>{
  req.body.date = new Date()
  // console.log(req.body);
  next()
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8000, () => {
  console.log("Backend Server is running");
});
