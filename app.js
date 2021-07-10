//Package Imports
import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import bodyparser from "body-parser";;
import methodOverride from "method-override";

//Module Imports
import Property from "./api/property.js";

//Config DotEnv File
dotenv.config();

//Initialize express module to variable app
const app = express();

//Initial app configs
app.use(cors());
app.use(bodyparser.json({ extended:true, limit: '100mb' }));
app.use(bodyparser.urlencoded({extended:true, limit: '100mb'}));
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

//Main route to Property sub route
app.use("/property",Property);

//Specified reques not found
app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Requests that are not implemented
app.use((err,req, res, next) => {
   res.status(err.status || 501);
   res.json({
       error: {
           code: err.status || 501,
           message: err.message
       }
   });
});

function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' })
    } else {
      next(err)
    }
}

function errorHandler (err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
}

export default app;