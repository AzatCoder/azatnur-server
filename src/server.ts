import { createApp } from './app';
import { env } from '@lib';

(async () => {
  const app = createApp();

  app.listen({ port: env.PORT });
})();
