/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./products.model";


@Injectable()
export class ProductServices {
    products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProductMongoose(title: string, desc: string, price: number) {
        try {
            const newProduct = new this.productModel({ title, desc, price });
            const result = await newProduct.save();
            //console.log(result);
            return result.id;

        } catch (error) {
            console.log("Error==>", error);
            throw new NotFoundException(`Error in InsertData==> ${error}`);
        }
    }

    insertProducts(title: string, desc: string, price: number) {
        const prodId = Math.floor((Math.random() * 10000) + 1);
        const newProduct = new Product(prodId, title, price, desc);
        this.products.push(newProduct);
        return prodId;
    }

    getAllProdDetails() {
        return [...this.products];
    }

    async getMongoAllProdDetails() {
        try {
            const getAlldata = await this.productModel.find().exec();
            //console.log(getAlldata);
            return getAlldata;
        } catch (error) {
            console.log("Error==>", error);
            throw new NotFoundException(`Error in Get All Products==> ${error}`);
        }
    }

    getProductDetails(prodId: number) {
        return this.findProduct(prodId)[0];
    }
    async getProductDetailsMongo(title: string) {
        try {
            const getAlldata = await this.productModel.find({ title: { $regex: '.*' + title + '.*' } }).exec();
            //console.log(getAlldata);
            if (!getAlldata.length) {
                throw new NotFoundException('Could not found!');
            }
            return getAlldata;
        } catch (error) {
            console.log("Error==>", error);
            throw new NotFoundException(`Error in Get Products==> ${error}`);
        }
    }

    async updateProductsMongo(prodId: string, title: string, desc: string, price: number) {
        try {
            const updateProduct = {};
            if (title) {
                updateProduct['title'] = title;
            }
            if (desc) {
                updateProduct['desc'] = desc;
            }
            if (price) {
                updateProduct['price'] = price;
            }

            const getAlldata = await this.productModel.findByIdAndUpdate(prodId, updateProduct);
            //console.log(getAlldata);
            // if (!getAlldata.length) {
            //     throw new NotFoundException('Could not found!');
            // }
            //console.log(getAlldata);
            return getAlldata;
        } catch (error) {
            console.log("Error==>", error);
            throw new NotFoundException(`Error in update Products==> ${error}`);
        }
    }
    updateProducts(prodId: number, title: string, desc: string, price: number) {
        const [products, index] = this.findProduct(prodId);
        console.log(products);
        console.log(index);
        const updateProduct = { ...products };
        //console.log(updateProduct[0]['name']);
        if (title) {
            updateProduct['0']['name'] = title;
        }
        if (desc) {
            updateProduct['0']['des'] = desc;
        }
        if (price) {
            updateProduct['0']['price'] = price;
        }

        //this.products = updateProduct;
    }


    private findProduct(prodId: number) {
        const products = this.products.filter(prods => prods.id == prodId);
        const findIndex = this.products.findIndex(prods => prods.id == prodId);
        const prodIndex = this.products[findIndex];
        if (!products.length) {
            throw new NotFoundException('Could not found!');
        }
        return [products, prodIndex];
    }
}