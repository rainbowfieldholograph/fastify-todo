import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema } from './user.schema';

const signUpUserBodySchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = {
  body: signUpUserBodySchema,
};

export type SignupUserBody = z.infer<typeof signUpUserBodySchema>;
