import express from "express";
import mongoose from "mongoose";
import { Product } from "../database/models/Product";
import ProductTable from "../database/schemas/ProductSchema";

const apiRouter:express.Router = express.Router();

// Create
apiRouter.post('/products',async (request: express.Request, response:express.Response)=>{
  try{
      let product = {
         name : request.body.name,
         image : request.body.image,
         price : request.body.price,
         qty : request.body.qty,
         info : request.body.info
      };
      // check if the product is already exists
      let existingProduct =  await ProductTable.findOne({name : product.name});
      if(existingProduct){
         return response.status(401).json({
            msg: 'Product is already exists!'
         });
      }
      // create the product
      let newProduct = new ProductTable(product)
      // insert into databse
      product = await newProduct.save();
      response.status(200).json(product)
  }catch(error){
   console.log(error);
   response.status(500).json({
      error : error
   })
   
  }
});

//Update
apiRouter.put('/products/:productId',async (request: express.Request, response:express.Response)=>{
    let {productId} = request.params;
    try{
      let updatedProduct = {
         name : request.body.name,
         image : request.body.image,
         price : request.body.price,
         qty : request.body.qty,
         info : request.body.info
      };
      // check if the product is exist
      let product : Product | null = await ProductTable.findById(productId);
      if(!product){
         return response.status(404).json({
           msg :  'Product is not Exists!'
         });
      }
      // update product
      product = await ProductTable.findByIdAndUpdate(productId,{
         $set : {
            name : updatedProduct.name ? updatedProduct.name :  product.name,
            image : updatedProduct.image ? updatedProduct.image :  product.image,
            price : updatedProduct.price ? updatedProduct.price :  product.price,
            qty : updatedProduct.qty ? updatedProduct.qty :  product.qty,
            info : updatedProduct.info ? updatedProduct.info :  product.info
         }
      },{ new : true });
      response.status(200).json(product);
    }catch(error){
      console.log(error);
   response.status(500).json({
      error : error
   });
    }
 });
// Get all Products
apiRouter.get('/products',async (request: express.Request, response:express.Response)=>{
    try{
      let products:Product[] = await ProductTable.find();
      response.status(200).json(products)
    }catch(error){
      console.log(error);
      response.status(500).json({
         error : error
      });
    }
 });
//  Single Product
apiRouter.get('/products/:productId',async (request: express.Request, response:express.Response)=>{
    let {productId} = request.params;
    try{
      let product:Product | null = await ProductTable.findById(productId);
      if(!product){
         return response.status(404).json({
            msg : 'Product is Not Found!'
         });
      }
      response.status(200).json(product);
    }catch(error){
      console.log(error);
      response.status(500).json({
         error : error
      });
    }
 });
//  Delete
apiRouter.delete('/products/:productId',async (request: express.Request, response:express.Response)=>{
    let {productId} = request.params;
    try{
      let product:Product | null = await ProductTable.findById(productId);
      if(!product){
         return response.status(404).json({
            msg : 'Product is Not Found!'
         });
      }
      // delete
      product = await ProductTable.findByIdAndRemove(productId);
      response.status(200).json(product)
    }catch(error){
      console.log(error);
      response.status(500).json({
         error : error
      });
    }
 });



export default apiRouter;