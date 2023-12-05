import { FastifyInstance } from 'fastify';
import { addMessage } from './service';
import { response } from '@lib';
import { SendMessageRequest, sendMessageSchema } from './schemas';
import { messageDTO } from './dtos';

export const messagesRoute = async (fastifyApp: FastifyInstance) => {
  fastifyApp.post(
    '/',
    { schema: sendMessageSchema },
    async (req: SendMessageRequest, rep) => {
      const dto = messageDTO(req.body);
      const result = await addMessage(dto);
      const resp = response.success(result.data);

      return rep.send(resp);
    }
  );
}
