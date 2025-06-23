import { describe, it, expect } from "vitest";
import { joinUrls } from "./url";

describe("joinUrls", () => {
  it("should join basic paths", () => {
    expect(joinUrls("http://localhost:8014", "api", "users")).toBe(
      "http://localhost:8014/api/users",
    );
  });

  it("should remove extra slashes", () => {
    expect(joinUrls("http://localhost:8014/", "/api/", "/users/")).toBe(
      "http://localhost:8014/api/users",
    );
  });

  it("should handle single part", () => {
    expect(joinUrls("http://localhost:8014")).toBe("http://localhost:8014");
  });

  it("should handle empty parts", () => {
    expect(joinUrls("", "api", "", "users")).toBe("api/users");
  });

  it("should handle only slashes", () => {
    expect(joinUrls("/", "/", "/")).toBe("");
  });

  it("should handle no input", () => {
    expect(joinUrls()).toBe("");
  });
});
