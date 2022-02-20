import { CommandParser } from "../lib";

test("should parse a command", () => {
  let parser = new CommandParser({ prefix: "~" });
  expect(parser.parse("~drink juice")).toStrictEqual({ success: true, command: "drink", args: ["juice"] });
});

test("should not parse a command", () => {
  let parser = new CommandParser({ prefix: "~" });
  expect(parser.parse("just drink juice")).toStrictEqual({ success: false });
});

test("should not parse a case sensitive command", () => {
  let parser = new CommandParser({ prefix: "c!", caseSensitive: true });
  expect(parser.parse("C!laugh")).toStrictEqual({ success: false });
});
