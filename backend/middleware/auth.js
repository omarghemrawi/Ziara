import jwt from "jsonwebtoken";

export const verifyTokenAndRole = (allowedRoles) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.role = decoded.role;

    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient rights" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
