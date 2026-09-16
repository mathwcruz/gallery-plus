import { z } from 'zod';

export const newPhotoFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'O título é obrigatório' })
    .max(255, { message: 'O título deve ter no máximo 255 caracteres' }),
  file: z.instanceof(FileList).refine((file) => file.length > 0, {
    message: 'É necessário selecionar uma foto',
  }),
  albumIds: z.array(z.string().uuid()).optional(),
});

export type NewPhotoFormSchema = z.infer<typeof newPhotoFormSchema>;
