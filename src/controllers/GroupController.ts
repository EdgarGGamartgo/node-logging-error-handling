import express, { Request, Response } from 'express'
import { validateRequest } from '@oregtickets/common'
import {
    deleteGroupById,
    saveGroupById,
    findGroupById,
    findAllGroups,
    createGroup,
} from './../services'
import {
    postValidation,
    getByIdValidation,
    putValidation,
    deleteValidation,
    LoggerMiddleware,
} from './../middlewares'
import { ErrorHandler } from './../handlers'

const router = express.Router()


router.post('/api/group',
    LoggerMiddleware,
    postValidation,
    validateRequest, async (req: Request, res: Response) => {
        const { method } = req
        try {
            const group = await createGroup(req.body)
            res.status(201).send(group)
        } catch (e) {
            ErrorHandler(req.body, method, e, 'Group could not get created!')
        }
    })

router.get('/api/groups', LoggerMiddleware,  async (req: Request, res: Response) => {
    const { method } = req
    try {
        const groups = await findAllGroups()
        res.status(200).send(groups)
    } catch (e) {
        console.log(e)
        ErrorHandler({}, method, e, 'could not retrieve Groups!!!')
    }
})

router.get('/api/group/:id',
    LoggerMiddleware,
    getByIdValidation,
    validateRequest, async (req: Request, res: Response) => {
        const { id } = req.params
        const { method } = req
        try {
            const group = await findGroupById(id)
            if (group) {
                res.status(200).send(group)
            }
            res.status(200).send([])
        } catch (e) {
            ErrorHandler(req.params, method, e, 'could not retrieve Group!!!')
        }
    })

router.put('/api/group',
    LoggerMiddleware,
    putValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        const { method } = req
        const { id } = req.body
        try {
            const group = await saveGroupById(id, req.body)
            res.status(200).send(group)
        } catch (e) {
            ErrorHandler(req.body, method, e, 'could not update Group!!!')
        }
    })

router.delete('/api/group/:id',
    LoggerMiddleware,   
    deleteValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        const { method } = req
        const { id } = req.params
        try {
            const group = await deleteGroupById(id)
            return res.sendStatus(200).send(group)
        } catch (e) {
            ErrorHandler(req.params, method, e, 'could not delete Group!!!')
        }
    })


export { router as GroupController }
