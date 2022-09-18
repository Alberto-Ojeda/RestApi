import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
@Controller('product')
export class ProductController {
  //res respuesta del servidor, Body el cuerpo que se manda DTO date transfer object
  constructor( private productService: ProductService) {}
  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    console.log(createProductDTO);
    const product = await this.productService.createProduct(createProductDTO);
    res.status(HttpStatus.OK).json({
      message: 'Product Succesfully Created',
      product: product,
    });
  }
  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    res.status(HttpStatus.OK).json({
      products,
    });
  }
  @Get('/:productID')
  async getproduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('Product Does not exists');
    return res.status(HttpStatus.OK).json(product);
  }
  @Delete('/productID')
  async deleteproduct(@Res() res, @Query('productID') productID){
    const product = await this.productService.deleteProduct(productID);
    if (!product) throw new NotFoundException('Product Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'product deleted succesfully',
      product,
    });
  }
  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() CreateProductDTO: CreateProductDTO,
    @Query('productID') productID,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      CreateProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Product Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'product Updated Sucessfully',
      updatedProduct,
    });
  }
}
