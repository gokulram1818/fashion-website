import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({ success: false, message: "Not Authorized, No Token" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.json({ success: false, message: "Invalid Token Format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.json({ success: false, message: "Token Invalid or Expired" });
  }
};

export default authUser;
