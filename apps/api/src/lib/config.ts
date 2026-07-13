import { z } from "zod";
const schema=z.object({NODE_ENV:z.enum(["development","test","production"]).default("development"),API_PORT:z.coerce.number().default(3000),JWT_SECRET:z.string().min(32).default("development-only-secret-change-before-production"),CORS_ORIGIN:z.string().default("http://localhost:5173")});
export const config=schema.parse(process.env);
