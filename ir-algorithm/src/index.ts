import express, {Request,Response} from "express";
import dotenv from "dotenv";
import router from "./routes/Routes";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

let APP_NAME = process.env.APP_NAME;
let APP_PORT = process.env.APP_PORT;

app.get("/", (req:Request, res:Response)=>{
    return res.status(200).send({
        response: "Express Typescript"
    });
})

app.use(router);
app.use(cors({
	credentials: true,
	origin: true
}));

app.listen(process.env.APP_PORT, () => {
    console.log(`${APP_NAME} running on ${APP_PORT}`);
});

