import { CommandParser, Plugin } from "../lib";

let Unicorn = new Plugin((command, args) => {
  return { success: true, command, args: args.map((arg) => arg.replace(/🦄/g, ":unicorn:")) };
});

let ReverseUnicorn = new Plugin((command, args) => {
  return { success: true, command, args: args.map((arg) => arg.replace(/:unicorn:/g, "🦄")) };
}, 1);

// Still loads as [Unicorn, ReverseUnicorn] because `ReverseUnicorn` has more priority
let parser = new CommandParser({ prefix: "!", plugins: [ReverseUnicorn, Unicorn] });
let str = "!hunt 🦄";

console.log(parser.parse(str)); // { success: true, command: "hunt", args: [":unicorn:"] }
