import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

/* Use it like this-

    @Get()
    async findOne(@User() user: UserEntity) {
        console.log(user);
    }
*/
