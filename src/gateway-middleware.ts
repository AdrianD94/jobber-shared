import JWT from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import { NotAuthorizedError } from './error-handler';

const tokens: string[] = ['auth', 'seller', 'gyg', 'search', 'buyer', 'message', 'order', 'review'];

export function verifyGatewayRequest(request: Request, response: Response, next: NextFunction):void{
    if(!request.headers?.gatewaytoken){
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway ')
    }
    const token:string = request.headers?.gatewaytoken as string;
    if(!token){
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway ') 
    }

    try {
        const payload: {id:string, iat:number} = JWT.verify(token, 'f1d0a609566559aa4ec352a7c303e940') as {id:string, iat:number};
        if(!tokens.includes(payload.id)){
            throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload is invalid ')  
        }
        
    } catch (error) {
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway ') 
    }
    next();
}