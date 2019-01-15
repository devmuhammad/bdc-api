import { Request, Response } from "express";
import { getConnection, Repository, getManager } from "typeorm";
import { users } from "../entities/users";

let userRepository: Repository<users>;

const initializeDb = async () => {
    // const connection = getConnection();
    // userRepository = connection.getRepository(users);
    userRepository = getManager().getRepository(users);
}

/**
 * Loads all users from the database.
 */

export const getUsers = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const allUsers = await userRepository.find()
        return res.status(200).json({ status: "success", message: "Users", data: allUsers })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

/**
* Loads a user by ID.
*/
export const getUserById = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const user = await userRepository.findOne(req.params.id)

        if (!user) return res.status(404).json({ status: "error", message: "User not found" })

        return res.status(200).json({ status: "success", message: "User", data: user })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

/**
 * Create new User
 */
export const addUser = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const newUser = await userRepository.create(req.body)

        await userRepository.save(newUser)
        return res.status(200).json({ status: "success", message: "User Added Successfully", data: newUser })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}


/**
 * Update a user
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        initializeDb();
        let toUpdate = await userRepository.findOne(req.body.id);
        delete toUpdate.password

        let updated = Object.assign(toUpdate, req.body)
        await userRepository.save(updated)
        return res.status(200).json({ status: "success", message: "User Updated Successfully", data: updated })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

/**
 * Delete a user
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        initializeDb();
        await userRepository.delete(req.params.id)
        return res.status(200).json({ status: "success", message: "User Deleted Successfully" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

