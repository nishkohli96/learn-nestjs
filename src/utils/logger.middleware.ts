/*
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        next();
    }
}
*/

/* 
    Or can write it as a function, without the @Injectable Part 

    export function logger(req: Request, res: Response, next: NextFunction) {
        console.log(`Request...`);
        next();
    };

*/
