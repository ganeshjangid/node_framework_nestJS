import * as mangoose from "mongoose";

export const productSchema = new mangoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
});

export interface Product {
    title: string;
    des: string;
    price: number;

}

export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public des: string,
    ) { }
}
