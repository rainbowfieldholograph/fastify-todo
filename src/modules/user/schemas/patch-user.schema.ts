import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema } from './user.schema';

const patchUserBodySchema = z.object({
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  username: usernameSchema.optional(),
});

export const patchUserSchema = {
  body: patchUserBodySchema,
};

export type PatchUserBody = z.infer<typeof patchUserBodySchema>;
