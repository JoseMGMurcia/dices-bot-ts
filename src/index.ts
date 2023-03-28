import { Client, GatewayIntentBits, Message } from "discord.js";
import { DICE_SEPARATOR } from "./shared/constants/message.constant";
import { NUMBERS } from "./shared/constants/number.constants";
import { rollRegex } from "./shared/constants/regex.constants";
import { TOKEN } from "./shared/constants/token.constant";
import { getTotal } from "./shared/utils/dices.utils";
import { cutDicesRolls, replaceAuthorName } from "./shared/utils/message.utils";
import { logAndReply } from "./shared/utils/post.utils";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => { console.log(`Logged in as ${client?.user?.tag}!`);});

client.on("messageCreate", (msg: Message) => {
  if (msg.author.bot) return
  try {
    if (rollRegex.test(msg.content)) {
      const rolls: string[] = cutDicesRolls(msg.content);
      const total: number = getTotal(rolls);
      const author: string = replaceAuthorName(msg.author.username);
      const text = `${author} sacas: ${total}`
      logAndReply(text, msg);
    }
  } catch(e: any) {
    console.log(`Unspected eror ${e.message}`);
  }
});
client.login(TOKEN);
  