import { Response,Request } from "express";
import { userCreateSchema,loginSchema,getByIDSchema,partialUpdateSchema,deleteSchema } from "../schemas/user-schema";
import UserModel from "../models/user-model";
import loginModel from "../models/login-model";
import { generateJwt } from "../helpers/token";
import { comparePassword,hashingPassword } from "../helpers/hashing";

export async function createUser(req:Request, res:Response) {
  try {
    // Using your style: destructure success, data, error
    const { success, data, error } = userCreateSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    // Check if user already exists
    const isFound = await UserModel.findOne({ email: data.email });
    if (isFound) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await hashingPassword(data.password);

    // Create user
    const user = new UserModel({
      username: data.username,
      email: data.email,
      experience: data.experience,
      skills: data.skills,
      password: hashedPassword,
      role: data.role || "user",
    });

    const newUser = await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error,
    });
  }
}




export const login = async (req:Request, res:Response) => {
  try {
    console.log("Body:", req.body);
    // Zod validation
    const { success, data, error } = loginSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    // Find user
    const isFound = await UserModel.findOne({ email: data.email });
    if (!isFound) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isCorrect = await comparePassword(data.password, isFound.password);
    if (!isCorrect) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }

    // Generate JWT
    const payload = {
      name: isFound.username,
      email: isFound.email,
      role: isFound.role,
    };
    const accessToken = generateJwt(payload);

    // Send response
    res.status(200).json({
      success: true,
      message: "User login successful",
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error,
    });
  }
};



export const getAllUsers = async (req:Request, res:Response) => {
  try {
    // Fetch all users from the database
    const userList = await UserModel.find();

    res.status(200).json({
      success: true,
      message: "Fetched all users",
      data: userList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error,
    });
  }
};


export const getById = async (req: Request, res: Response) => {
  try {
    // Validate request params
    const { success, data, error } = await getByIDSchema.safeParseAsync(req.params);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid schema error: ' + error.issues[0].message,
      });
    }

    // Find user by ID
    const user = await UserModel.findOne({ _id: data.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error,
    });
  }
};


export async function updateUser(req: Request, res: Response) {
  try {
    // Validate request body (includes id + optional fields)
    const { success, data, error } = await partialUpdateSchema.safeParseAsync({
      id: req.params.id,
      ...req.body,
    });

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    // Update user
    const user = await UserModel.findByIdAndUpdate(
      data.id,
      { ...data, password: data.password ? await hashingPassword(data.password) : undefined },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error,
    });
  }
}



export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Validate request params
    const { success, data, error } = await deleteSchema.safeParseAsync(req.params);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }

    // Delete user
    const user = await UserModel.findByIdAndDelete(data.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error,
    });
  }
};

