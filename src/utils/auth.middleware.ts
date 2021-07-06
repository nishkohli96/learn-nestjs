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
    use(_req: FastifyRequest, _res: FastifyReply, next: Function) {
        try {
            const header = _req.headers.authorization;
            if (!header) {
                throw new ForbiddenException('No bearer token found');
            }
            const [, token] = header.split(' ');

            verifyJWT(token);

            next();
        } catch {
            throw new UnauthorizedException(
                'Unauthorized, incorrect bearer token',
            );
        }
    }
}
