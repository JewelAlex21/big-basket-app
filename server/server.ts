import express, { response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose, { Mongoose } from 'mongoose';
import apiRouter from './router/apiRouter';

const app:express.Application = express();

// configuration

app.use(cors());

// For env variables
dotenv.config( {path: './.env'})

// json from data
app.use(express.json());

let hostName:string|undefined = process.env.HOST_NAME;
let port:number|undefined = Number(process.env.PORT)
let mongoDBURL:string | undefined = process.env.MONGODB_URL;

// MongoDB Connection
if(mongoDBURL){
    mongoose.connect(mongoDBURL).then((response:Mongoose)=>{
      console.log("Connected to MongoDB");  
    }).catch((error)=>{
        console.error(error);
        process.exit(1)
        // stop the node js process
    })
}



app.get('/',(request : express.Request, response: express.Response)=>{
    response.status(200).json({
        msg: 'Server is Running'
    });
});


// router configuration
app.use('/api/v1', apiRouter)


if(port !== undefined && hostName !== undefined){
    app.listen(port, hostName, ()=>{
        console.log(`Express Server is Started at : http://${hostName}:${port}`);
        
    });
}
