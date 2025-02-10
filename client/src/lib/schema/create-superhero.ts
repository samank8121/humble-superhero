'use client';

import { z } from 'zod';

const CreateSuperHeroSchema = z.object({
  name: z.string().min(1).max(50),
  superpower: z.array(z.string()),
  humilityScore: z.number().int().min(0).max(10),
});

export default CreateSuperHeroSchema;
