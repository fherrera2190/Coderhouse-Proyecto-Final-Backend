const mongoose = require("mongoose");
require('dotenv').config();

class MongoSingleton{
    static #instacia;
    constructor(url){
        mongoose.connect(url)
    }
    static connectDb(url){
        if(this.#instacia){
            console.log('Conexion a DB establecida previamente')
            return this.#instacia
        }
         this.#instacia = new  MongoSingleton(url)
         console.log('Conexion a DB establecida')
         return this.#instacia;
    }
}
MongoSingleton.connectDb(process.env.MONGO_URL);
module.exports = MongoSingleton;