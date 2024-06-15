import jwt from 'jsonwebtoken';

const signToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
export default signToken;
