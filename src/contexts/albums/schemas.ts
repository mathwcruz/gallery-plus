import { z } from 'zod';

export const newAlbumFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'O título é obrigatório' })
    .max(255, { message: 'O título deve ter no máximo 255 caracteres' }),
  photoIds: z.array(z.string().uuid()).optional(),
});

export type NewAlbumFormSchema = z.infer<typeof newAlbumFormSchema>;
