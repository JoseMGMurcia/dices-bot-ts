import { Client, GatewayIntentBits, Message, TextChannel } from "discord.js";
import { TOKEN } from "./shared/constants/token.constant";
import { manageRolls } from "./shared/utils/dices.utils";
import { isRollMsg, getReplacedAuthorName } from "./shared/utils/message.utils";
import { post } from "./shared/utils/post.utils";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => { console.log(`Logged in as ${client?.user?.tag}!`);});

client.on("messageCreate", (msg: Message) => {

  try {
    if (isRollMsg(msg.content)) {
      
      const total: number = manageRolls(msg.content);
      const author: string = getReplacedAuthorName(msg.author.username);
      const roll = msg.content.replace(' ', '');
      const text = `${author} tira: ${roll} y saca: ${total}`
      const channelId = msg.channelId;
      const channel = client.channels.cache.get(channelId) as TextChannel
      post(text, channel);
    }
  } catch(e: any) {
    console.error(`Unspected error ${JSON.parse(e)}`);
  }
});

client.login(TOKEN);
