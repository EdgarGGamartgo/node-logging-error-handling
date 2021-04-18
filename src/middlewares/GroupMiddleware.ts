import { body, param } from 'express-validator'
import { Permission } from './../enums'

export const postValidation = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('name must be a not empty string'),
    body('permission')
        .isArray()
        .notEmpty()
        .custom((permissions: string[]) => {
            const permissionsValidation = permissions.filter((permission: string) => [...Object.values(Permission)].includes(permission as any))
            if (permissionsValidation.length === permissions.length) {
                return true
            }
            throw new Error('')
        })
        .withMessage('permissions must be a not empty array with the following acceptable elements: "READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"')
]

export const getByIdValidation = [
    param('id')
        .notEmpty()
        .isString()
        .withMessage('id must be numeric')
]

export const putValidation = [
    body('id')
        .notEmpty()
        .isString()
        .withMessage('id must be a string'),
    body('name')
        .isString()
        .notEmpty()
        .withMessage('name must be a not empty string'),
    body('permission')
        .isArray()
        .notEmpty()
        .isIn([...Object.values(Permission)])
        .withMessage('permissions must be a not empty array with the following acceptable elements: "READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"')
]

export const deleteValidation = [
    param('id')
      .notEmpty()
      .isString()
      .withMessage('id must be a string')
]
