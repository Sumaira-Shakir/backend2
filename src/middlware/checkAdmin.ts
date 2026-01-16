// import { Request, Response, NextFunction } from "express";

// export const checkAdmin = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     if (req.user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied, Admin role required",
//       });
//     }

//     next();
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };
import { Request, Response, NextFunction } from "express";

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: {
    id?: string;
    email?: string;
    role?: string;
    [key: string]: any; // optional for other JWT fields
  };
}

export const checkAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not logged in",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin role required",
      });
    }

    next(); // user is admin, continue
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
