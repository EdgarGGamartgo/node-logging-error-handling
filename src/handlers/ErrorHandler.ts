// Custom middleware to handle BadRequest errors. I've built this package as a NPM Public Package
import { BadRequestError } from '@oregtickets/common'

export const ErrorHandler = (args: Object, method: string, errorMsg: any, responseError: string) => {
    const ERROR = {
        args,
        method,
        errorMsg
    }
    console.log('ERROR: ', ERROR)
    throw new BadRequestError(responseError)
}
