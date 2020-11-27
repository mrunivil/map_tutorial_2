import { Dimension } from "./dimension";
import { Vector } from "./vector";

describe("Dimension", () => {
  const v1 = new Vector({ x: 2, y: 2 });
  const d1 = new Dimension({ xMin: 1, xMax: 3, yMin: 1, yMax: 3 });
  const d2 = new Dimension({ xMin: 4, xMax: 6, yMin: 2, yMax: 4 });
  const d3 = new Dimension({ xMin: 3, xMax: 5, yMin: 1, yMax: 2 });
  const d4 = new Dimension({ xMin: 2, xMax: 3, yMin: 2, yMax: 4 });
  describe("detectCollisionDimension", () => {
    it("should detect no collision (no touch)", () => {
      const result = Dimension.detectCollisionDimension(d1, d2);
      expect(result).toBeFalsy();
    });
    it("should detect no collision (touch)", () => {
      const result = Dimension.detectCollisionDimension(d1, d3);
      expect(result).toBeFalsy();
    });
    it("should detect a collision", () => {
      const result = Dimension.detectCollisionDimension(d1, d4);
      expect(result).toBeTruthy();
    });
  });
  describe("detectCollisionDimensions", () => {
    it("should detect no collision", () => {
      const result = Dimension.detectCollisionDimensions(d1, d2, d3);
      expect(result).toBeFalsy();
    });
    it("should detect a collision", () => {
      const result = Dimension.detectCollisionDimensions(d1, d2, d3, d4);
      expect(result).toBeTruthy();
    });
  });
  describe("detectCollisionVector", () => {
    it("should detect no collision", () => {
      const result = Dimension.detectCollisionVector(v1, d2);
      expect(result).toBeFalsy();
    });
    it("should detect a collision", () => {
      const result = Dimension.detectCollisionVector(v1, d1);
      expect(result).toBeTruthy();
    });
  });
});
