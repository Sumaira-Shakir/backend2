import jwt from "jsonwebtoken";

// Function to generate JWT
export function generateJwt(payload: any) {
  const secret = process.env.JWT_SECRET || "123";
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

// Function to compare/verify JWT
export function jwtCompare(token: string) {
  const secret = process.env.JWT_SECRET || "123";
  return jwt.verify(token, secret);
}
