'use client';

import { z } from 'zod';

const CreateSuperHeroSchema = z.object({
  name: z.string().refine((val) => val.length >= 1 && val.length <= 50, {
    message: 'Name is required and must be between 1 and 50 characters',
  }),
  superpower: z
    .array(z.string())
    .min(1, { message: 'Superpower must have at least one item' }),
  humilityScore: z
    .number({
      message: 'Humility score must be an integer between 0 and 10',
    })
    .refine((val) => Number.isInteger(val) && val >= 0 && val <= 10, {
      message: 'Humility score must be an integer between 0 and 10',
    }),
});

export default CreateSuperHeroSchema;
