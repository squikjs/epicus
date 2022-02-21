import { Plugin } from "./plugin";

export type Command = string;
export type Args = string[];

export interface CommandParserOpts {
  prefix?: string;
  delimiter?: string;
  plugins?: Plugin[];
  caseSensitive?: boolean;
}

export interface CommandParserResult {
  success: boolean;
  command?: Command;
  args?: Args;
}

export class CommandParser {
  private prefix: string;
  private delimiter: string;
  private plugins: Plugin[];
  private caseSensitive: boolean;

  constructor(opts: CommandParserOpts = {}) {
    this.prefix = opts.prefix || "!";
    this.delimiter = opts.delimiter || " ";
    this.plugins = opts.plugins || [];
    this.caseSensitive = opts.caseSensitive || false;
  }

  plug(plugin: Plugin) {
    this.plugins.push(plugin);
  }

  unplug(plugin: Plugin) {
    this.plugins = this.plugins.filter((p: Plugin) => p !== plugin);
  }

  parse(str: string): CommandParserResult {
    if (!this.caseSensitive) str = str.toLowerCase();
    if (!str.startsWith(this.prefix)) return { success: false };

    let args: Args = str.slice(this.prefix.length).trim().split(this.delimiter);
    let command: Command = args.shift() || "";

    for (let plugin of this.plugins.sort((a, b) => b.priority - a.priority)) {
      let values = plugin.func(command, args, {
        prefix: this.prefix,
        delimiter: this.delimiter,
        body: args.join(this.delimiter),
      });

      if (!values.success) return { success: false };

      command = values.command || command;
      args = values.args || args;
    }

    return { success: true, command, args };
  }
}
