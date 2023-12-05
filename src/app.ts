import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import fastifyCookie from '@fastify/cookie';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { router } from './router';
import { staticPath } from '@lib';

export const createApp = () => {
  const app = fastify({ logger: true });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyCors);
  app.register(fastifyMultipart);
  app.register(fastifyCookie);
  app.register(fastifyStatic, {
    root: staticPath,
    prefix: '/static'
  });
  app.register(router, { prefix: '/api/v1' });

  return app;
}
