const fs = require("fs");
const path = require("path");
const {execSync} = require("child_process");
const chalk = require("chalk");
const eventTemplates = require("./Esmile-Events");

function generateEsmileFile(dir, name) {
  const str = `{
    "project": "${name}",
    "lib": {
      "discord.js": "14.7.1"
    }
  }
  `;
  fs.writeFileSync(path.join(dir, "esmile.json"), str);
}

function generateConfigFile(dir, prefix, token) {
  const str = `module.exports = {
        prefix: "${prefix}",
        token: "${token}"
    }
    `;
  fs.writeFileSync(path.join(dir, "config.js"), str);
}

function generateMainFile(dir) {
  const str = `const { Client, GatewayIntentBits } = require("discord.js");
    const { handlerCommands, handlerEvents } = require("./utils/handlers");
    const config = require("./config.js");
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    (async () => {
      client.commands = new Map();
      client.events = new Map();
      client.prefix = config.prefix;
      await handlerCommands(client, '../commands');
      await handlerEvents(client, '../events');
      await client.login(config.token);
    })();\n
    `;

  fs.writeFileSync(path.join(dir, "index.js"), str);
}

function generatePackageJSON(dir, name) {
  const str = `{
    "name": "${name}",
    "version": "1.0.0",
    "description": "",
    "main": "src/index.js",
    "scripts": {
      "start": "node src/index.js",
      "dev": "nodemon src/index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "discord.js": "14.7.1"
    }
  }
  `;
  fs.writeFileSync(path.join(dir, "package.json"), str);
}

function generateMessageEvent(dir) {
  const str = `const BaseEvent = require('../../utils/structures/BaseEvent');
  module.exports = class MessageEvent extends BaseEvent {
    constructor() {
      super('messageCreate');
    }

    async run(client, message) {
      if (message.author.bot) return;
      if (message.content.startsWith(client.prefix)) {
        const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\\s+/);
        const command = client.commands.get(cmdName);
        if (command) {
          command.run(client, message, cmdArgs);
        }
      }
    }
  }`;
  fs.writeFileSync(path.join(dir, "Message", "MessageEvent.js"), str);
}

function generatePingCommand(dir) {
  const str = `const BaseCommand = require('../../utils/structures/BaseCommand');
  module.exports = class PingCommand extends BaseCommand {
    constructor() {
      super('ping', 'info', []);
    }

    async run(client, message, args) {
      message.channel.send({
        content: 'Pong!'
      });
    }
  }`;
  fs.writeFileSync(path.join(dir, "info", "ping.js"), str);
}

function generateReadyEvent(dir) {
  const str = `const BaseEvent = require('../../utils/structures/BaseEvent');
  module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
      super('ready');
    }

    async run(client) {
      console.log(client.user.tag + ' on.');
    }
  }
  `;
  fs.writeFileSync(path.join(dir, "Ready", "ReadyEvent.js"), str);
}

function generateUtilFiles(dir, dir_struct) {
  const handler = `const path = require('path');
  const fs = require('fs').promises;
  const BaseCommand = require('./structures/BaseCommand');
  const BaseEvent = require('./structures/BaseEvent');
  
  async function handlerCommands(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
      const stat = await fs.lstat(path.join(filePath, file));
      if (stat.isDirectory()) handlerCommands(client, path.join(dir, file));
      if (file.endsWith('.js')) {
        const Command = require(path.join(filePath, file));
        if (Command.prototype instanceof BaseCommand) {
          const cmd = new Command();
          client.commands.set(cmd.name, cmd);
          cmd.aliases.forEach((alias) => {
            client.commands.set(alias, cmd);
          });
        }
      }
    }
  }

  async function handlerEvents(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
      const stat = await fs.lstat(path.join(filePath, file));
      if (stat.isDirectory()) handlerEvents(client, path.join(dir, file));
      if (file.endsWith('.js')) {
        const Event = require(path.join(filePath, file));
        if (Event.prototype instanceof BaseEvent) {
          const event = new Event();
          client.events.set(event.name, event);
          client.on(event.name, event.run.bind(event, client));
        }
      }
    }
  }

  module.exports = { 
    handlerCommands, 
    handlerEvents,
  };`;

  const baseCommand = `module.exports = class BaseCommand {
    constructor(name, category, aliases) {
      this.name = name;
      this.category = category;
      this.aliases = aliases;
    }
  }`;

  const baseEvent = `module.exports = class BaseEvent {
    constructor(name) {
      this.name = name;
    }
  }`;

  fs.writeFileSync(path.join(dir, "handlers.js"), handler);
  fs.writeFileSync(path.join(dir_struct, "BaseCommand.js"), baseCommand);
  fs.writeFileSync(path.join(dir_struct, "BaseEvent.js"), baseEvent);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getEventName = (name) => `${capitalize(name)}Event.js`;

async function generateEvents(events) {
  console.log("Generating the selected events ...");
  const di = path.join(process.cwd(), "src");
  const dir = path.join(di, "events");
  for (const event of events) {
    const fileName = getEventName(event);
    const template = await getTemplate(event);
    if (fs.existsSync(path.join(dir, fileName)))
      return console.log(
        chalk.red.bold("Error you already have that event if you want another one of the same event rename the one you already have!")
      );
    fs.writeFileSync(path.join(dir, fileName), template);
    console.log(chalk.cyan(`Successfully generated ${event} event!`));
  }
  return console.log(chalk.white.bold("The selected events were successfully generated!"));
}

async function getTemplate(event) {
  return eventTemplates[event];
}

function generateProject(name, dir, prefix, token) {
  var projectPath;
  if (dir === "Inside") {
    projectPath = path.join(process.cwd(), `${name}`);
    if (fs.existsSync(projectPath)) return console.log(`The directory with name ${name} already exists`);
  } else if (dir === "Outside") {
    projectPath = path.join(process.cwd());
  }
  console.log("Generating project ...");
  const srcPath = path.join(projectPath, "src");
  const utilsPath = path.join(srcPath, "utils");
  const commandsPath = path.join(srcPath, "commands");
  const eventsPath = path.join(srcPath, "events");
  const structuresPath = path.join(utilsPath, "structures");
  const pingCommandFolder = path.join(commandsPath, "info");
  const readyEventFolder = path.join(eventsPath, "Ready");
  const messageEventFolder = path.join(eventsPath, "Message");
  if (dir === "Inside") {
    fs.mkdirSync(projectPath);
  }
  fs.mkdirSync(srcPath);
  fs.mkdirSync(utilsPath);
  fs.mkdirSync(commandsPath);
  fs.mkdirSync(eventsPath);
  fs.mkdirSync(structuresPath);
  fs.mkdirSync(pingCommandFolder);
  fs.mkdirSync(readyEventFolder);
  fs.mkdirSync(messageEventFolder);
  generateEsmileFile(projectPath, name);
  generateConfigFile(srcPath, prefix, token);
  generateMainFile(srcPath);
  generatePackageJSON(projectPath, name);
  generateMessageEvent(eventsPath);
  generatePingCommand(commandsPath);
  generateReadyEvent(eventsPath);
  generateUtilFiles(utilsPath, structuresPath);

  console.log("Installing dependencies ...");
  execSync("npm install", {cwd: projectPath});
  if (dir === "Inside") {
    console.log(`\n\tTo enter the project directory use cd ./${name}`);
  }
  console.log(chalk.white.bold(`\tTo start the project use npm start`));
}

module.exports = {
  generateProject,
  generateEvents,
};
