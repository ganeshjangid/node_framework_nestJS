import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ProductServices } from './products.services';


@Controller('productsMongo')
export class ProductMongoController {
  constructor(private readonly productService: ProductServices) { }

  @Post('add')
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const genId = await this.productService.insertProductMongoose(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return {
      message: 'Success',
      prodId: genId,
    };
  }

  @Get('')
  async getAllProducts() {
    const data = await this.productService.getMongoAllProdDetails();
    return {
      message: 'success',
      productDetails: data,
    };
  }
  @Get(':title')
  getProducts(@Param('title') title: string): any {
    return this.productService.getProductDetailsMongo(title);
  }

  @Patch('update')
  async updateProduct(
    @Body('prodId') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const genId = await this.productService.updateProductsMongo(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return {
      message: 'Success',
      prodDetails: genId,
    };
  }



}



@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductServices) { }

  @Post('add')
  addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const genId = this.productService.insertProducts(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return {
      message: 'Success',
      prodId: genId,
    };
  }

  @Get('')
  getAllProducts(): any {
    const data = this.productService.getAllProdDetails();
    return {
      message: 'success',
      productDetails: data,
    };
  }

  @Get(':prodId')
  getProducts(@Param('prodId') prodId: number): any {
    return this.productService.getProductDetails(prodId);
  }

  @Patch('update')
  updateProduct(
    @Body('prodId') prodId: number,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const genId = this.productService.updateProducts(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return {
      message: 'Success',
      prodId: genId,
    };
  }
}

