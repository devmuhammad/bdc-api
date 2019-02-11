import { Request, Response } from "express";
import { getConnection, Repository, getManager } from "typeorm";
import { users } from "../entities/users";
import { SECRET } from "../../config"
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';


let userRepository: Repository<users>;

const initializeDb = async () => {
    // const connection = getConnection();
    // userRepository = connection.getRepository(users);
    userRepository = getManager().getRepository(users);
}

/**
 * Login User and create access token
 */
export const login = async (req: Request, res: Response) => {
    try {
        initializeDb();
       
        let dbUser = await checkUser(req.body)
        
        // If check returns false, User doesnt exist
        if (!dbUser) {
            return res.status(401).json({ status: "error", message: "Invalid User or Password" });

        } else if (dbUser) {
            const loginoptions = {
                email: req.body.email,
               
            }
            // If check returns true, Check the password and continue
            let validUser = await userRepository.findOne(loginoptions);
            
            
            let myUser = bcrypt.compareSync(req.body.password, validUser.password)
            if (!myUser) return res.status(401).json({ status: "error", auth: false, message: "Invalid Password or User" })
            //create a token
            let token = await generateJWT(validUser)
           
            res.status(200).json({ status: "success", auth: true, token: token, data: validUser });
        }
    } catch (error) {
        
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}


/**
 * Logout User and revoke access token
 */
export const logout = async (req: Request, res: Response) => {
    try {
        initializeDb();
        res.status(200).json({status:"success", auth: false, token: null });

    }catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
 * Register a User
 */
export const register = async (req: Request, res: Response) => {
    try {
        initializeDb();
        let dbUser =  await checkUser(req.body)
        
        if (dbUser) {
            
            return res.status(401).json({ status: "error", message: "User already exist" });
        }
        if (!dbUser) {
            
            req.body.password =  bcrypt.hashSync(req.body.password,8)
            const newUser = await userRepository.create(req.body)
        
            const nwUser = await userRepository.save(newUser)

            let token = await generateJWT(newUser)
            return res.status(200).json({ status: "success", message: "Registration Successful", token: token, data: nwUser })
        }

    } catch (error) {
        
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}



//Function to check if email or username is unique
const checkUser =   async (userdtl) => {
    let username = userdtl.username
    let email = userdtl.email
    

    const qb = await userRepository
    .createQueryBuilder('users')
    .where('users.username = :username', { username })
    .orWhere('users.email = :email', { email });
    
const user = await qb.getOne();


if (user === undefined) return false ;
else return true

}

// Function to generate JWT token
const generateJWT = async(user) => {
    let today = new Date()
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60)

    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000
    }, SECRET)
}