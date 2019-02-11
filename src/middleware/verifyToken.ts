import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { SECRET } from "../../config"

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  
  const token = req.headers['x-access-token'];
  
  if (!token) return res.status(403).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, SECRET, function(err, decoded) {
    if (err)
    {
      return res.status(500).json({ auth: false, message: 'No Authorization: Failed to authenticate token.' });
    }
    // if everything good, save to request for use in other routes 
    const userId = decoded.id
    
    next();
  });

}

