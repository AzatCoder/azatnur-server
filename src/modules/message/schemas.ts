import { FastifyRequest, FastifySchema } from 'fastify';
import { z } from 'zod';

export const sendMessageBody = z.object({
  by: z.string().min(1).max(64),
  messenger: z.string().min(1).max(64),
  username: z.string().min(1).max(64),
  text: z.string().min(1).max(1200)
});

export const sendMessageSchema: FastifySchema = {
  body: sendMessageBody,
};

export type SendMessageBody = z.infer<typeof sendMessageBody>;
export type SendMessageRequest = FastifyRequest<{ Body: SendMessageBody }>;
