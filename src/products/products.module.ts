/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController, ProductMongoController } from './products.controller';
import { productSchema } from './products.model';
import { ProductServices } from "./products.services";

@Module({
    imports: [MongooseModule.forFeature([{ name: "Product", schema: productSchema }])],
    controllers: [ProductController, ProductMongoController],
    providers: [ProductServices]
})
export class ProductModule { }
