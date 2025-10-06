import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error("missing MONGODB_URI in environment")
}

let cached = global.mongoose;
if(!cached){
    cached = global.mongoose ={conn : null , promise : null};
}


export async function connectDb(){
    if(cached.conn) return cached.conn;
    if(!cached.promise) {
        cached.promise = mongoose
        .connect(MONGODB_URI,{autoIndex:true,})
        .then((m)=>m)
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDb;
