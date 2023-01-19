#!/usr/bin/env node
const inquirer = require("inquirer")
const {generateProject, generateEvents} = require("./gen/Esmile-Message")

inquirer
  .prompt([
    {
      type: "list",
      message: "What do you want to do?",
      name: "command",
      choices: ["Create new project", "Generate command (Coming soon)", "Generate event"],
    },
    {
      type: "list",
      when: ({command}) => command === "Create new project",
      message: "Inside a folder or outside?",
      name: "selectDir",
      choices: ["Inside", "Outside"],
    },
    {
      type: "input",
      when: ({command}) => command === "Create new project",
      message: "What would you like to call your project?",
      name: "projectName",
      validate: (name) => name.length > 0,
      default: "project",
    },
    {
      type: "password",
      when: ({command}) => command === "Create new project",
      message: "Please enter your bot token:",
      name: "projectToken",
      validate: (name) => name.length > 0,
    },
    {
      type: "list",
      when: ({command}) => command === "Create new project",
      message: "Prefix or Slash?",
      name: "prefixorslash",
      choices: ["Prefix", "Slash (Coming soon)"],
    },
    {
      type: "input",
      when: ({prefixorslash}) => prefixorslash === "Prefix",
      message: "What prefix would you like to add to the project?",
      name: "prefix",
      validate: (name) => name.length > 0,
      default: "!",
    },
    {
      type: "checkbox",
      when: ({command}) => command === "Generate event",
      name: "events",
      message: "What event(s) would you like to generate?",
      choices: [
        {value: "applicationCommandCreate"},
        {value: "applicationCommandDelete"},
        {value: "applicationCommandUpdate"},
        {value: "channelCreate"},
        {value: "channelDelete"},
        {value: "channelPinsUpdate"},
        {value: "channelUpdate"},
        {value: "debug"},
        {value: "emojiCreate"},
        {value: "emojiDelete"},
        {value: "emojiUpdate"},
        {value: "error"},
        {value: "guildBanAdd"},
        {value: "guildBanRemove"},
        {value: "guildCreate"},
        {value: "guildDelete"},
        {value: "guildIntegrationsUpdate"},
        {value: "guildMemberAdd"},
        {value: "guildMemberAvailable"},
        {value: "guildMemberRemove"},
        {value: "guildMembersChunk"},
        {value: "guildMemberUpdate"},
        {value: "guildUnavailable"},
        {value: "guildUpdate"},
        {value: "interactionCreate"},
        {value: "invalidated"},
        {value: "invalidRequestWarning"},
        {value: "inviteCreate"},
        {value: "inviteDelete"},
        {value: "messageCreate"},
        {value: "messageDelete"},
        {value: "messageDeleteBulk"},
        {value: "messageReactionAdd"},
        {value: "messageReactionRemove"},
        {value: "messageReactionRemoveAll"},
        {value: "messageReactionRemoveEmoji"},
        {value: "messageUpdate"},
        {value: "presenceUpdate"},
        {value: "rateLimit"},
        {value: "ready"},
        {value: "roleCreate"},
        {value: "roleDelete"},
        {value: "roleUpdate"},
        {value: "shardDisconnect"},
        {value: "shardError"},
        {value: "shardReady"},
        {value: "shardReconnecting"},
        {value: "shardResume"},
        {value: "stageInstanceCreate"},
        {value: "stageInstanceDelete"},
        {value: "stageInstanceUpdate"},
        {value: "stickerCreate"},
        {value: "stickerDelete"},
        {value: "stickerUpdate"},
        {value: "threadCreate"},
        {value: "threadDelete"},
        {value: "threadListSync"},
        {value: "threadMembersUpdate"},
        {value: "threadMemberUpdate"},
        {value: "threadUpdate"},
        {value: "typingStart"},
        {value: "userUpdate"},
        {value: "voiceStateUpdate"},
        {value: "warn"},
        {value: "webhookUpdate"},
      ],
    },
  ])
  .then((data) => {
    if (data.command === "Create new project") {
      if (data.prefixorslash === "Prefix") {
        const name = data.projectName.toLowerCase().replace(/\s+/g, "-")
        const dir = data.selectDir
        const prefix = data.prefix
        const token = data.projectToken
        generateProject(name, dir, prefix, token)
      }
    }
    if (data.command === "Generate event") {
      const events = data.events
      generateEvents(events)
    }
  })
