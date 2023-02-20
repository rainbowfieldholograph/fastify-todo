import { z } from 'zod';
import { emailSchema, passwordSchema } from './user.schema';

const loginUserBodySchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginUserSchema = {
  body: loginUserBodySchema,
};

export type LoginUserBody = z.infer<typeof loginUserBodySchema>;
