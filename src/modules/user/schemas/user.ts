import { z } from 'zod';

export const passwordSchema = z.string();
export const usernameSchema = z.string().max(20);
export const emailSchema = z.string().email();
