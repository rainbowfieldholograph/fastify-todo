import { z } from 'zod';

export const titleSchema = z.string().max(40);
export const descriptionSchema = z.string();
export const completedSchema = z.boolean();
