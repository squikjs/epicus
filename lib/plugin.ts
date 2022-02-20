import { Args, Command, CommandParserResult } from "./parser";

export type PluginFunc = (
  command: Command,
  args: Args,
  metadata: { prefix: string; delimiter: string; body: string }
) => CommandParserResult;

export class Plugin {
  func: PluginFunc;
  priority: number;

  constructor(func: PluginFunc, priority?: number) {
    this.func = func;
    this.priority = priority || 0;
  }
}

/* Pre-built Debug Plugin */
export const Debug: Plugin = new Plugin((command: Command, args: Args): CommandParserResult => {
  console.log(
    `[ epicus ] command: ${JSON.stringify(command)} | args: ${args
      .map((arg) => JSON.stringify(arg))
      .join(", ")}`
  );

  return {
    success: true,
    command,
    args,
  };
});
