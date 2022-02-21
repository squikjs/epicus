import { CommandParser, Plugin } from "../lib";

let commands = ["help", "hunt"];
let parser = new CommandParser({ prefix: "!" });

let Filter = new Plugin((command, args) => {
  if (!commands.includes(command)) return { success: false };
  return { success: true, command, args };
});

parser.plug(Filter);
console.log(parser.parse("!help")); // { success: true, command: "help", args: [] }
console.log(parser.parse("!hunt")); // { success: true, command: "hunt", args: [] }
console.log(parser.parse("!move")); // { success: false }
