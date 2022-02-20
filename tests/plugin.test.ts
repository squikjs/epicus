import { CommandParser, Debug, Plugin } from "../lib";

test("should convert all markdown laugh emojis to real laughs", () => {
  let Laugh = new Plugin((command, args) => {
    return { success: true, command, args: args.map((arg) => arg.replace(/:laugh:/g, "😂")) };
  });

  let parser = new CommandParser({ prefix: "~", plugins: [Laugh] });

  expect(parser.parse("~laugh :laugh: :laugh: :laugh:")).toStrictEqual({
    success: true,
    command: "laugh",
    args: ["😂", "😂", "😂"],
  });
});

test("should plug the plugin and then unplug the plugin", () => {
  let Hack = new Plugin((command, args, { body }) => {
    return { success: true, command: "hacked", args };
  });

  let parser = new CommandParser({ prefix: "~", plugins: [Hack] });

  expect(parser.parse("~work")).toStrictEqual({
    success: true,
    command: "hacked",
    args: [],
  });

  parser.unplug(Hack);

  expect(parser.parse("~work")).toStrictEqual({
    success: true,
    command: "work",
    args: [],
  });
});

test("should debug the command", () => {
  let parser = new CommandParser({ prefix: "~", plugins: [Debug] });
  jest.spyOn(global.console, "log").mockImplementation();
  parser.parse("~hello world");

  expect(console.log).toBeCalledWith(`[ epicus ] command: "hello" | args: "world"`);
});
