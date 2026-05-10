import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3001),
    NODE_ENV: z.enum(["development", "production", "test"]),

    DATABASE_URL: z.string().min(1, "Databse url missing"),

    CLERK_PUBLISHABLE_KEY: z.string().min(1, "Clerk publishable key missing"),
    CLERK_SECRET_KEY: z.string().min(1, "Clerk secret key missing"),
    CLERK_WEBHOOK_SECRET: z.string().optional(),

    SENTRY_DSN: z.string().url().optional(),

    POLAR_ACCESS_TOKEN: z.string().optional(),
    POLAR_WEBHOOK_SECRET: z.string().optional(),
    POLAR_API_BASE: z.string().url().default("https://api.polar.sh"),
    
    // todo: update uuid here later 
    POLAR_CHECKOUT_PRODUCT_ID: z.string(),

    STREAM_API_KEY: z.string().min(1, "Stream API key missing"),
    STREAM_API_SECRET: z.string().min(1, "Stream API secret missing"),

    IMAGEKIT_PUBLIC_KEY: z.string().min(1, "ImageKit public key missing"),
    IMAGEKIT_PRIVATE_KEY: z.string().min(1, "ImageKit private key missing"),
    IMAGEKIT_URL_ENDPOINT: z.string().url(),

    FRONTEND_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv() {
    const parsed = envSchema.safeParse(process.env);

    if(!parsed.success){
        console.error(parsed.error.flatten().fieldErrors);
        throw new Error("Invalid environment variables");
    }

    return parsed.data;
}

let cachedEnv: Env | null = null;

export function getEnv() {
    if(!cachedEnv){
        cachedEnv = loadEnv();
    }
    return cachedEnv;
}