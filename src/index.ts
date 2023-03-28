import { Client, GatewayIntentBits, Message } from "discord.js";
import { TOKEN } from "./shared/constants/token.constant";
import { manageRolls } from "./shared/utils/dices.utils";
import { isRollMsg, getReplacedAuthorName } from "./shared/utils/message.utils";
import { reply } from "./shared/utils/post.utils";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => { console.log(`Logged in as ${client?.user?.tag}!`);});

client.on("messageCreate", (msg: Message) => {
  try {
    if (isRollMsg(msg.content)) {
      const total: number = manageRolls(msg.content);
      const author: string = getReplacedAuthorName(msg.author.username);
      const text = `${author} obtiene: ${total}`
      reply(text, msg);
    }
  } catch(e: any) {
    console.error(`Unspected error ${JSON.parse(e)}`);
  }
});

client.login(TOKEN);
  