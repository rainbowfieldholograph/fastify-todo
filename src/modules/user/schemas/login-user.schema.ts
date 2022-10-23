import { z } from 'zod';

const loginUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginUserSchema = {
  body: loginUserBodySchema,
};

export type LoginUser = z.infer<typeof loginUserBodySchema>;
