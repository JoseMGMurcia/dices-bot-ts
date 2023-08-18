import { Client, GatewayIntentBits, Message, TextChannel } from "discord.js";
import { TOKEN } from "./shared/constants/token.constant";
import { manageRolls } from "./shared/utils/dices.utils";
import { isRollMsg, deleteMessagesFromSamePerson, isFumbleMsg } from "./shared/utils/message.utils";
import { post } from "./shared/utils/post.utils";
import { NUMBERS } from "./shared/constants/number.constants";
import { getFumbleText } from "./shared/utils/fumble.utils";
import { FUMBLE_TYPES_TEXT_ES, MELEE_FUMBLE_START, MELEE_FUMBLE_START_2, NATURAL_FUMBLE_START, RANGED_FUMBLE_START, YOU_ROLL_FOR_A_ES } from "./shared/constants/message.constant";
import { MELEE_FUMBLES, NATURAL_FUMBLES, RANGED_FUMBLES } from "./shared/constants/fumble.constants";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => { console.log(`Logged in as ${client?.user?.tag}!`);});

let time = NUMBERS.N_0;
let rolls: string[] = [];
const MAX_TIME_BETWEEN_ROLLS = NUMBERS.N_8000;

client.on("messageCreate", (msg: Message) => {
  try {
    if (isRollMsg(msg.content)) {
      
      const total: number = manageRolls(msg.content);
      const author: string = msg.member?.displayName || msg.author.username;

      const roll = msg.content.replaceAll(' ', '');
      const text = `${author} tira: ${roll} y saca: ${total}`
      const channelId = msg.channelId;
      const channel = client.channels.cache.get(channelId) as TextChannel;

      rolls = new Date().getTime() - time < MAX_TIME_BETWEEN_ROLLS ? rolls : [];
     
      rolls.push(text);

      const cleanedRolls = deleteMessagesFromSamePerson(rolls);
      cleanedRolls.forEach((roll) => { post(roll, channel); });
      time = new Date().getTime();

    } else if (isFumbleMsg(msg.content)) {
      const secondPart = msg.content.split(' ')[NUMBERS.N_1]?.toLocaleLowerCase();
      const channel: TextChannel = client.channels.cache.get(msg.channelId) as TextChannel;
      const author: string = msg.member?.displayName || msg.author.username;
      let text = `${author}: ${FUMBLE_TYPES_TEXT_ES}`;

      if(secondPart){
        const fumbleTarget = Math.floor(Math.random() * NUMBERS.N_100) + NUMBERS.N_1;

        text = secondPart.startsWith(   MELEE_FUMBLE_START ) ||  secondPart.startsWith( MELEE_FUMBLE_START_2 ) ?
          `${author}, ${YOU_ROLL_FOR_A_ES} ${fumbleTarget}: ${getFumbleText(fumbleTarget, MELEE_FUMBLES)}` : text;
        text = secondPart.startsWith(  RANGED_FUMBLE_START ) ? `${author}, ${YOU_ROLL_FOR_A_ES} ${fumbleTarget}: ${getFumbleText(fumbleTarget, RANGED_FUMBLES)}` : text;
        text = secondPart.startsWith( NATURAL_FUMBLE_START ) ? `${author}, ${YOU_ROLL_FOR_A_ES} ${fumbleTarget}: ${getFumbleText(fumbleTarget, NATURAL_FUMBLES)}` : text;
      }
      post(text, channel);
    }
  } catch(e: any) {
    console.error(`Unspected error ${JSON.parse(e)}`);
  }
});

client.login(TOKEN);
