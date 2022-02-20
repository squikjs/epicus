# **Epicus**

![npm](https://img.shields.io/npm/dw/epicus)
![tests](https://img.shields.io/badge/tests-passing-brightgreen)
![npm](https://img.shields.io/npm/l/epicus)

> Command parsers for text chat applications.

## Install

Using [npm](https://www.npmjs.com/package/epicus):

```
$ npm install epicus
```

or using [yarn](https://yarnpkg.com/package/epicus):

```
$ yarn add epicus
```

## Basic Usage

```ts
import { CommandParser } from "epicus";

// New parser with prefix "!"
let parser = new CommandParser({ prefix: "!" });

let str = "!hunt unicorn";
parser.parse(str); // { success: true, command: "hunt", args: ["unicorn"] }

// Creating a new plugin
let Unicorns = = new Plugin((command, args) => {
    return { success: true, command, args: args.map((arg) => arg.replace(/unicorn/g, "🦄")) };
});

// Plugging it
parser.plug(Unicorns);
parser.parse(str); // { success: true, command: "hunt", args: ["🦄"] }

```

## API

### `CommandParser([, options])`

#### options

Type: `object`

##### prefix

Type: `string`\
Default: `'!'`

Prefix of your commands.

##### delimiter

Type: `string`\
Default: `' '`

Delimiter to split command.

##### plugins

Type: `Plugin[]`\
Default: `[]`

Plugins to be loaded.

##### caseSensitive

Type: `boolean`\
Default: `false`

Set to `true` to have case sensitive command parsing.

### Methods

#### .plug(plugin)

Plugs a plugin to the command parser.

#### .unplug(plugin)

Unplugs a plugin from the command parser.

#### .parse(string)

Parses the string.

### `Plugin(func, priority?)`

#### func

Type: `( command: string, args: string[], metadata: { prefix: string; delimiter: string; body: string } ) => { success: boolean; command?: Command; args?: Args; }`

Function to be called when the plugin is loaded.

### priority

Type: `number`\
Default: `0`

Sets the priority of the plugin, higher the priority the earlier is loaded.\
Plugins with the same priority are loaded in the order of plugging them to the parser.
