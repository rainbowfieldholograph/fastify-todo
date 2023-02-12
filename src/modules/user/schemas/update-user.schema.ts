import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema } from './user.schema';

const updateUserBodySchema = z.object({
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  username: usernameSchema.optional(),
});

export const updateUserSchema = {
  body: updateUserBodySchema,
};

export type UpdateUser = z.infer<typeof updateUserBodySchema>;
