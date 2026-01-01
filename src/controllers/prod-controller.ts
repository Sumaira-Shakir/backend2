
import { Request, Response } from "express";
import { getByIdSchema,patchSchema,deleteSchema,productArraySchema} from "../schemas";
import ProductModel from "../models/prod-model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = productArraySchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Validation error: " + error.issues[0].message
      });
    }

    // Multiple products create
    const products = await ProductModel.insertMany(data); // array insert

    return res.status(201).json({
      success: true,
      message: "Products created successfully",
      data: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

 export const getAllProd = async (req: Request, res: Response) => {
  try {
    // const products = await ProductModel.find({ category: "Electronics" })
    //   .sort({ price: 1 })
    //   .limit(5)
    //   .lean();
      // const products = await ProductModel.find({category:"electronics"},{name:1,category:1,quantity:1,_id:0});
      const products = await ProductModel.find({price:{$lt:2000}}).sort({price:1});
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export const getByID = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = getByIdSchema.safeParse(req.params);
    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Error while parsing schema: " + error.issues[0].message
      });
    }

    const product = await ProductModel.findById(data.id, req.body, { new: true, runValidators: true });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

  res.json({ success: true, message: "Product get successfully", data: product });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:"internal server error"+error
    })
  }
}
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = patchSchema.safeParse({ id: req.params.id, ...req.body });

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Validation error: " + error.issues[0].message,
      });
    }

    const product = await ProductModel.findByIdAndUpdate(data.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = deleteSchema.safeParse(req.params);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Validation error: " + error.issues[0].message
      });
    }

    const product = await ProductModel.findByIdAndDelete(data.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
