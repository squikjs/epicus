import { CommandParser, Plugin } from "../lib";

let Unicorn = new Plugin((command, args) => {
  return { success: true, command, args: args.map((arg) => arg.replace(/🦄/g, ":unicorn:")) };
});

let parser = new CommandParser({ prefix: "!", plugins: [Unicorn] });
let str = "!hunt 🦄";

console.log(parser.parse(str)); // { success: true, command: "hunt", args: [":unicorn:"] }
