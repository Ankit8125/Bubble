import {z} from 'zod'

export const signInSchema = z.object({
  identifier: z.string(), // nothing but 'username', but in industry -> we generally call it as 'identifier'
  password: z.string()
})