import fs from "fs";
import path from "path";
import { execSync } from "child_process";

function generateHedystiaFile(dir: string, name: string) {
  const str = `{
    "project": "${name}",
    "lib": {
      "discord.js": "14.11.0"
    }
  }
  `;
  fs.writeFileSync(path.join(dir, "hedystia.json"), str);
}

function generateConfigFile(dir: string, token: string) {
  const str = `module.exports = {
        token: "${token}"
    }
    `;
  fs.writeFileSync(path.join(dir, "config.js"), str);
}

function generateMainFile(dir: string) {
  const str = `const {Client} = require("discord.js");
  const {token} = require("./config");
  const client = new Client({
    intents: ["Guilds", "GuildMessages"],
  });
  client.commands = new Map();
  client.slash = new Map();
  client.aliases = new Map();
  client.setMaxListeners(0);
  require("./handler/loadSlashCommands")(client);
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

function generateInteractionEvent(dir: string) {
  const str = `module.exports = {
    event_name: "interactionCreate",
    run: (client, interaction) => {
      if (interaction.type !== 2) return;
      const command = client.slash.get(interaction.commandName);
      if (!command) return interaction.reply({content: "Error"});
      if (!interaction.member.permissions.has(command.userPerms || [])) {
        return interaction.reply({
          content: \`You need the permission of  \\\`\${command.userPerms}\\\`\`,
          ephemeral: true,
        });
      }
      if (!interaction.guild.members.me.permissions.has(command.botPerms || [])) {
        return interaction.reply({
          content: \`I need the permission of \\\`\${command.botPerms}\\\`\`,
          ephemeral: true,
        });
      }
      command.run(client, interaction);
    },
  };
  `;
  fs.writeFileSync(path.join(dir, "core", "slash.js"), str);
}

function generatePingCommand(dir: string) {
  const str = `module.exports = {
    name: "ping",
    description: "Get the ping of the bot!",
    run: async (client, interaction) => {
      interaction.reply({
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

  const loadSlashCommands = `const { readdirSync } = require("fs");
  async function loadSlashCommands(client) {
    let slash = [];
    const commandFolders = readdirSync("./src/slash");
    for (const folder of commandFolders) {
      const commandFiles = readdirSync(\`./src/slash/\${folder}\`).filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(\`../slash/\${folder}/\${file}\`);
        if (command.name) {
          client.slash.set(command.name, command);
          slash.push(command);
        } else {
          continue;
        }
      }
    }
    client.on("ready", async () => {
      await client.application.commands.set(slash);
    });
  }

  module.exports = loadSlashCommands;
  `;

  fs.writeFileSync(path.join(dir, "loadEvents.js"), loadEvents);
  fs.writeFileSync(path.join(dir, "loadSlashCommands.js"), loadSlashCommands);
}

export default function generateInteractionProject(
  name: string,
  dir: string,
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
  const slashPath = path.join(srcPath, "slash");
  const eventsPath = path.join(srcPath, "events");
  const pingCommandFolder = path.join(slashPath, "info");
  const clientEventFolder = path.join(eventsPath, "client");
  const coreEventFolder = path.join(eventsPath, "core");
  if (dir === "Inside") {
    fs.mkdirSync(projectPath);
  }
  fs.mkdirSync(srcPath);
  fs.mkdirSync(handlerPath);
  fs.mkdirSync(slashPath);
  fs.mkdirSync(eventsPath);
  fs.mkdirSync(pingCommandFolder);
  fs.mkdirSync(clientEventFolder);
  fs.mkdirSync(coreEventFolder);
  generateHedystiaFile(projectPath, name);
  generateConfigFile(srcPath, token);
  generateMainFile(srcPath);
  generatePackageJSON(projectPath, name);
  generateInteractionEvent(eventsPath);
  generatePingCommand(slashPath);
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
