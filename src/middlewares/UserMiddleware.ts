import { body, param } from 'express-validator'
import { BadRequestError } from '@oregtickets/common'
import { isDate } from './../services'

export const getAllValidation = [
    param('mode')
        .trim()
        .notEmpty()
        .isString()
        .custom(mode => {
            if (mode === 'true') {
                return true
            } else if (mode === 'false') {
                return true
            } else if (mode === 'all') {
                return true
            } else {
                throw new BadRequestError('mode must be true, false or all')
            }
        })
        .withMessage('You must supply a valid mode')
]

export const getUserByIdValidation = [
    param('id')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('You must supply a valid UUID')
]

export const createUserValidation = [
    body('login')
        .trim()
        .notEmpty()
        .isString()
        .custom(date => {
            if (isDate(date)) {
                return true
            } else {
                throw new BadRequestError('login must be a valid date')
            }
        })
        .withMessage('You must supply login'),
    body('password')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('You must supply a password'),
    body('age')
        .trim()
        .notEmpty()
        .isNumeric()
        .custom(age => {
            if (age >= 4 && age <= 130) {
                return true
            } else {
                throw new BadRequestError('age must be between 4 and 130')
            }
        })
        .withMessage('You must supply age')
]

export const updateUserValidation = [
    body('id')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('You must supply an id'),
    body('password')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('You must supply a password'),
    body('login')
        .trim()
        .notEmpty()
        .isString()
        .custom(date => {
            if (isDate(date)) {
                return true
            } else {
                throw new BadRequestError('login must be a valid date')
            }
        })
        .withMessage('You must supply login'),
    body('age')
        .trim()
        .notEmpty()
        .isNumeric()
        .custom(age => {
            if (age >= 4 && age <= 130) {
                return true
            } else {
                throw new BadRequestError('age must be between 4 and 130')
            }
        })
        .withMessage('You must supply age')
]

export const deleteUserValidation = [
    param('id')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('You must supply a valid UUID')
]

export const usersToGroupCreateValidation = [
    body('groupId')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('You must supply a groupId'),
    body('userIds')
        .notEmpty()
        .isArray()
        .custom(values => {
            values.forEach((v: string) => {
                if (Number(v) === NaN) {
                    throw new Error('UserIds must be valid positive numbers')
                }
            });
            return true
        })
        .withMessage('You must supply an array of valid userIds'),
]