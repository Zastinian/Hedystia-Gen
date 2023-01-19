const eventTemplates = {
  applicationCommandCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ApplicationCommandCreateEvent extends BaseEvent {
    constructor() {
      super('applicationCommandCreate');
    }

    async run(client, command) {

    }
  }
    `,
  applicationCommandDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ApplicationCommandDeleteEvent extends BaseEvent {
    constructor() {
      super('applicationCommandDelete');
    }

    async run(client, command) {

    }
  }
    `,
  applicationCommandUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ApplicationCommandUpdateEvent extends BaseEvent {
    constructor() {
      super('applicationCommandUpdate');
    }

    async run(client, oldCommand, newCommand) {

    }
  }
    `,
  guildMemberAvailable: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildMemberAvailableEvent extends BaseEvent {
    constructor() {
      super('guildMemberAvailable');
    }

    async run(client, member) {

    }
  }
    `,
  guildMembersChunk: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildMemberChunksEvent extends BaseEvent {
    constructor() {
      super('guildMembersChunk');
    }
    
    async run(client, members, guild, chunk) {

    }
  }
    `,
  interactionCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class InteractionCreateEvent extends BaseEvent {
    constructor() {
      super('interactionCreate');
    }

    async run(client, interaction) {

    }
  }
    `,
  invalidRequestWarning: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class InvalidRequestWarningEvent extends BaseEvent {
    constructor() {
      super('invalidRequestWarning');
    }

    async run(client, invalidRequestWarningData) {
      
    }
  }
    `,
  channelCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ChannelCreateEvent extends BaseEvent {
    constructor() {
      super('channelCreate');
    }
    
    async run(client, channel) {

    }
  }`,
  channelDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ChannelDeleteEvent extends BaseEvent {
    constructor() {
      super('channelDelete');
    }
    
    async run(client, channel) {

    }
  }
  `,
  channelPinsUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ChannelPinsUpdateEvent extends BaseEvent {
    constructor() {
      super('channelPinsUpdate');
    }
    
    async run(client, channel, time) {

    }
  }`,
  channelUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ChannelUpdateEvent extends BaseEvent {
    constructor() {
      super('channelUpdate');
    }
    
    async run(client, oldChannel, newChannel) {

    }
  }`,
  debug: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ChannelPinsUpdateEvent extends BaseEvent {
    constructor() {
      super('channelPinsUpdate');
    }
    
    async run(client, info) {

    }
  }`,
  emojiCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class EmojiCreateEvent extends BaseEvent {
    constructor() {
      super('emojiCreate');
    }
    
    async run(client, emoji) {

    }
  }
  `,
  emojiDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class EmojiDeleteEvent extends BaseEvent {
    constructor() {
      super('emojiDelete');
    }
    
    async run(client, emoji) {

    }
  }`,
  emojiUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class EmojiUpdateEvent extends BaseEvent {
    constructor() {
      super('emojiUpdate');
    }
    
    async run(client, oldEmoji, newEmoji) {

    }
  }`,
  error: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ErrorEvent extends BaseEvent {
    constructor() {
      super('error');
    }
    
    async run(client, error) {

    }
  }
  `,
  guildBanAdd: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildBanAddEvent extends BaseEvent {
    constructor() {
      super('guildBanAdd');
    }
    
    async run(client, guildBan) {

    }
  }`,
  guildBanRemove: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildBanRemoveEvent extends BaseEvent {
    constructor() {
      super('guildBanRemove');
    }
    
    async run(client, guildBan) {

    }
  }`,
  guildCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildCreateEvent extends BaseEvent {
    constructor() {
      super('guildCreate');
    }
    
    async run(client, guild) {

    }
  }`,
  guildDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildDeleteEvent extends BaseEvent {
    constructor() {
      super('guildDelete');
    }
    
    async run(client, guild) {

    }
  }`,
  guildIntegrationsUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildIntegrationsUpdateEvent extends BaseEvent {
    constructor() {
      super('guildIntegrationsUpdate');
    }
    
    async run(client, guild) {

    }
  }`,
  guildMemberAdd: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildMemberAddEvent extends BaseEvent {
    constructor() {
      super('guildMemberAdd');
    }
    
    async run(client, member) {

    }
  }`,
  guildMemberRemove: `
    const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildMemberRemoveEvent extends BaseEvent {
    constructor() {
      super('guildMemberRemove');
    }
    
    async run(client, member) {

    }
  }`,
  guildMemberSpeaking: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildMemberSpeakingEvent extends BaseEvent {
    constructor() {
      super('guildMemberSpeaking');
    }
    
    async run(client, member, speaking) {

    }
  }`,
  guildMemberUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildMemberUpdateEvent extends BaseEvent {
    constructor() {
      super('guildMemberUpdate');
    }
    
    async run(client, oldMember, newMember) {
      
    }
  }`,
  guildUnavailable: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildUnavailableEvent extends BaseEvent {
    constructor() {
      super('guildUnavailable');
    }
    
    async run(client, guild) {

    }
  }`,
  guildUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class GuildUpdateEvent extends BaseEvent {
    constructor() {
      super('guildUpdate');
    }
    
    async run(client, oldGuild, newGuild) {

    }
  }`,
  invalidated: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class InvalidatedEvent extends BaseEvent {
    constructor() {
      super('invalidated');
    }
    
    async run(client) {
      
    }
  }`,
  inviteCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class EmojiDeleteEvent extends BaseEvent {
    constructor() {
      super('inviteCreate');
    }
    
    async run(client, invite) {
      
    }
  }`,
  inviteDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class InviteDeleteEvent extends BaseEvent {
    constructor() {
      super('inviteDelete');
    }
    
    async run(client, invite) {
      
    }
  }`,
  ready: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
      super('ready');
    }
    
    async run(client) {

    }
  }`,
  messageCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class MessageEvent extends BaseEvent {
    constructor() {
      super('messageCreate');
    }
    
    async run(client, message) {
        
    }
  }`,
  messageDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class MessageDeleteEvent extends BaseEvent {
    constructor() {
      super('messageDelete');
    }
    
    async run(client, message) {
      
    }
  }`,
  messageDeleteBulk: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class MessageDeleteBulkEvent extends BaseEvent {
    constructor() {
      super('messageDeleteBulk');
    }
    
    async run(client, messages) {
      
    }
  }`,
  messageReactionAdd: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class MessageReactionAddEvent extends BaseEvent {
    constructor() {
      super('messageReactionAdd');
    }
    
    async run(client, reaction, user) {
      
    }
  }`,
  messageReactionRemove: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class MessageReactionRemoveEvent extends BaseEvent {
    constructor() {
      super('messageReactionRemove');
    }
    
    async run(client, reaction, user) {
      
    }
  }`,
  messageReactionRemoveAll: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class MessageReactionRemoveAllEvent extends BaseEvent {
    constructor() {
      super('ready');
    }
    
    async run(client, message) {
      
    }
  }`,
  messageReactionRemoveEmoji: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class MessageReactionRemoveEmojiEvent extends BaseEvent {
    constructor() {
      super('messageReactionRemoveEmoji');
    }
    
    async run(client, reaction) {
      
    }
  }`,
  messageUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class MessageUpdateEvent extends BaseEvent {
    constructor() {
      super('messageUpdate');
    }
    
    async run(client, oldMessage, newMessage) {
      
    }
  }`,
  presenceUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class PresenceUpdateEvent extends BaseEvent {
    constructor() {
      super('presenceUpdate');
    }
    
    async run(client, oldPresence, newPresence) {
      
    }
  }`,
  rateLimit: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class RateLimitEvent extends BaseEvent {
    constructor() {
      super('rateLimit');
    }
    
    async run(client, rateLimitInfo) {
      
    }
  }`,
  roleCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class RoleCreateEvent extends BaseEvent {
    constructor() {
      super('roleCreate');
    }
    
    async run(client, role) {
      
    }
  }`,
  roleDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class RoleDeleteEvent extends BaseEvent {
    constructor() {
      super('roleDelete');
    }
    
    async run(client, role) {
      
    }
  }`,
  roleUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class RoleUpdateEvent extends BaseEvent {
    constructor() {
      super('roleUpdate');
    }
    
    async run(client, oldRole, newRole) {
      
    }
  }`,
  shardDisconnect: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ShardDisconnectEvent extends BaseEvent {
    constructor() {
      super('shardDisconnect');
    }
    
    async run(client, event, id) {
      
    }
  }`,
  shardError: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ShardErrorEvent extends BaseEvent {
    constructor() {
      super('shardError');
    }
    
    async run(client, error, shardId) {
      
    }
  }`,
  shardReady: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class EmojiDeleteEvent extends BaseEvent {
    constructor() {
      super('shardReady');
    }
    
    async run(client, id, unavailableGuilds) {
      
    }
  }`,
  shardReconnecting: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ShardReconnectingEvent extends BaseEvent {
    constructor() {
      super('shardReconnecting');
    }
    
    async run(client, id) {
      
    }
  }`,
  shardResume: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ShardResumeEvent extends BaseEvent {
    constructor() {
      super('shardResume');
    }
    
    async run(client, id, replayedEvents) {
      
    }
  }`,
  stageInstanceCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class StageInstanceCreateEvent extends BaseEvent {
    constructor() {
      super('stageInstanceCreate');
    }

    async run(client, stageInstance) {

    }
  }`,
  stageInstanceDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class StageInstanceDeleteEvent extends BaseEvent {
    constructor() {
      super('stageInstanceDelete');
    }

    async run(client, stageInstance) {

    }
  }
    `,
  stageInstanceUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class StageInstanceUpdateEvent extends BaseEvent {
    constructor() {
      super('stageInstanceUpdate');
    }

    async run(client, oldStageInstance, newStageInstance) {

    }
  }`,
  stickerCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class StickerCreateEvent extends BaseEvent {
    constructor() {
      super('stickerCreate');
    }

    async run(client, sticker) {
    }
  }`,
  stickerDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class StickerDeleteEvent extends BaseEvent {
    constructor() {
      super('stickerDelete');
    }

    async run(client, sticker) {
    }
  }`,
  stickerUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class StickerUpdateEvent extends BaseEvent {
    constructor() {
      super('stickerUpdate');
    }

    async run(client, oldSticker, newSticker) {

    }
  }`,
  threadCreate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ThreadCreateEvent extends BaseEvent {
    constructor() {
      super('threadCreate');
    }

    async run(client, thread) {

    }
  }`,
  threadDelete: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ThreadDeleteEvent extends BaseEvent {
    constructor() {
      super('threadDelete');
    }

    async run(client, thread) {

    }
  }`,
  threadListSync: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ThreadListSyncEvent extends BaseEvent {
    constructor() {
      super('threadListSync');
    }

    async run(client, threads) {
    }
  }`,
  threadMembersUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ThreadMembersUpdateEvent extends BaseEvent {
    constructor() {
      super('threadMembersUpdate');
    }

    async run(client, oldMembers, newMembers) {

    }
  }`,
  threadMemberUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ThreadMemberUpdateEvent extends BaseEvent {
    constructor() {
      super('threadMemberUpdate');
    }

    async run(client, oldMember, newMember) {

    }
  }`,
  threadUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class ThreadUpdateEvent extends BaseEvent {
    constructor() {
      super('threadUpdate');
    }
    
    async run(client, oldMembers, newMembers) {

    }
  }`,
  typingStart: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class TypingStartEvent extends BaseEvent {
    constructor() {
      super('typingStart');
    }
    
    async run(client, typing) {
      
    }
  }`,
  userUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class UserUpdateEvent extends BaseEvent {
    constructor() {
      super('userUpdate');
    }
    
    async run(client, oldUser, newUser) {
      
    }
  }`,
  voiceStateUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class WoiceStateUpdateEvent extends BaseEvent {
    constructor() {
      super('voiceStateUpdate');
    }
    
    async run(client, oldState, newState) {
      
    }
  }`,
  warn: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class WarnEvent extends BaseEvent {
    constructor() {
      super('warn');
    }
    
    async run(client, info) {
      
    }
  }`,
  webhookUpdate: `
  const BaseEvent = require('../utils/structures/BaseEvent');
  module.exports = class WebhookUpdateEvent extends BaseEvent {
    constructor() {
      super('webhookUpdate');
    }
    
    async run(client, channel) {
      
    }
  }`,
}

module.exports = eventTemplates
