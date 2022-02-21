import { CommandParser, Debug } from "../lib";
let parser = new CommandParser({ prefix: "~", plugins: [Debug] });
let str = "~play with toys";

/* Prints this into console:
    [ epicus ] command: "hello" | args: "with", "toys"
*/
parser.parse(str);
