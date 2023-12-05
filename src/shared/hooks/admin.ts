import { auth, response } from '@lib';
import { FastifyReply, FastifyRequest } from 'fastify';

export const adminAuth = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const token = req.cookies.token;
  if (!token) return rep.status(401).send(response.failure('No token'));

  const result = auth.verifyToken(token);
  if (!result.success) return rep.send(response.failure('Wrong token'));
}
