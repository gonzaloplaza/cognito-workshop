import { body } from 'express-validator';
import { RequestValidator } from '@adapter/express/middleware/requestValidator';

export class PostSignupValidator {
  public validate = [
    body('name').trim().isLength({ min: 5 }).withMessage('name is mandatory'),
    body('email').trim().normalizeEmail().isEmail().withMessage('must be a valid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
    RequestValidator
  ];
}
