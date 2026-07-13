import { Redis } from "ioredis";
const client=process.env.REDIS_URL?new Redis(process.env.REDIS_URL,{lazyConnect:true,maxRetriesPerRequest:1}):undefined;
export async function cached<T>(key:string,loader:()=>Promise<T>,ttl=60){if(!client)return loader();try{const hit=await client.get(key);if(hit)return JSON.parse(hit) as T;const value=await loader();await client.set(key,JSON.stringify(value),"EX",ttl);return value;}catch{return loader();}}
export async function invalidate(key:string){try{await client?.del(key);}catch{/* graceful cache degradation */}}
