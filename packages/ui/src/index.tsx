import { cva, type VariantProps } from "class-variance-authority";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren } from "react";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
const buttonVariants = cva("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50", { variants: { variant: { primary: "bg-cyan-400 text-slate-950 hover:bg-cyan-300", secondary: "border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800", ghost: "text-slate-300 hover:bg-slate-800" } }, defaultVariants: { variant: "primary" } });
export function Button({ className, variant, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) { return <button className={cn(buttonVariants({ variant }), className)} {...props} />; }
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn("w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400", className)} {...props} />; }
export function Card({ className, children }: PropsWithChildren<{ className?: string }>) { return <section className={cn("rounded-xl border border-slate-800 bg-slate-900/70 p-4", className)}>{children}</section>; }
