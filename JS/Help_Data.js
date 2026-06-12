// Generated from C:/Users/tobio/PycharmProjects/Ordo/Utils/Help_Docs.py.
// Re-run Scripts/Generate_Help_Data.py when Ordo help categories change.
window.ORDO_HELP_DATA = Object.freeze({
  "source": "C:/Users/tobio/PycharmProjects/Ordo/Utils/Help_Docs.py",
  "excludedCategoryKeys": [
    "beta",
    "dev",
    "server-specific",
    "support"
  ],
  "categories": [
    {
      "key": "getting-started",
      "label": "Getting Started",
      "emojiKey": "getting_started",
      "roots": [
        "help"
      ],
      "overview": "Start here when you are setting up Ordo or trying to orient a new user. This page points people toward the help browser, the server settings dashboard, and the main setup areas that make the rest of the bot work correctly.",
      "featureNotes": [
        "Use `/help` to browse feature docs or jump directly to a command explanation.",
        "Use `/settings` early in a new server to configure logging, welcome behavior, moderation features, mute setup, suggestions, and other server defaults.",
        "After setup, use the category selector to move into the specific feature area you are trying to configure or explain."
      ],
      "commands": [
        {
          "path": "help",
          "summary": "Open this interactive help browser.",
          "details": "Browse Ordo by feature category or jump straight to a command. The help pages are private by default so you can explore without filling the channel.",
          "usage": "/help category:Messaging & Embeds",
          "notes": []
        },
        {
          "path": "settings",
          "summary": "Open the server setup and settings dashboard.",
          "details": "Use this when adding Ordo to a server or revisiting configuration. Settings is where staff configure logging destinations, welcome behavior, moderation features, mute setup, invite blocker behavior, and other feature defaults.",
          "usage": "/settings",
          "notes": []
        },
        {
          "path": "user profile settings",
          "summary": "Open your personal profile setup.",
          "details": "Use this to set your timezone, languages, profile text, banner, and profile privacy/reset options. This is useful in servers and in user-installed contexts because several personal tools reuse your profile settings.",
          "usage": "/user profile settings",
          "notes": []
        }
      ]
    },
    {
      "key": "utilities",
      "label": "Utilities & Info",
      "emojiKey": "info",
      "roots": [
        "get",
        "invites",
        "status",
        "timestamp",
        "reminders"
      ],
      "overview": "Utility commands answer quick questions, produce Discord-friendly timestamps, manage personal reminders, and help staff copy IDs or command mentions without digging through developer mode.",
      "featureNotes": [
        "The `/get` group is for lightweight lookup helpers such as server, role, channel, user, invite, and command-tag tools.",
        "`/timestamp` formats a time as Discord timestamp markup so every reader sees it in their own local timezone.",
        "`/reminders` handles personal reminders, and staff can manage server reminders when they have the right permissions."
      ],
      "commands": [
        {
          "path": "status",
          "summary": "Show current Ordo status information.",
          "details": "Checks the bot's public status surface, including runtime-style details that are useful when users ask whether Ordo is online and responding.",
          "usage": "/status",
          "notes": []
        },
        {
          "path": "timestamp",
          "summary": "Create copyable Discord timestamp tags.",
          "details": "Choose a date, time, and display style. Ordo uses your profile timezone first, then the server/default timezone, so the produced tag renders correctly for everyone.",
          "usage": "/timestamp",
          "notes": []
        },
        {
          "path": "reminders",
          "summary": "Create and manage reminders.",
          "details": "Open the reminder flow for one-time or repeating reminders. Reminders can be personal, and server reminder controls appear for users with the needed management permission.",
          "usage": "/reminders",
          "notes": []
        },
        {
          "path": "get command-tag",
          "summary": "Get a clickable slash-command mention.",
          "details": "Search command paths with autocomplete and receive the clickable Discord command tag, useful when explaining where a user should go next.",
          "usage": "/get command-tag command_path:settings",
          "notes": []
        },
        {
          "path": "get new-users",
          "summary": "Show members who joined recently.",
          "details": "Lists users who joined the server during the last week, sorted newest first. This is useful for quick staff review without opening Discord's member list filters.",
          "usage": "/get new-users",
          "notes": []
        },
        {
          "path": "get message-id",
          "summary": "Copy the message ID from a Discord message link.",
          "details": "Parses a Discord message URL and returns only the message ID. It does not fetch the message, so it is safe for quick ID extraction.",
          "usage": "/get message-id message_link:<link>",
          "notes": []
        },
        {
          "path": "get user info",
          "summary": "Post detailed user information.",
          "details": "Shows server and Discord account details for a selected user, including join date, account creation date, badges, timezone information when available, and role details.",
          "usage": "/get user info user:@member",
          "notes": []
        },
        {
          "path": "get user id",
          "summary": "Copy a user's Discord ID.",
          "details": "Returns the selected user's raw Discord ID for staff tools, logs, configuration, or support notes.",
          "usage": "/get user id user:@member",
          "notes": []
        },
        {
          "path": "get server info",
          "summary": "Post server information.",
          "details": "Shows server-level details such as owner, creation date, member counts, role counts, channel counts, and public/private channel totals.",
          "usage": "/get server info",
          "notes": []
        },
        {
          "path": "get server icon",
          "summary": "Post the server icon.",
          "details": "Displays the current server icon at full size when the server has one set.",
          "usage": "/get server icon",
          "notes": []
        },
        {
          "path": "get server banner",
          "summary": "Post the server banner.",
          "details": "Displays the current server banner when the server has one set.",
          "usage": "/get server banner",
          "notes": []
        },
        {
          "path": "get server id",
          "summary": "Copy this server's Discord ID.",
          "details": "Returns the current server's raw Discord ID.",
          "usage": "/get server id",
          "notes": []
        },
        {
          "path": "get role info",
          "summary": "Post role information.",
          "details": "Shows details about a role, including ID, color, member count, creation date, position, mentionable state, and whether Discord or an integration manages it.",
          "usage": "/get role info role:@role",
          "notes": []
        },
        {
          "path": "get role id",
          "summary": "Copy a role ID.",
          "details": "Returns the selected role's raw Discord ID.",
          "usage": "/get role id role:@role",
          "notes": []
        },
        {
          "path": "get channel info",
          "summary": "Post channel information.",
          "details": "Shows details about a server channel, including ID, type, creation date, position, and whether it appears public, private, or age restricted.",
          "usage": "/get channel info target:#channel",
          "notes": []
        },
        {
          "path": "get channel id",
          "summary": "Copy a channel ID.",
          "details": "Returns the selected channel's raw Discord ID.",
          "usage": "/get channel id target:#channel",
          "notes": []
        },
        {
          "path": "invites leaderboard",
          "summary": "Show top inviters for a timeframe.",
          "details": "Summarizes invite tracking data for the server, including current joins, total joins, and leaves for the selected timeframe.",
          "usage": "/invites leaderboard top:10 timeframe:30d",
          "notes": []
        },
        {
          "path": "invites history",
          "summary": "Show invite stats for a user over time.",
          "details": "Looks up invite tracking history for a member so staff can review invite joins and leaves tied to that user.",
          "usage": "/invites history user:@member timeframe:30d",
          "notes": []
        }
      ]
    },
    {
      "key": "settings",
      "label": "Settings",
      "emojiKey": "settings",
      "roots": [
        "settings"
      ],
      "overview": "Settings is the server control center for Ordo. It organizes server-wide configuration into sections such as general behavior, logging, welcome messages, moderation, mute setup, and feature toggles.",
      "featureNotes": [
        "Settings changes are meant for server staff and generally require management permissions.",
        "Disabled parent features keep their detailed setup tucked away so old configuration does not look active when it is not.",
        "Logging-related sections decide where Ordo posts server events, moderation actions, command audit output, and other operational notices."
      ],
      "commands": [
        {
          "path": "settings",
          "summary": "Open the server settings dashboard.",
          "details": "Use this to configure Ordo for the current server. The dashboard is organized into feature sections and uses buttons/selects for the settings that need structured input.",
          "usage": "/settings",
          "notes": []
        }
      ]
    },
    {
      "key": "notifications",
      "label": "Notifications",
      "emojiKey": "role_update",
      "roots": [
        "notification"
      ],
      "overview": "Notification tools let staff configure automated posts when server events happen. Role notifications are the first notification type and post when a configured role is added to a member.",
      "featureNotes": [
        "`/notification roles` opens a private management panel for creating, testing, pausing, editing, and deleting role notification setups.",
        "Each setup watches one role and posts to one channel when that role is added.",
        "Role notification messages support the same member/server variables as welcome messages, plus role variables such as `{role_mention}`, `{role_name}`, and `{role_id}`."
      ],
      "commands": [
        {
          "path": "notification roles",
          "summary": "Manage role award notifications.",
          "details": "Open the role notification manager. Staff can create normal text or embed notifications, test a saved setup, pause or resume it, and remove setups that are no longer needed.",
          "usage": "/notification roles",
          "notes": [
            "Requires Manage Server by default.",
            "Role notifications currently trigger when the configured role is added to a member."
          ]
        }
      ]
    },
    {
      "key": "messaging-embeds",
      "label": "Messaging & Embeds",
      "emojiKey": "message",
      "roots": [
        "say",
        "template_message",
        "embed"
      ],
      "overview": "Messaging tools let staff post controlled bot messages, create reusable templates, and build rich embed layouts without manually writing raw Discord embed JSON.",
      "featureNotes": [
        "`/say` is the simple path when you only need Ordo to post normal text.",
        "`/template_message` is for saved reusable server messages with webhook-based sending for customization.",
        "`/embed builder` opens the visual editor. The JSON subcommands are for importing, validating, saving, exporting, and posting Ordo embed-builder files.",
        "To convert an existing Discord embed into Ordo's builder format, right-click or long-press the message, open Apps, and choose Import Embed to Builder."
      ],
      "commands": [
        {
          "path": "say",
          "summary": "Have Ordo post a normal message.",
          "details": "Use this when a staff member wants Ordo to post a message without building an embed or saving a template.",
          "usage": "/say",
          "notes": []
        },
        {
          "path": "embed builder",
          "summary": "Open the visual embed builder.",
          "details": "Build embed-style messages through Ordo's editor instead of hand-writing JSON. You can edit sections, preview the result, attach content, and then post or save the finished layout through the builder actions. For migration work, use the Import Embed to Builder message context menu on an existing embedded message to open it in Ordo's editor and convert it into a format Ordo can save or export.",
          "usage": "/embed builder",
          "notes": [
            "Requires message/channel management permissions.",
            "Context menu import is useful when switching old announcement, rules, or information embeds over to Ordo-managed embeds.",
            "When prompted, copy external assets into Ordo if you want the converted embed to keep working even if the original attachment source changes."
          ]
        },
        {
          "path": "embed json import",
          "summary": "Load an embed-builder JSON file into the editor.",
          "details": "Import a saved Ordo embed-builder file, validate it, and continue editing it visually before posting or saving. This is for JSON files you already have; to convert an embed that already exists in Discord, use the Import Embed to Builder message context menu from Apps on that message.",
          "usage": "/embed json import file:<json>",
          "notes": []
        },
        {
          "path": "embed json save",
          "summary": "Save an embed-builder JSON file to this server.",
          "details": "Validates an uploaded Ordo embed-builder JSON file and stores it as a named saved embed that staff can reuse later.",
          "usage": "/embed json save file:<json> embed_name:rules",
          "notes": []
        },
        {
          "path": "embed json validate",
          "summary": "Check whether a JSON file is valid for Ordo's embed builder.",
          "details": "Use this before saving or posting a file from outside the editor. Ordo checks the expected format and reports the number of embeds, fields, content, attachment, and enabled sections.",
          "usage": "/embed json validate file:<json>",
          "notes": []
        },
        {
          "path": "embed json blank",
          "summary": "Download a blank embed-builder JSON template.",
          "details": "Generates a starter JSON file in one of the supported embed-builder shapes so you can edit it externally or keep a reusable template.",
          "usage": "/embed json blank style:Single embed",
          "notes": []
        },
        {
          "path": "embed json post",
          "summary": "Validate and post an embed-builder JSON file.",
          "details": "Posts a valid Ordo embed-builder file directly to a target channel or forum thread without adding it to saved embeds first.",
          "usage": "/embed json post file:<json> target:#channel",
          "notes": []
        },
        {
          "path": "template_message post",
          "summary": "Post a saved template message.",
          "details": "Posts a server template message through Ordo so staff can reuse prepared message content without rebuilding it each time.",
          "usage": "/template_message post",
          "notes": []
        },
        {
          "path": "template_message edit",
          "summary": "Edit an existing template message.",
          "details": "Updates a saved template message or its live posted version, depending on the selected template flow.",
          "usage": "/template_message edit",
          "notes": []
        },
        {
          "path": "template_message create template",
          "summary": "Create a reusable message template.",
          "details": "Saves a new server message template that staff can post later through the template message tools.",
          "usage": "/template_message create template",
          "notes": []
        },
        {
          "path": "template_message create webhook",
          "summary": "Create a webhook for template messages.",
          "details": "Creates a server webhook that template messages can use when staff want the post to appear with custom webhook styling.",
          "usage": "/template_message create webhook",
          "notes": []
        }
      ]
    },
    {
      "key": "components",
      "label": "Components",
      "emojiKey": "component",
      "roots": [
        "components"
      ],
      "overview": "Components let staff add persistent buttons and select menus to messages Ordo posted. Use them for role panels, response buttons, saved embed component templates, and managed bot messages.",
      "featureNotes": [
        "`/components post` creates a new bot message and immediately opens the component manager.",
        "`/components attach` connects the manager to an existing Ordo bot message.",
        "`/components manage` lists tracked component messages so staff can refresh, edit, or remove tracking later."
      ],
      "commands": [
        {
          "path": "components post",
          "summary": "Post a new bot message and manage its components.",
          "details": "Choose a normal text message or an embed-builder message, then add buttons or select menus from the manager. This is the main starting point for new component panels.",
          "usage": "/components post target:#channel format:embed",
          "notes": []
        },
        {
          "path": "components post_saved",
          "summary": "Post a saved embed with reusable components.",
          "details": "Posts a saved embed and applies any reusable component setup attached to that saved embed, so repeated panels can be deployed consistently.",
          "usage": "/components post_saved",
          "notes": []
        },
        {
          "path": "components template",
          "summary": "Manage reusable components for a saved embed.",
          "details": "Attach a reusable component setup to a saved embed so future posts can inherit the same buttons/select menus.",
          "usage": "/components template",
          "notes": []
        },
        {
          "path": "components attach",
          "summary": "Attach component management to an existing Ordo bot message.",
          "details": "Connects the component manager to a message Ordo already sent, letting staff add or manage persistent buttons and selects on that message.",
          "usage": "/components attach",
          "notes": []
        },
        {
          "path": "components manage",
          "summary": "Open tracked component message management.",
          "details": "Lists component-enabled bot messages in the server with direct actions to view, edit, refresh, or delete tracking.",
          "usage": "/components manage",
          "notes": []
        }
      ]
    },
    {
      "key": "docs",
      "label": "Docs",
      "emojiKey": "doc",
      "roots": [
        "doc"
      ],
      "overview": "Docs are saved messages that Ordo can post later. They can be personal, shared with a server, or available more broadly depending on who saves them and where they are intended to be used.",
      "featureNotes": [
        "Server docs are useful for repeated announcements, rules snippets, staff instructions, and other reusable server content.",
        "Embed docs use the same current Ordo embed-builder format, so validation and import behavior stays consistent.",
        "Personal docs are available to the user who saved them; server docs are shared in the current server."
      ],
      "commands": [
        {
          "path": "doc create",
          "summary": "Create a saved document.",
          "details": "Create either a normal text document or an embed-backed document, preview it, then choose where it should be saved based on your permissions.",
          "usage": "/doc create format:embed",
          "notes": []
        },
        {
          "path": "doc find",
          "summary": "Post an accessible saved document.",
          "details": "Search docs available to you and post one into the current context. The search respects doc scope and access rules.",
          "usage": "/doc find",
          "notes": []
        },
        {
          "path": "doc edit",
          "summary": "Edit a saved document you can manage.",
          "details": "Update a plain doc through a modal or reopen an embed doc in the embed editor, then save the revised version.",
          "usage": "/doc edit",
          "notes": []
        },
        {
          "path": "doc copy",
          "summary": "Copy an accessible document into another doc scope.",
          "details": "Duplicates a document you can access into another allowed location, such as copying a personal doc into the server doc library.",
          "usage": "/doc copy",
          "notes": []
        },
        {
          "path": "doc delete",
          "summary": "Delete a saved document you can manage.",
          "details": "Removes a saved doc from its current scope after checking that you have permission to manage it.",
          "usage": "/doc delete",
          "notes": []
        }
      ]
    },
    {
      "key": "moderation",
      "label": "Moderation",
      "emojiKey": "certified_moderator",
      "roots": [
        "admin",
        "role",
        "mute",
        "purge",
        "clean",
        "lockdown",
        "unlock"
      ],
      "overview": "Moderation commands help staff clean channels, manage roles, handle mutes, and temporarily lock or restore channel permissions.",
      "featureNotes": [
        "Most moderation tools require Discord permissions such as Manage Messages, Manage Roles, Manage Server, or Administrator.",
        "`/mute` uses the server's mute settings, role, and log channel. If those are not configured, the command explains what is missing.",
        "`/lockdown` stores the previous permission state so `/unlock` can restore it later."
      ],
      "commands": [
        {
          "path": "purge",
          "summary": "Delete a chosen number of messages.",
          "details": "Bulk-cleans recent messages in the current channel when the user and bot have the required message-management permissions.",
          "usage": "/purge amount:25",
          "notes": []
        },
        {
          "path": "clean",
          "summary": "Delete Ordo bot messages from a chat.",
          "details": "Removes Ordo-authored messages from the current channel without targeting user messages.",
          "usage": "/clean",
          "notes": []
        },
        {
          "path": "role add single",
          "summary": "Add one role to one member.",
          "details": "Adds a selected role to a selected member after checking role hierarchy and permissions for both the staff member and Ordo.",
          "usage": "/role add single role:@role member:@member",
          "notes": []
        },
        {
          "path": "role remove single",
          "summary": "Remove one role from one member.",
          "details": "Removes a selected role from a selected member after checking role hierarchy and permissions.",
          "usage": "/role remove single role:@role member:@member",
          "notes": []
        },
        {
          "path": "role add multiple",
          "summary": "Add one role to multiple members.",
          "details": "Opens an interactive review flow where staff can manually select members or a user can help and select the users, then staff can submit the role add action once the selection is correct.",
          "usage": "/role add multiple role:@role",
          "notes": []
        },
        {
          "path": "role remove multiple",
          "summary": "Remove one role from multiple members.",
          "details": "Opens an interactive review flow where staff can manually select members or a user can help and select the users, then staff can submit the role removal once the selection is correct.",
          "usage": "/role remove multiple role:@role",
          "notes": []
        },
        {
          "path": "mute add",
          "summary": "Mute a member until manually removed.",
          "details": "Applies the configured mute role, logs the action, optionally stores staff notes or evidence, and sends the user a DM notice when enabled.",
          "usage": "/mute add user:@member reason:<reason>",
          "notes": []
        },
        {
          "path": "mute temporary",
          "summary": "Mute a member for a specified duration.",
          "details": "Works like a manual mute but records an end time so Ordo can remove the mute when the duration expires.",
          "usage": "/mute temporary user:@member duration:2 hours reason:<reason>",
          "notes": []
        },
        {
          "path": "mute remove",
          "summary": "Remove an active mute from a member.",
          "details": "Removes the configured mute role when present, closes any active timed mute record, logs the result, and records a staff reason.",
          "usage": "/mute remove user:@member reason:<reason>",
          "notes": []
        },
        {
          "path": "admin ban check",
          "summary": "Check whether a user is banned in servers Ordo is in.",
          "details": "Searches the servers Ordo can access and reports whether the selected user appears in any server ban lists visible to the bot.",
          "usage": "/admin ban check id:<user>",
          "notes": [
            "This does not check every Discord server, only servers where Ordo can inspect bans."
          ]
        },
        {
          "path": "lockdown",
          "summary": "Lock a channel for non-admin roles.",
          "details": "Temporarily disables send/thread/reaction style permissions for non-admin roles in a supported channel and saves the previous overwrite state.",
          "usage": "/lockdown channel:#general reason:<reason>",
          "notes": []
        },
        {
          "path": "unlock",
          "summary": "Restore a channel from an Ordo lockdown.",
          "details": "Uses the saved lockdown record to restore role permission overwrites and then clears the lockdown state.",
          "usage": "/unlock channel:#general",
          "notes": []
        }
      ]
    },
    {
      "key": "records",
      "label": "Records",
      "emojiKey": "record",
      "roots": [
        "records"
      ],
      "overview": "Records give staff a structured place to create, view, and manage notes tied to users or roles. They are designed for moderation context rather than public user-facing profile information.",
      "featureNotes": [
        "Management opens a paginated format so servers are not limited by select-menu option counts.",
        "Record actions are staff-facing and require the appropriate moderation-style permissions."
      ],
      "commands": [
        {
          "path": "records create",
          "summary": "Create a user or role record.",
          "details": "Add a structured moderation note for a target user or role so staff can review context later.",
          "usage": "/records create",
          "notes": []
        },
        {
          "path": "records manage",
          "summary": "Manage records for a user or role.",
          "details": "Open the record manager with paginated rows and direct actions for each record.",
          "usage": "/records manage",
          "notes": []
        },
        {
          "path": "records view",
          "summary": "View records for a user or role.",
          "details": "Read record history without entering the edit/delete management flow.",
          "usage": "/records view",
          "notes": []
        }
      ]
    },
    {
      "key": "giveaways",
      "label": "Giveaways",
      "emojiKey": "confetti_colored",
      "roots": [
        "giveaways"
      ],
      "overview": "Giveaway commands create public giveaway posts and provide staff management panels for active and ended giveaways.",
      "featureNotes": [
        "Giveaway posts stay simple for participants, while staff actions live in a private management flow.",
        "Role multipliers can give selected roles extra entries when a giveaway is created.",
        "Ended giveaways can be re-rolled, reposted, or deleted from the management panel."
      ],
      "commands": [
        {
          "path": "giveaways add",
          "summary": "Create a giveaway.",
          "details": "Choose the prize, end time, posting channel, winner count, message, and optional role multipliers. Ordo posts the public giveaway with a join button.",
          "usage": "/giveaways add",
          "notes": []
        },
        {
          "path": "giveaways active",
          "summary": "Manage active giveaways.",
          "details": "Open a paginated staff panel for current giveaways with actions such as ending or canceling.",
          "usage": "/giveaways active",
          "notes": []
        },
        {
          "path": "giveaways ended",
          "summary": "Manage ended giveaways.",
          "details": "Review ended giveaways and perform actions such as re-roll, repost, or delete.",
          "usage": "/giveaways ended",
          "notes": []
        }
      ]
    },
    {
      "key": "sticky",
      "label": "Sticky Messages",
      "emojiKey": "sticky_message",
      "roots": [
        "sticky"
      ],
      "overview": "Sticky messages keep an important message near the bottom of a channel by reposting it after newer messages appear and the configured time interval has passed.",
      "featureNotes": [
        "Stickies can be normal messages or embed-builder messages.",
        "The manager can edit, repost, pause/resume, adjust timing, or delete each sticky.",
        "Ordo avoids logging its own sticky cleanup messages where possible, so staff logs stay focused on real user activity."
      ],
      "commands": [
        {
          "path": "sticky create",
          "summary": "Create or replace a sticky message in a channel.",
          "details": "Choose normal or embed format and the target channel. Ordo posts the sticky and tracks it for future reposting.",
          "usage": "/sticky create format:Embed channel:#rules",
          "notes": []
        },
        {
          "path": "sticky manage",
          "summary": "Manage this server's sticky messages.",
          "details": "Open the paginated sticky management panel with edit, timing, repost, pause/resume, and delete controls.",
          "usage": "/sticky manage",
          "notes": []
        },
        {
          "path": "sticky status",
          "summary": "View sticky status for the current channel.",
          "details": "Shows the sticky assigned to the channel, its live message link when available, interval, enabled state, and any recent error.",
          "usage": "/sticky status",
          "notes": []
        }
      ]
    },
    {
      "key": "profiles",
      "label": "Profiles",
      "emojiKey": "user",
      "roots": [
        "user"
      ],
      "overview": "Profile commands let users manage personal Ordo profile information, view user-facing profile cards, and check timezone/language details when users choose to share them.",
      "featureNotes": [
        "Profile settings include privacy and reset controls so users can decide what they want visible.",
        "Timezone data is reused by tools such as `/timestamp` when available."
      ],
      "commands": [
        {
          "path": "user profile view",
          "summary": "View a user's Ordo profile.",
          "details": "Shows the profile information that user has configured and allowed others to see.",
          "usage": "/user profile view user:@member",
          "notes": []
        },
        {
          "path": "user profile settings",
          "summary": "Edit your profile settings.",
          "details": "Open the profile settings for profile fields, privacy controls, and reset/delete style actions.",
          "usage": "/user profile settings",
          "notes": []
        },
        {
          "path": "user time",
          "summary": "View a user's current time.",
          "details": "Uses the user's saved profile timezone when available so other members can coordinate without asking for timezone math.",
          "usage": "/user time user:@member",
          "notes": []
        },
        {
          "path": "user languages",
          "summary": "View a user's known languages.",
          "details": "Shows the languages a user has saved on their Ordo profile, if they have configured any.",
          "usage": "/user languages user:@member",
          "notes": []
        }
      ]
    },
    {
      "key": "games",
      "label": "Games",
      "emojiKey": "game_controller",
      "roots": [
        "games"
      ],
      "overview": "Games are lightweight fun commands for server members, including two-player board games and quick random/fun outputs.",
      "featureNotes": [
        "Connect 4 and Tic Tac Toe use interactive join/game flows.",
        "Quick commands such as coin flip, dice roll, and achievement are simple public fun commands."
      ],
      "commands": [
        {
          "path": "games connect4",
          "summary": "Start a Connect 4 match.",
          "details": "Creates a two-player lobby and then runs the game in Discord once another member joins.",
          "usage": "/games connect4",
          "notes": []
        },
        {
          "path": "games tic_tac_toe",
          "summary": "Start a Tic Tac Toe match.",
          "details": "Creates a two-player Tic Tac Toe game with a structured interactive board.",
          "usage": "/games tic_tac_toe",
          "notes": []
        },
        {
          "path": "games coin_flip",
          "summary": "Flip a virtual coin.",
          "details": "Returns a quick heads-or-tails style result for lightweight decisions or fun.",
          "usage": "/games coin_flip",
          "notes": []
        },
        {
          "path": "games achievement",
          "summary": "Post a fun achievement message.",
          "details": "Creates a playful achievement-style message from the text you provide.",
          "usage": "/games achievement achievement:<text>",
          "notes": []
        },
        {
          "path": "games dice_roll",
          "summary": "Roll a six-sided die.",
          "details": "A quick random dice command for lightweight games or decisions.",
          "usage": "/games dice_roll",
          "notes": []
        }
      ]
    },
    {
      "key": "voice",
      "label": "Voice",
      "emojiKey": "voice_channel",
      "roots": [
        "voice"
      ],
      "overview": "Voice commands let Ordo join or leave voice channels, say text through TTS, and manage voice channel status when Discord supports it.",
      "featureNotes": [
        "Voice join/leave tools depend on the caller being in or targeting an accessible voice channel.",
        "Voice status can be set or cleared for supported voice channels."
      ],
      "commands": [
        {
          "path": "voice join",
          "summary": "Have Ordo join your voice channel.",
          "details": "Moves Ordo into the voice channel you are currently using when it has permission to connect.",
          "usage": "/voice join",
          "notes": []
        },
        {
          "path": "voice leave",
          "summary": "Have Ordo leave voice.",
          "details": "Disconnects Ordo from the active voice connection.",
          "usage": "/voice leave",
          "notes": []
        },
        {
          "path": "voice status",
          "summary": "Set or clear a voice channel status.",
          "details": "Updates the status text shown on a supported voice channel, or clears it when needed.",
          "usage": "/voice status",
          "notes": []
        },
        {
          "path": "voice tts",
          "summary": "Have Ordo speak a message in voice.",
          "details": "Sends text-to-speech audio into the active voice connection so Ordo can say a provided message aloud.",
          "usage": "/voice tts message:<text>",
          "notes": []
        }
      ]
    },
    {
      "key": "suggestions",
      "label": "Suggestions",
      "emojiKey": "suggestion",
      "roots": [
        "suggest"
      ],
      "overview": "Suggestions let members submit structured ideas to the server's configured suggestion channel, where staff can review and update their status.",
      "featureNotes": [
        "The server must enable suggestions and configure a valid suggestion channel before members can submit.",
        "Staff status updates are handled from the suggestion message's context menu, not a public slash command.",
        "To update a suggestion, right-click or long-press the Ordo suggestion message, open Apps, choose Update Suggestion Status, then pick the new status and optional staff note."
      ],
      "commands": [
        {
          "path": "suggest",
          "summary": "Submit a suggestion for the server.",
          "details": "Opens a modal for a suggestion title and details, posts it to the configured suggestion channel, and adds voting reactions when available. Staff update the suggestion later from the message context menu: Apps -> Update Suggestion Status.",
          "usage": "/suggest",
          "notes": [
            "Suggestion status updates require staff permissions and must be run on the Ordo-posted suggestion message.",
            "The context menu opens a status modal with Approved, Considering, Denied, and Implemented options plus an optional staff note."
          ]
        }
      ]
    }
  ]
});
