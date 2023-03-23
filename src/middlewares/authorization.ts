import type {NextFunction, Request, Response} from 'express';
import * as JWT from 'jsonwebtoken';

export function authorizeApiRequest(request: Request, response: Response, next: NextFunction) {
    const authToken = request.get('authorization')?.substring(7);

    if (!authToken) {
        response
            .status(401)
            .json({
                success: false,
                error: 'SERVER ERROR: Access denied. No token provided.'
            });
        return
    }

    try {
        JWT.verify(authToken, process.env.JWT_SECRET);
        next();
    } catch (error) {
        response
            .status(500)
            .json({
                success: false,
                error: `SERVER ERROR: Invalid token (${error.message}).`
            });
    }
}
