import { body } from 'express-validator';
import { RequestValidator } from '@adapter/express/middleware/requestValidator';

export class PostAuthenticationValidator {
  public validate = [
    body('username').trim().normalizeEmail().isEmail().withMessage('must be a valid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
    RequestValidator
  ];
}
