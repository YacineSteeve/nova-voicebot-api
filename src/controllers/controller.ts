import type { Request, Response } from 'express';

const createControllerMethod = (
    service: (req: Request, res: Response) => Promise<ServiceResponse>
) => {
    return async (request: Request, response: Response) => {
        request.accepts('application/json');
        response.type('application/json');

        try {
            const serviceResponse = await service(request, response);

            response.status(serviceResponse.status).json(serviceResponse.data);
        } catch (error) {
            response.status(500).json({
                success: false,
                error: 'ERROR: ' + error.message,
            });
        }
    }
}

export default createControllerMethod;
