import { model, Schema } from "mongoose";

const dschema = new Schema({
  
    register: {
        type: Number, 
        required: true,
        unique: true,
       
    },
    name:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    fees:{
        type: String,
        required: true
    },
})
const detail =  model("detail", dschema);
export default detail ;
