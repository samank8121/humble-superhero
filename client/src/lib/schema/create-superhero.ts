'use client';

import { z } from 'zod';

const CreateSuperHeroSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required and must be between 1 and 50 characters',
    })
    .max(50, {
      message: 'Name is required and must be between 1 and 50 characters',
    }),
  superpower: z
    .array(z.string())
    .min(1, { message: 'Superpower must have at least one item' }),
  humilityScore: z
    .number({ message: 'Humility score must be an number' })
    .int({ message: 'Humility score must be an number' })
    .min(0, { message: 'Humility score must be at least 0' })
    .max(10, { message: 'Humility score cannot be greater than 10' }),
});

export default CreateSuperHeroSchema;
