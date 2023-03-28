import { Client, GatewayIntentBits, Message } from "discord.js";
import { TOKEN } from "./shared/constants/token.constant";
import { cutDicesRolls, replaceAuthorName } from "./shared/utils/message.utils";


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on('ready', () => { console.log(`Logged in as ${client?.user?.tag}!`);});

client.on("messageCreate", (msg: Message) => {
    if (msg.author.bot) return
    try {
        const regex = /^([dD]|[0-9]|[+]|[-]|[ ])+$/;  //Text only contains [D, +, - , numbers, spaces]
        if (regex.test(msg.content)) {
          const rolls = cutDicesRolls(msg.content);
          let total = 0;
          rolls.forEach(roll => {
            const upRoll = roll.toUpperCase();
            if(upRoll.indexOf("D") === -1) {
              total += parseInt(roll);
            } else {
              const dice = upRoll.split("D");
              let negative = false;
              let diceNumber = dice[0].length === 0 ? 1 : parseInt(dice[0]);
              const diceType = parseInt(dice[1]);
              if(diceNumber < 0 ){
                negative = true;
                diceNumber = diceNumber * -1;
              }
              for (let i = 0; i < diceNumber; i++) {
                if (negative) total -= Math.floor(Math.random() * diceType) + 1;
                else total += Math.floor(Math.random() * diceType) + 1;
              }
          }
        });
        const author= replaceAuthorName(msg.author.username);
        const text = `${author} sacas: ${total}`
        logAndReply(text, msg);
       }
    } catch(e: any) {
      console.log(`Unspected eror ${e.message}`);
    }
  })
  client.login(TOKEN);
  
  const logAndReply = (text: string, msg: any) => {
    console.log(text);
    msg.reply(text);
  }
  
  