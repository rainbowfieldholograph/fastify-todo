import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema } from './user.schema';

const createUserBodySchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const createUserSchema = {
  body: createUserBodySchema,
};

export type CreateUserBody = z.infer<typeof createUserBodySchema>;
