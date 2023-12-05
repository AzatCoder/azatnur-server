import { FastifyPluginAsync } from 'fastify';

export interface Module {
  route: FastifyPluginAsync,
  prefix?: string;
}
