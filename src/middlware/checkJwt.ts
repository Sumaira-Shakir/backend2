// import { Request, Response, NextFunction } from "express";
// import { jwtCompare } from "../helpers/token"; // fix path

// export const checkJwt = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization header missing",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token not found",
//       });
//     }

//     const decoded = jwtCompare(token);
//     console.log(decoded);

//     (req as any).user = decoded; // or use interface extension
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//       error,
//     });
//   }
// };

import { Request, Response, NextFunction } from "express";
import { jwtCompare } from "../helpers/token";

// Extend Express Request type to include `user`
interface AuthenticatedRequest extends Request {
  user?: any; // you can replace `any` with your User type
}

export const checkJwt = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    const decoded = jwtCompare(token);
    req.user = decoded; // attach decoded token to request

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

