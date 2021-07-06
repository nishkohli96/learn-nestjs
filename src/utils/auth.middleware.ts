import {
    ForbiddenException,
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyJWT } from './password';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(_req: FastifyRequest, _res: FastifyReply, next: Function) {
        const header = _req.headers.authorization;
        if (!header) {
            throw new ForbiddenException('No bearer token found');
        }
        const [, token] = header.split(' ');

        const res = await verifyJWT(token);
        console.log('res ', res);
        if (res) {
            next();
        } else {
            throw new UnauthorizedException(
                'Unauthorized, incorrect bearer token',
            );
        }
    }
}
