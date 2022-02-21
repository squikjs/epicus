import { CommandParser } from "../lib";
let parser = new CommandParser({ prefix: "~" });
let str = "~hello world";

let { success, command, args } = parser.parse(str);
console.log(success); // true
console.log(command); // "hello"
console.log(args); // ["world"]
