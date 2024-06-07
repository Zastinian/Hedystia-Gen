import fs from "fs";
import path from "path";

const eventTemplates: Record<string, string> = {
  applicationCommandPermissionsUpdate: `
    module.exports = {
      event_name: "applicationCommandPermissionsUpdate",
      run: (client, data) => {},
    };
  `,
  autoModerationActionExecution: `
    module.exports = {
      event_name: "autoModerationActionExecution",
      run: (client, autoModerationActionExecution) => {},
    };
  `,
  autoModerationRuleCreate: `
    module.exports = {
      event_name: "autoModerationRuleCreate",
      run: (client, autoModerationRule) => {},
    };
  `,
  autoModerationRuleDelete: `
    module.exports = {
      event_name: "autoModerationRuleDelete",
      run: (client, autoModerationRule) => {},
    };
  `,
  autoModerationRuleUpdate: `
    module.exports = {
      event_name: "autoModerationRuleUpdate",
      run: (client, oldAutoModerationRule, newAutoModerationRule) => {},
    };
  `,
  ready: `
    module.exports = {
      event_name: "ready",
      run: (client) => {},
    };
  `,
  entitlementCreate: `
    module.exports = {
      event_name: "entitlementCreate",
      run: (client, entitlement) => {},
    };
  `,
  entitlementDelete: `
    module.exports = {
      event_name: "entitlementDelete",
      run: (client, entitlement) => {},
    };
  `,
  entitlementUpdate: `
    module.exports = {
      event_name: "entitlementUpdate",
      run: (client, oldEntitlement, newEntitlement) => {},
    };
  `,
  guildAuditLogEntryCreate: `
    module.exports = {
      event_name: "guildAuditLogEntryCreate",
      run: (client, auditLogEntry, guild) => {},
    };
  `,
  guildAvailable: `
    module.exports = {
      event_name: "guildAvailable",
      run: (client, guild) => {},
    };
  `,
  guildCreate: `
    module.exports = {
      event_name: "guildCreate",
      run: (client, guild) => {},
    };
  `,
  guildDelete: `
    module.exports = {
      event_name: "guildDelete",
      run: (client, guild) => {},
    };
  `,
  guildUpdate: `
    module.exports = {
      event_name: "guildUpdate",
      run: (client, oldGuild, newGuild) => {},
    };
  `,
  guildUnavailable: `
    module.exports = {
      event_name: "guildUnavailable",
      run: (client, guild) => {},
    };
  `,
  guildMemberAdd: `
    module.exports = {
      event_name: "guildMemberAdd",
      run: (client, member) => {},
    };
  `,
  guildMemberRemove: `
    module.exports = {
      event_name: "guildMemberRemove",
      run: (client, member) => {},
    };
  `,
  guildMemberUpdate: `
    module.exports = {
      event_name: "guildMemberUpdate",
      run: (client, oldMember, newMember) => {},
    };
  `,
  guildMemberAvailable: `
    module.exports = {
      event_name: "guildMemberAvailable",
      run: (client, member) => {},
    };
  `,
  guildMembersChunk: `
    module.exports = {
      event_name: "guildMembersChunk",
      run: (client, members, guild, data) => {},
    };
  `,
  guildIntegrationsUpdate: `
    module.exports = {
      event_name: "guildIntegrationsUpdate",
      run: (client, guild) => {},
    };
  `,
  roleCreate: `
    module.exports = {
      event_name: "roleCreate",
      run: (client, role) => {},
    };
  `,
  roleDelete: `
    module.exports = {
      event_name: "roleDelete",
      run: (client, role) => {},
    };
  `,
  inviteCreate: `
    module.exports = {
      event_name: "inviteCreate",
      run: (client, invite) => {},
    };
  `,
  inviteDelete: `
    module.exports = {
      event_name: "inviteDelete",
      run: (client, invite) => {},
    };
  `,
  roleUpdate: `
    module.exports = {
      event_name: "roleUpdate",
      run: (client, oldRole, newRole) => {},
    };
  `,
  emojiCreate: `
    module.exports = {
      event_name: "emojiCreate",
      run: (client, emoji) => {},
    };
  `,
  emojiDelete: `
    module.exports = {
      event_name: "emojiDelete",
      run: (client, emoji) => {},
    };
  `,
  emojiUpdate: `
    module.exports = {
      event_name: "emojiUpdate",
      run: (client, oldEmoji, newEmoji) => {},
    };
  `,
  guildBanAdd: `
    module.exports = {
      event_name: "guildBanAdd",
      run: (client, ban) => {},
    };
  `,
  guildBanRemove: `
    module.exports = {
      event_name: "guildBanRemove",
      run: (client, ban) => {},
    };
  `,
  channelCreate: `
    module.exports = {
      event_name: "channelCreate",
      run: (client, channel) => {},
    };
  `,
  channelDelete: `
    module.exports = {
      event_name: "channelDelete",
      run: (client, channel) => {},
    };
  `,
  channelUpdate: `
    module.exports = {
      event_name: "channelUpdate",
      run: (client, oldChannel, newChannel) => {},
    };
  `,
  channelPinsUpdate: `
    module.exports = {
      event_name: "channelPinsUpdate",
      run: (client, channel, date) => {},
    };
  `,
  messageCreate: `
    module.exports = {
      event_name: "messageCreate",
      run: (client, message) => {},
    };
  `,
  messageDelete: `
    module.exports = {
      event_name: "messageDelete",
      run: (client, message) => {},
    };
  `,
  messageUpdate: `
    module.exports = {
      event_name: "messageUpdate",
      run: (client, oldMessage, newMessage) => {},
    };
  `,
  messageDeleteBulk: `
    module.exports = {
      event_name: "messageDeleteBulk",
      run: (client, messages, channel) => {},
    };
  `,
  messagePollVoteAdd: `
    module.exports = {
      event_name: "messagePollVoteAdd",
      run: (client, pollAnswer, userId) => {},
    };
  `,
  messagePollVoteRemove: `
    module.exports = {
      event_name: "messagePollVoteRemove",
      run: (client, pollAnswer, userId) => {},
    };
  `,
  messageReactionAdd: `
    module.exports = {
      event_name: "messageReactionAdd",
      run: (client, reaction, user) => {},
    };
  `,
  messageReactionRemove: `
    module.exports = {
      event_name: "messageReactionRemove",
      run: (client, reaction, user) => {},
    };
  `,
  messageReactionRemoveAll: `
    module.exports = {
      event_name: "messageReactionRemoveAll",
      run: (client, message, reactions) => {},
    };
  `,
  messageReactionRemoveEmoji: `
    module.exports = {
      event_name: "messageReactionRemoveEmoji",
      run: (client, reaction) => {},
    };
  `,
  threadCreate: `
    module.exports = {
      event_name: "threadCreate",
      run: (client, thread, newlyCreated) => {},
    };
  `,
  threadDelete: `
    module.exports = {
      event_name: "threadDelete",
      run: (client, thread) => {},
    };
  `,
  threadUpdate: `
    module.exports = {
      event_name: "threadUpdate",
      run: (client, oldThread, newThread) => {},
    };
  `,
  threadListSync: `
    module.exports = {
      event_name: "threadListSync",
      run: (client, threads, guild) => {},
    };
  `,
  threadMemberUpdate: `
    module.exports = {
      event_name: "threadMemberUpdate",
      run: (client, oldMember, newMember) => {},
    };
  `,
  threadMembersUpdate: `
    module.exports = {
      event_name: "threadMembersUpdate",
      run: (client, addedMembers, removedMembers, thread) => {},
    };
  `,
  userUpdate: `
    module.exports = {
      event_name: "userUpdate",
      run: (client, oldUser, newUser) => {},
    };
  `,
  presenceUpdate: `
    module.exports = {
      event_name: "presenceUpdate",
      run: (client, oldPresence, newPresence) => {},
    };
  `,
  voiceServerUpdate: `
    module.exports = {
      event_name: "voiceServerUpdate",
      run: (client, interaction) => {},
    };
  `,
  voiceStateUpdate: `
    module.exports = {
      event_name: "voiceStateUpdate",
      run: (client, oldState, newState) => {},
    };
  `,
  typingStart: `
    module.exports = {
      event_name: "typingStart",
      run: (client, typing) => {},
    };
  `,
  webhooksUpdate: `
    module.exports = {
      event_name: "webhooksUpdate",
      run: (client, channel) => {},
    };
  `,
  interactionCreate: `
    module.exports = {
      event_name: "interactionCreate",
      run: (client, interaction) => {},
    };
  `,
  error: `
    module.exports = {
      event_name: "error",
      run: (client, error) => {},
    };
  `,
  warn: `
    module.exports = {
      event_name: "warn",
      run: (client, message) => {},
    };
  `,
  debug: `
    module.exports = {
      event_name: "debug",
      run: (client, info) => {},
    };
  `,
  invalidRequestWarning: `
    module.exports = {
      event_name: "invalidRequestWarning",
      run: (client, invalidRequestWarningData) => {},
    };
  `,
  rateLimit: `
    module.exports = {
      event_name: "rateLimit",
      run: (client, rateLimitData) => {},
    };
  `,
  shardDisconnect: `
    module.exports = {
      event_name: "shardDisconnect",
      run: (client, closeEvent, shardId) => {},
    };
  `,
  shardError: `
    module.exports = {
      event_name: "shardError",
      run: (client, error, shardId) => {},
    };
  `,
  shardReady: `
    module.exports = {
      event_name: "shardReady",
      run: (client, shardId, unavailableGuilds) => {},
    };
  `,
  shardReconnecting: `
    module.exports = {
      event_name: "shardReconnecting",
      run: (client, shardId) => {},
    };
  `,
  shardResume: `
    module.exports = {
      event_name: "shardResume",
      run: (client, shardId, replayedEvents) => {},
    };
  `,
  stageInstanceCreate: `
    module.exports = {
      event_name: "stageInstanceCreate",
      run: (client, stageInstance) => {},
    };
  `,
  stageInstanceUpdate: `
    module.exports = {
      event_name: "stageInstanceUpdate",
      run: (client, oldStageInstance, newStageInstance) => {},
    };
  `,
  stageInstanceDelete: `
    module.exports = {
      event_name: "stageInstanceDelete",
      run: (client, stageInstance) => {},
    };
  `,
  stickerCreate: `
    module.exports = {
      event_name: "stickerCreate",
      run: (client, sticker) => {},
    };
  `,
  stickerDelete: `
    module.exports = {
      event_name: "stickerDelete",
      run: (client, sticker) => {},
    };
  `,
  stickerUpdate: `
    module.exports = {
      event_name: "stickerUpdate",
      run: (client, oldSticker, newSticker) => {},
    };
  `,
  guildScheduledEventCreate: `
    module.exports = {
      event_name: "guildScheduledEventCreate",
      run: (client, guildScheduledEvent) => {},
    };
  `,
  guildScheduledEventUpdate: `
    module.exports = {
      event_name: "guildScheduledEventUpdate",
      run: (client, oldGuildScheduledEvent, newGuildScheduledEvent) => {},
    };
  `,
  guildScheduledEventDelete: `
    module.exports = {
      event_name: "guildScheduledEventDelete",
      run: (client, guildScheduledEvent) => {},
    };
  `,
  guildScheduledEventUserAdd: `
    module.exports = {
      event_name: "guildScheduledEventUserAdd",
      run: (client, guildScheduledEvent, user) => {},
    };
  `,
  guildScheduledEventUserRemove: `
    module.exports = {
      event_name: "guildScheduledEventUserRemove",
      run: (client, guildScheduledEvent, user) => {},
    };
  `,
  webhookUpdate: `
    module.exports = {
      event_name: "webhookUpdate",
      run: (client, channel) => {},
    };
  `,
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getEventName = (name: string) => `${capitalize(name)}Event.js`;

export default async function generateEvents(events: string[]) {
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
        "\x1b[91mError you already have that event if you want another one of the same event rename the one you already have!\x1b[0m",
      );
    fs.writeFileSync(path.join(dir, fileName), template);
    console.log(`\x1b[36mSuccessfully generated ${event} event!\x1b[0m`);
  }
  return console.log("\x1b[97mThe selected events were successfully generated!\x1b[0m");
}

async function getTemplate(event: string) {
  return eventTemplates[event];
}
