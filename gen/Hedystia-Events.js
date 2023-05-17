const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const eventTemplates = {
  applicationCommandCreate: `
  module.exports = {
    event_name: "applicationCommandCreate",
    run: (client, interaction) => {},
  };
    `,
  applicationCommandDelete: `
  module.exports = {
    event_name: "applicationCommandDelete",
    run: (client, interaction) => {},
  };
    `,
  applicationCommandUpdate: `
  module.exports = {
    event_name: "applicationCommandUpdate",
    run: (client, interaction) => {},
  };
    `,
  guildMemberAvailable: `
  module.exports = {
    event_name: "guildMemberAvailable",
    run: (client, interaction) => {},
  };
    `,
  guildMembersChunk: `
  module.exports = {
    event_name: "guildMembersChunk",
    run: (client, interaction) => {},
  };
    `,
  interactionCreate: `
  module.exports = {
    event_name: "interactionCreate",
    run: (client, interaction) => {},
  };
    `,
  invalidRequestWarning: `
  module.exports = {
    event_name: "invalidRequestWarning",
    run: (client, interaction) => {},
  };
    `,
  channelCreate: `
  module.exports = {
    event_name: "channelCreate",
    run: (client, interaction) => {},
  };
    `,
  channelDelete: `
  module.exports = {
    event_name: "channelDelete",
    run: (client, interaction) => {},
  };
    `,
  channelPinsUpdate: `
  module.exports = {
    event_name: "channelPinsUpdate",
    run: (client, interaction) => {},
  };
    `,
  channelUpdate: `
  module.exports = {
    event_name: "channelUpdate",
    run: (client, interaction) => {},
  };
    `,
  debug: `
  module.exports = {
    event_name: "debug",
    run: (client, interaction) => {},
  };
    `,
  emojiCreate: `
  module.exports = {
    event_name: "emojiCreate",
    run: (client, interaction) => {},
  };
    `,
  emojiDelete: `
  module.exports = {
    event_name: "emojiDelete",
    run: (client, interaction) => {},
  };
    `,
  emojiUpdate: `
  module.exports = {
    event_name: "emojiUpdate",
    run: (client, interaction) => {},
  };
    `,
  error: `
  module.exports = {
    event_name: "error",
    run: (client, interaction) => {},
  };
    `,
  guildBanAdd: `
  module.exports = {
    event_name: "guildBanAdd",
    run: (client, interaction) => {},
  };
    `,
  guildBanRemove: `
  module.exports = {
    event_name: "guildBanRemove",
    run: (client, interaction) => {},
  };
    `,
  guildCreate: `
  module.exports = {
    event_name: "guildCreate",
    run: (client, interaction) => {},
  };
    `,
  guildDelete: `
  module.exports = {
    event_name: "guildDelete",
    run: (client, interaction) => {},
  };
    `,
  guildIntegrationsUpdate: `
  module.exports = {
    event_name: "guildIntegrationsUpdate",
    run: (client, interaction) => {},
  };
    `,
  guildMemberAdd: `
  module.exports = {
    event_name: "guildMemberAdd",
    run: (client, interaction) => {},
  };
    `,
  guildMemberRemove: `
  module.exports = {
    event_name: "guildMemberRemove",
    run: (client, interaction) => {},
  };
    `,
  guildMemberSpeaking: `
  module.exports = {
    event_name: "guildMemberSpeaking",
    run: (client, interaction) => {},
  };
    `,
  guildMemberUpdate: `
  module.exports = {
    event_name: "guildMemberUpdate",
    run: (client, interaction) => {},
  };
    `,
  guildUnavailable: `
  module.exports = {
    event_name: "guildUnavailable",
    run: (client, interaction) => {},
  };
    `,
  guildUpdate: `
  module.exports = {
    event_name: "guildUpdate",
    run: (client, interaction) => {},
  };
    `,
  invalidated: `
  module.exports = {
    event_name: "invalidated",
    run: (client, interaction) => {},
  };
    `,
  inviteCreate: `
  module.exports = {
    event_name: "inviteCreate",
    run: (client, interaction) => {},
  };
    `,
  inviteDelete: `
  module.exports = {
    event_name: "inviteDelete",
    run: (client, interaction) => {},
  };
    `,
  ready: `
  module.exports = {
    event_name: "ready",
    run: (client, interaction) => {},
  };
    `,
  messageCreate: `
  module.exports = {
    event_name: "messageCreate",
    run: (client, interaction) => {},
  };
    `,
  messageDelete: `
  module.exports = {
    event_name: "messageDelete",
    run: (client, interaction) => {},
  };
    `,
  messageDeleteBulk: `
  module.exports = {
    event_name: "messageDeleteBulk",
    run: (client, interaction) => {},
  };
    `,
  messageReactionAdd: `
  module.exports = {
    event_name: "messageReactionAdd",
    run: (client, interaction) => {},
  };
    `,
  messageReactionRemove: `
  module.exports = {
    event_name: "messageReactionRemove",
    run: (client, interaction) => {},
  };
    `,
  messageReactionRemoveAll: `
  module.exports = {
    event_name: "messageReactionRemoveAll",
    run: (client, interaction) => {},
  };
    `,
  messageReactionRemoveEmoji: `
  module.exports = {
    event_name: "messageReactionRemoveEmoji",
    run: (client, interaction) => {},
  };
    `,
  messageUpdate: `
  module.exports = {
    event_name: "messageUpdate",
    run: (client, interaction) => {},
  };
    `,
  presenceUpdate: `
  module.exports = {
    event_name: "presenceUpdate",
    run: (client, interaction) => {},
  };
    `,
  rateLimit: `
  module.exports = {
    event_name: "rateLimit",
    run: (client, interaction) => {},
  };
    `,
  roleCreate: `
  module.exports = {
    event_name: "roleCreate",
    run: (client, interaction) => {},
  };
    `,
  roleDelete: `
  module.exports = {
    event_name: "roleDelete",
    run: (client, interaction) => {},
  };
    `,
  roleUpdate: `
  module.exports = {
    event_name: "roleUpdate",
    run: (client, interaction) => {},
  };
    `,
  shardDisconnect: `
  module.exports = {
    event_name: "shardDisconnect",
    run: (client, interaction) => {},
  };
    `,
  shardError: `
  module.exports = {
    event_name: "shardError",
    run: (client, interaction) => {},
  };
    `,
  shardReady: `
  module.exports = {
    event_name: "shardReady",
    run: (client, interaction) => {},
  };
    `,
  shardReconnecting: `
  module.exports = {
    event_name: "shardReconnecting",
    run: (client, interaction) => {},
  };
    `,
  shardResume: `
  module.exports = {
    event_name: "shardResume",
    run: (client, interaction) => {},
  };
    `,
  stageInstanceCreate: `
  module.exports = {
    event_name: "stageInstanceCreate",
    run: (client, interaction) => {},
  };
    `,
  stageInstanceDelete: `
  module.exports = {
    event_name: "stageInstanceDelete",
    run: (client, interaction) => {},
  };
    `,
  stageInstanceUpdate: `
  module.exports = {
    event_name: "stageInstanceUpdate",
    run: (client, interaction) => {},
  };
    `,
  stickerCreate: `
  module.exports = {
    event_name: "stickerCreate",
    run: (client, interaction) => {},
  };
    `,
  stickerDelete: `
  module.exports = {
    event_name: "stickerDelete",
    run: (client, interaction) => {},
  };
    `,
  stickerUpdate: `
  module.exports = {
    event_name: "stickerUpdate",
    run: (client, interaction) => {},
  };
    `,
  threadCreate: `
  module.exports = {
    event_name: "threadCreate",
    run: (client, interaction) => {},
  };
    `,
  threadDelete: `
  module.exports = {
    event_name: "threadDelete",
    run: (client, interaction) => {},
  };
    `,
  threadListSync: `
  module.exports = {
    event_name: "threadListSync",
    run: (client, interaction) => {},
  };
    `,
  threadMembersUpdate: `
  module.exports = {
    event_name: "threadMembersUpdate",
    run: (client, interaction) => {},
  };
    `,
  threadMemberUpdate: `
  module.exports = {
    event_name: "threadMemberUpdate",
    run: (client, interaction) => {},
  };
    `,
  threadUpdate: `
  module.exports = {
    event_name: "threadUpdate",
    run: (client, interaction) => {},
  };
    `,
  typingStart: `
  module.exports = {
    event_name: "typingStart",
    run: (client, interaction) => {},
  };
    `,
  userUpdate: `
  module.exports = {
    event_name: "userUpdate",
    run: (client, interaction) => {},
  };
    `,
  voiceStateUpdate: `
  module.exports = {
    event_name: "voiceStateUpdate",
    run: (client, interaction) => {},
  };
    `,
  warn: `
  module.exports = {
    event_name: "warn",
    run: (client, interaction) => {},
  };
    `,
  webhookUpdate: `
  module.exports = {
    event_name: "webhookUpdate",
    run: (client, interaction) => {},
  };
    `,
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getEventName = (name) => `${capitalize(name)}Event.js`;

async function generateEvents(events) {
  console.log("Generating the selected events ...");
  const d = path.join(process.cwd(), "src");
  const di = path.join(d, "events");
  const dir = path.join(di, "other");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
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

module.exports = generateEvents;
