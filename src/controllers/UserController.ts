import express, { Request, Response } from 'express'
import { validateRequest } from '@oregtickets/common'
import { 
    getAllUsersByIsDelete,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addUsersToGroup,
 } from './../services'
import {
    getAllValidation,
    getUserByIdValidation,
    createUserValidation,
    updateUserValidation,
    deleteUserValidation,
    usersToGroupCreateValidation,
    LoggerMiddleware,
} from './../middlewares'
import { ErrorHandler } from './../handlers'

const router = express.Router()

router.post('/api/add-users-to-group',
    LoggerMiddleware,
    usersToGroupCreateValidation,
    validateRequest, async(req: Request, res: Response) => {
    const { method } = req
    const { groupId, userIds } = req.body
    try {
        const usersToGroup = await addUsersToGroup(groupId, userIds)
        res.status(201).send(usersToGroup)
    } catch (e) {
        ErrorHandler(req.body, method, e, 'Cant add users to group!!')
    }
})

router.get('/api/users/:mode',
    LoggerMiddleware,
    getAllValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        const { mode } = req.params;
        const { method } = req
        throw new Error('')
        try {
            if (mode === 'true') {
                const users = await getAllUsersByIsDelete(true)
                res.status(200).send(users);
            } else if (mode === 'false') {
                const users = await getAllUsersByIsDelete(false)
                res.status(200).send(users);
            } else if (mode === 'all') {
                const users = await getAllUsers()
                res.status(200).send(users);
            }
        } catch (e) {
            ErrorHandler(req.params, method, e, 'Cant retrieve users')
        }
    })


router.get('/api/user/:id',
    LoggerMiddleware,
    getUserByIdValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { method } = req
        try {
            const user = await getUserById(id)
            res.status(200).send(user);
        } catch (e) {
            ErrorHandler(req.params, method, e, 'Cant retrieve user!')
        }
    })

router.post('/api/user', 
    LoggerMiddleware,
    createUserValidation,
    validateRequest, async (req: Request, res: Response) => {
        const { login, password, age } = req.body;
        const { method } = req
        try {
            const user = {
                login,
                password,
                age: +age,
                is_deleted: false
            }
            const createdUser = await createUser(user)
            res.status(201).send(createdUser)
        } catch (e) {
            ErrorHandler(req.body, method, e, 'User could not get created!')
        }
    })

router.put('/api/user',
    LoggerMiddleware,
    updateUserValidation,
    validateRequest, async (req: Request, res: Response) => {
        const { id } = req.body;
        const { method } = req
        try {
            const user = await updateUser(req.body, id)
            res.status(200).send(user);
        } catch (e) {
            ErrorHandler(req.body, method, e, 'Error updating the user')
        }
    })

router.delete('/api/user/:id',
    LoggerMiddleware,
    deleteUserValidation
    ,validateRequest, async (req: Request, res: Response) => {
        const { id } = req.params;
        const { method } = req
        try {
            const user = await deleteUser(id)
            res.status(200).send(user);
        } catch (e) {
            ErrorHandler(req.params, method, e, 'User could not get deleted!')
        }
    })

export { router as UserController }
