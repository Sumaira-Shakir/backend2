import express from "express";
import { createProduct, getAllProd, getByID, updateProduct, deleteProduct } from "../controllers/prod-controller";

const prodRoute = express.Router();


prodRoute.post('/create', createProduct);
prodRoute.get('/getAll', getAllProd);
prodRoute.get('/getByID/:id', getByID);
prodRoute.put('/put/:id', updateProduct);
prodRoute.delete('/delete/:id', deleteProduct);

export default prodRoute;
