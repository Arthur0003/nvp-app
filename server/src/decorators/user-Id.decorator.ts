import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const userID = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request?.user?.id ? parseInt(request.user.id) : null;
});
