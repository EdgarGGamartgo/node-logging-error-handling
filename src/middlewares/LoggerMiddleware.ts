import { NextFunction, Request, Response } from 'express'

export const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { params, body, query, method, url } = req
    const SERVICE_REQUEST = {
        method,
        arguments: {
            params,
            body, query
        },
        url
    }
    console.log('SERVICE_REQUEST: ', SERVICE_REQUEST);
    next()
}