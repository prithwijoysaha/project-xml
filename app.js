import createError from "http-errors";
import express from "express";
import path, {resolve as pathResolve, dirname} from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import cors from "cors";
import router from "./routes/index.js";
const myEnv = config({ path: path.resolve(`.env`) });
expand(myEnv);

var app = express();

// view engine setup
const viewDirectory = pathResolve(dirname('./'), 'views');
const publicDirectory = pathResolve(dirname('./'), 'public');

app.set('views', viewDirectory);
app.set('view engine', 'ejs');
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicDirectory));

app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log('err :>> ', err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});
export default app;
