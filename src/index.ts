import { Client, GatewayIntentBits, Message } from "discord.js";
import { TOKEN } from "./shared/constants/token.constant";
import { isRollMsg, deleteMessagesFromSamePerson, isFumbleMsg, isPercentRollMsg, getAuthor, isHelpMsg } from "./shared/utils/message.utils";
import { post } from "./shared/utils/post.utils";
import { NUMBERS } from "./shared/constants/number.constants";
import { isAttackRollMsg, isGetRollMsg, isSetRollMsg, manageSetRoll } from "./shared/utils/set-get-roll.utils";
import { AttackRoll } from "./shared/models/get-set.model";
import { getRollText, getFunbleMsg, getAttackMsg, getPercentagesRollMsg } from "./shared/utils/msg-handler";
import { helpText } from "./shared/constants/message.constant";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => { console.log(`Logged in as ${client?.user?.tag}!`);});

let time = NUMBERS.N_0;
let rolls: string[] = [];
const MAX_TIME_BETWEEN_ROLLS = NUMBERS.N_8000;
let attackRolls: AttackRoll[] = [];

client.on("messageCreate", (msg: Message) => {
  try {
    if (isRollMsg(msg.content)) {
      const text = getRollText(msg);
      insertTextInRolls(text, msg);
    }

    else if (isPercentRollMsg(msg.content)) {
      const text = getPercentagesRollMsg(msg);
      insertTextInRolls(text, msg);
    }

    else if (isFumbleMsg(msg.content)) {
      const text = getFunbleMsg(msg);
      post(text, msg, client);
    }

    else if (isSetRollMsg(msg.content) ){
      const text = getSetText(msg);
      post(text, msg, client);
    }
    
    else if (isGetRollMsg(msg.content) ){
      const attackRoll = attackRolls.find((roll) => roll.owner === getAuthor(msg));
      post(attackRoll ? JSON.stringify(attackRoll) : 'No hay tirada guardada', msg, client);
    }
    
    else if (isAttackRollMsg(msg.content) ){
      const text = getAttackMsg(msg, attackRolls);
      post(text ,msg, client);
    }

    else if (isHelpMsg(msg.content)) {
      post(helpText, msg, client);
    }

  }
  catch(e: any) { console.error(`Unspected error ${JSON.parse(e)}`); }
});

client.login(TOKEN);

const getSetText = (msg: Message): string => {
  const setResponse = manageSetRoll(msg.content, getAuthor(msg));
  const text = `${getAuthor(msg)}: ${setResponse.message}`
  if(setResponse.success && setResponse.attacRoll){
    attackRolls = attackRolls.filter((r) => r.owner !== getAuthor(msg));
    attackRolls.push(setResponse.attacRoll);
    console.log(attackRolls); 
  }
  return text;
};

const insertTextInRolls = (text: string, msg: Message) => {
  rolls = new Date().getTime() - time < MAX_TIME_BETWEEN_ROLLS ? rolls : []; 
  rolls.push(text);
  const cleanedRolls = deleteMessagesFromSamePerson(rolls);
  cleanedRolls.forEach((rollText) => { post(rollText, msg, client); });
  time = new Date().getTime();
};
