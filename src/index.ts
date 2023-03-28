import { BaseInteraction, Client, GatewayIntentBits, Message, MessageReaction, PartialMessageReaction, User } from "discord.js";
import { TOKEN } from "./shared/constants/token.constant";
import { getTotal } from "./shared/utils/dices.utils";
import { cutDicesRolls, isRollMsg, replaceAuthorName } from "./shared/utils/message.utils";
import { reply } from "./shared/utils/post.utils";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => { console.log(`Logged in as ${client?.user?.tag}!`);});

client.on("messageCreate", (msg: Message) => {
  try {
    if (isRollMsg(msg.content)) {
      const rolls: string[] = cutDicesRolls(msg.content);
      const total: number = getTotal(rolls);
      const author: string = replaceAuthorName(msg.author.username);
      const text = `${author} obtiene: ${total}`
      reply(text, msg);
    }
  } catch(e: any) {
    console.error(`Unspected error ${JSON.parse(e)}`);
  }
});


client.login(TOKEN);
  