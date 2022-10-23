import { z } from 'zod';

const createUserBodySchema = z.object({
  username: z.string().max(20),
  email: z.string().email(),
  password: z.string(),
});

export const createUserSchema = {
  body: createUserBodySchema,
};

export type CreateUser = z.infer<typeof createUserBodySchema>;
