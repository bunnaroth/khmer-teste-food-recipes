import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("editorial content validation", () => {
  it("accepts the current linked content records", () => {
    const result = spawnSync(
      process.execPath,
      ["scripts/validate-content.mjs"],
      { encoding: "utf8" },
    );

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Content validation passed:");
  });
});
