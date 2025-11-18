import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { connectDB } from "./config/database.config.js";
import methodOverride from "method-override";
import ejsmate from "ejs-mate";
import cookieParser from "cookie-parser";
import cors from "cors";

import { listingRouter } from "./routes/listing.route.js";
import { reviewRouter } from "./routes/reviews.route.js";
import authRouter from "./routes/auth.route.js";
import { ExpressError } from "./utils/ExpressError.js";

const app = express();
const PORT = 3000;
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cookie + CORS
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// EJS, static, parsing
app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/auth", authRouter);
app.use("/", listingRouter);
app.use("/:listingId/reviews", reviewRouter);

// 404 handler

app.all(/.*/, (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
