import { Client, GatewayIntentBits, Message } from "discord.js";
import { TOKEN } from "./shared/constants/token.constant";
import { isRollMsg, deleteMessagesFromSamePerson, isFumbleMsg, isPercentRollMsg, isHelpMsg } from "./shared/utils/message.utils";
import { post } from "./shared/utils/post.utils";
import { NUMBERS } from "./shared/constants/number.constants";
import { getRollText, getFunbleMsg, getPercentagesRollMsg } from "./shared/utils/msg-handler";
import { helpText } from "./shared/constants/message.constant";
import { isSWRollMsg } from "./shared/utils/set-get-roll.utils";
import { handleSWRolls } from "./sw/sw.utils";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => { console.log(`Logged in as ${client?.user?.tag}!`);});

let time = NUMBERS.N_0;
let rolls: string[] = [];
const MAX_TIME_BETWEEN_ROLLS = NUMBERS.N_8000;

client.on("messageCreate", (msg: Message) => {
  try {
    if (isRollMsg(msg.content)) {
      const text = getRollText(msg);
      insertTextInRolls(text, msg);
      return;
    }

    if (isPercentRollMsg(msg.content)) {
      const text = getPercentagesRollMsg(msg);
      insertTextInRolls(text, msg);
      return;
    }

    if (isFumbleMsg(msg.content)) {
      const text = getFunbleMsg(msg);
      post(text, msg, client);
      return;
    }

    if (isSWRollMsg(msg.content)) {
      handleSWRolls(msg, client);
      return;
    }

    if (isHelpMsg(msg.content)) {
      post(helpText, msg, client);
      return;
    }
  }
  catch(e: any) { console.error(`Unspected error ${e}`); }
});

client.login(TOKEN);

const insertTextInRolls = (text: string, msg: Message) => {
  rolls = new Date().getTime() - time < MAX_TIME_BETWEEN_ROLLS ? rolls : []; 
  rolls.push(text);
  const cleanedRolls = deleteMessagesFromSamePerson(rolls);
  cleanedRolls.forEach((rollText) => { post(rollText, msg, client); });
  time = new Date().getTime();
};
