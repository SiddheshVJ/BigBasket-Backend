import { Schema, model } from "mongoose";


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

// this indicates table
let Product = model('product', ProductSchema)

export default Product

