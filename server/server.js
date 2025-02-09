import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import dbConnection from "./dbConfig/dbConnection.js";
import router from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

// MongoDb Connection
dbConnection();

// Middlewares
app.use(cors());
app.use(xss());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(mongoSanitize());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true }));
app.use(morgan("dev"));

app.use(router);

app.use(errorMiddleware);

 // Routes
 app.listen(PORT, ()=>{
    console.log(`Server is live on port ${PORT}`);
 });