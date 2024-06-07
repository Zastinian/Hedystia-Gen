#!/usr/bin/env node
import { prompt } from "inquirer";
import generateEvents from "./gen/Hedystia-Events";
import generateMessageProject from "./gen/Hedystia-Message";
import generateInteractionProject from "./gen/Hedystia-Slash";

prompt([
  {
    type: "list",
    message: "What do you want to do?",
    name: "command",
    choices: ["Create new project", "Generate command (Coming soon)", "Generate event"],
  },
  {
    type: "list",
    when: ({ command }) => command === "Create new project",
    message: "Inside a folder or outside?",
    name: "selectDir",
    choices: ["Inside", "Outside"],
  },
  {
    type: "input",
    when: ({ command }) => command === "Create new project",
    message: "What would you like to call your project?",
    name: "projectName",
    validate: (name) => name.length > 0,
    default: "project",
  },
  {
    type: "password",
    when: ({ command }) => command === "Create new project",
    message: "Please enter your bot token:",
    name: "projectToken",
    validate: (name) => name.length > 0,
  },
  {
    type: "list",
    when: ({ command }) => command === "Create new project",
    message: "Prefix or Slash?",
    name: "prefixorslash",
    choices: ["Prefix", "Slash"],
  },
  {
    type: "input",
    when: ({ prefixorslash }) => prefixorslash === "Prefix",
    message: "What prefix would you like to add to the project?",
    name: "prefix",
    validate: (name) => name.length > 0,
    default: "!",
  },
  {
    type: "list",
    when: ({ command }) => command === "Create new project",
    message: "Do you want to install the dependencies?",
    name: "install",
    choices: ["Yes", "No"],
    default: "Yes",
  },
  {
    type: "list",
    when: ({ install }) => install === "Yes",
    message: "What package manager would you like to use?",
    name: "packageManager",
    choices: ["npm", "pnpm", "yarn", "bun"],
    default: "npm",
  },
  {
    type: "checkbox",
    when: ({ command }) => command === "Generate event",
    name: "events",
    message: "What event(s) would you like to generate?",
    choices: [
      { value: "applicationCommandPermissionsUpdate" },
      { value: "autoModerationActionExecution" },
      { value: "autoModerationRuleCreate" },
      { value: "autoModerationRuleDelete" },
      { value: "autoModerationRuleUpdate" },
      { value: "ready" },
      { value: "entitlementCreate" },
      { value: "entitlementDelete" },
      { value: "entitlementUpdate" },
      { value: "guildAuditLogEntryCreate" },
      { value: "guildAvailable" },
      { value: "guildCreate" },
      { value: "guildDelete" },
      { value: "guildUpdate" },
      { value: "guildUnavailable" },
      { value: "guildMemberAdd" },
      { value: "guildMemberRemove" },
      { value: "guildMemberUpdate" },
      { value: "guildMemberAvailable" },
      { value: "guildMembersChunk" },
      { value: "guildIntegrationsUpdate" },
      { value: "roleCreate" },
      { value: "roleDelete" },
      { value: "inviteCreate" },
      { value: "inviteDelete" },
      { value: "roleUpdate" },
      { value: "emojiCreate" },
      { value: "emojiDelete" },
      { value: "emojiUpdate" },
      { value: "guildBanAdd" },
      { value: "guildBanRemove" },
      { value: "channelCreate" },
      { value: "channelDelete" },
      { value: "channelUpdate" },
      { value: "channelPinsUpdate" },
      { value: "messageCreate" },
      { value: "messageDelete" },
      { value: "messageUpdate" },
      { value: "messageDeleteBulk" },
      { value: "messagePollVoteAdd" },
      { value: "messagePollVoteRemove" },
      { value: "messageReactionAdd" },
      { value: "messageReactionRemove" },
      { value: "messageReactionRemoveAll" },
      { value: "messageReactionRemoveEmoji" },
      { value: "threadCreate" },
      { value: "threadDelete" },
      { value: "threadUpdate" },
      { value: "threadListSync" },
      { value: "threadMemberUpdate" },
      { value: "threadMembersUpdate" },
      { value: "userUpdate" },
      { value: "presenceUpdate" },
      { value: "voiceServerUpdate" },
      { value: "voiceStateUpdate" },
      { value: "typingStart" },
      { value: "webhooksUpdate" },
      { value: "interactionCreate" },
      { value: "error" },
      { value: "warn" },
      { value: "debug" },
      { value: "cacheSweep" },
      { value: "shardDisconnect" },
      { value: "shardError" },
      { value: "shardReconnecting" },
      { value: "shardReady" },
      { value: "shardResume" },
      { value: "invalidated" },
      { value: "raw" },
      { value: "stageInstanceCreate" },
      { value: "stageInstanceUpdate" },
      { value: "stageInstanceDelete" },
      { value: "stickerCreate" },
      { value: "stickerDelete" },
      { value: "stickerUpdate" },
      { value: "guildScheduledEventCreate" },
      { value: "guildScheduledEventUpdate" },
      { value: "guildScheduledEventDelete" },
      { value: "guildScheduledEventUserAdd" },
      { value: "guildScheduledEventUserRemove" },
    ],
  },
]).then((data) => {
  if (data.command === "Create new project") {
    const name = data.projectName.toLowerCase().replace(/\s+/g, "-");
    const dir = data.selectDir;
    const token = data.projectToken;
    const install = data.install;
    const packageManager = data.packageManager;
    switch (data.prefixorslash) {
      case "Prefix":
        generateMessageProject(name, dir, data.prefix, token, install, packageManager);
        break;
      case "Slash":
        generateInteractionProject(name, dir, token, install, packageManager);
        break;
    }
  }
  if (data.command === "Generate event") {
    const events = data.events;
    generateEvents(events);
  }
});
