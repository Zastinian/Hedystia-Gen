import fs from "fs";
import path from "path";
import { execSync } from "child_process";

function generateHedystiaFile(dir: string, name: string) {
  const str = `{
    "project": "${name}",
    "lib": {
      "discord.js": "14.15.3"
    }
  }
  `;
  fs.writeFileSync(path.join(dir, "hedystia.json"), str);
}

function generateConfigFile(dir: string, prefix: string, token: string) {
  const str = `module.exports = {
        prefix: "${prefix}",
        token: "${token}"
    }
    `;
  fs.writeFileSync(path.join(dir, "config.js"), str);
}

function generateMainFile(dir: string) {
  const str = `const {Client} = require("discord.js");
  const {token} = require("./config");
  const client = new Client({
    intents: ["Guilds", "GuildMessages", "MessageContent"],
  });
  client.commands = new Map();
  client.slash = new Map();
  client.aliases = new Map();
  client.setMaxListeners(0);
  require("./handler/loadCommands")(client);
  require("./handler/loadEvents")(client);
  client.login(token);

    `;

  fs.writeFileSync(path.join(dir, "index.js"), str);
}

function generatePackageJSON(dir: string, name: string) {
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
      "discord.js": "14.15.3"
    }
  }
  `;
  fs.writeFileSync(path.join(dir, "package.json"), str);
}

function generateMessageEvent(dir: string) {
  const str = `const escapeRegex = (str) => str.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");
  const config = require("../../config");

  module.exports = {
    event_name: "messageCreate",
    run: (client, message) => {
      const PREFIX = config.prefix;
      if (message.author.bot) return;
      if (message.guild.members.me.isCommunicationDisabled()) return;
      if (!message.guild.members.me.permissionsIn(message.channel).has("SendMessages")) return;
      const prefixRegex = new RegExp(\`^(<@!?$\{client.user.id}>|$\{escapeRegex(PREFIX)})\\\\s*\`);
      if (!prefixRegex.test(message.content)) return;
      const [, matchedPrefix] = message.content.match(prefixRegex);
      const p = matchedPrefix.length;
      const args = message.content.slice(p).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);
      if (!command) return;
      if (!message.member.permissions.has(command.userPerms || [])) {
        return message.reply(\`You need the permission of  $\{command.userPerms}\`);
      }
      if (!message.guild.members.me.permissions.has(command.botPerms || [])) {
        return message.reply(\`I need the permission of $\{command.botPerms}\`);
      }
      command.run(client, message, args, p);
    },
  };
  `;
  fs.writeFileSync(path.join(dir, "core", "command.js"), str);
}

function generatePingCommand(dir: string) {
  const str = `module.exports = {
    name: "ping",
    description: "Get the ping of the bot!",
    run: async (client, message, args) => {
      message.channel.send({
        content: \`🏓 Pong!\\n\\\`\\\`\\\`yml\\n\` + Math.round(client.ws.ping) + \`ms\\\`\\\`\\\`\`,
      });
    },
  };
  `;
  fs.writeFileSync(path.join(dir, "info", "ping.js"), str);
}

function generateReadyEvent(dir: string) {
  const str = `module.exports = {
    event_name: "ready",
    run: (client) => {
      console.log(\`On!\`);
      client.user.setStatus("dnd");
      client.user.setActivity("Hedystia Gen");
    },
  };
  `;
  fs.writeFileSync(path.join(dir, "client", "ready.js"), str);
}

function generateHandlerFiles(dir: string) {
  const loadCommands = `const { readdirSync } = require("fs");
  async function loadCommands(client) {
    const commandFolders = readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = readdirSync(\`./src/commands/\${folder}\`).filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(\`../commands/\${folder}/\${file}\`);
        if (command.name) {
          client.commands.set(command.name, command);
        } else {
          continue;
        }
        if (command.aliases && Array.isArray(command)) command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
      }
    }
  }

  module.exports = loadCommands;
  `;

  const loadEvents = `const { readdirSync } = require("fs");
  async function loadEvents(client) {
    const eventFolders = readdirSync("./src/events");
    for (const folder of eventFolders) {
      const eventFiles = readdirSync(\`./src/events/\${folder}\`).filter((file) => file.endsWith(".js"));
      for (const file of eventFiles) {
        const event = require(\`../events/\${folder}/\${file}\`);
        if (event.event_name) {
          client.on(event.event_name, (...args) => event.run(client, ...args));
        } else {
          continue;
        }
      }
    }
  }

  module.exports = loadEvents;
  `;

  fs.writeFileSync(path.join(dir, "loadCommands.js"), loadCommands);
  fs.writeFileSync(path.join(dir, "loadEvents.js"), loadEvents);
}

export default function generateMessageProject(
  name: string,
  dir: string,
  prefix: string,
  token: string,
  install: string,
  packageManager: string,
) {
  let projectPath = path.join(process.cwd());
  if (dir === "Inside") {
    projectPath = path.join(process.cwd(), `${name}`);
    if (fs.existsSync(projectPath))
      return console.log(`The directory with name ${name} already exists`);
  }
  console.log("Generating project ...");
  const srcPath = path.join(projectPath, "src");
  const handlerPath = path.join(srcPath, "handler");
  const commandsPath = path.join(srcPath, "commands");
  const eventsPath = path.join(srcPath, "events");
  const pingCommandFolder = path.join(commandsPath, "info");
  const clientEventFolder = path.join(eventsPath, "client");
  const coreEventFolder = path.join(eventsPath, "core");
  if (dir === "Inside") {
    fs.mkdirSync(projectPath);
  }
  fs.mkdirSync(srcPath);
  fs.mkdirSync(handlerPath);
  fs.mkdirSync(commandsPath);
  fs.mkdirSync(eventsPath);
  fs.mkdirSync(pingCommandFolder);
  fs.mkdirSync(clientEventFolder);
  fs.mkdirSync(coreEventFolder);
  generateHedystiaFile(projectPath, name);
  generateConfigFile(srcPath, prefix, token);
  generateMainFile(srcPath);
  generatePackageJSON(projectPath, name);
  generateMessageEvent(eventsPath);
  generatePingCommand(commandsPath);
  generateReadyEvent(eventsPath);
  generateHandlerFiles(handlerPath);

  if (install === "Yes") {
    console.log("Installing dependencies ...");
    switch (packageManager) {
      case "npm":
        execSync("npm install", { cwd: projectPath });
        break;
      case "pnpm":
        execSync("pnpm install", { cwd: projectPath });
        break;
      case "yarn":
        execSync("yarn install", { cwd: projectPath });
        break;
      case "bun":
        execSync("bun install", { cwd: projectPath });
        break;
    }
  }
  if (dir === "Inside") {
    console.log(`\n\tTo enter the project directory use cd ./${name}`);
  }
  console.log("\x1b[97m\tTo start the project use npm start\x1b[0m");
}
