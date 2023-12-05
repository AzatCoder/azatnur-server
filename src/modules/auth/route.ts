import { FastifyInstance, FastifyRequest } from 'fastify';
import { authSignDTO } from './dtos';
import { auth, response } from '@lib';

export const authRoutes = async (fastifyApp: FastifyInstance) => {
  fastifyApp.post('/sign-admin', async (
    req: FastifyRequest<{ Body: auth.AdminAuth }>,
    rep
  ) => {
    const dto = authSignDTO(req.body);
    const result = auth.verifyAdmin(dto);
    if (!result.success) return rep.status(403).send(response.failure(result.reason));

    const tokenResult = auth.signAdmin(dto);
    return rep
      .setCookie('token', tokenResult.data, { path: '/' })
      .send(response.success('Cookie setted'));
  });
}
