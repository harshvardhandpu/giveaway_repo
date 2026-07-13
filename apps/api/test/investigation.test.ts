import { describe, expect, it } from "vitest";
import { buildApp } from "../src/app.js";
describe("investigation APIs", () => { it("returns timeline, investigation, and similarity", async () => { const app = buildApp(); expect((await app.inject("/creator/investigation/aurora_chain")).statusCode).toBe(200); expect((await app.inject("/creator/timeline/aurora_chain")).json().events).toHaveLength(5); expect((await app.inject("/creator/similar/aurora_chain")).json().trusted[0].similarity).toBeGreaterThan(.8); await app.close(); }); });
