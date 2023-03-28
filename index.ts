import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on('ready', () => { console.log(`Logged in as ${client?.user?.tag}!`);});

client.on("messageCreate", msg => {
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
    } catch(e) {
      console.log(`Unspected eror ${e.message}`);
    }
  })
  client.login(process.env.TOKEN);
  
  const logAndReply = (text, msg) => {
    console.log(text);
    msg.reply(text);
  }
  
  const cutDicesRolls = (text) => {
    text = text.replace("-", "+-");
    const rolls = text.split("+");
     rolls.forEach((roll, index) => {
      rolls[index] = roll.trim();
      // console.log(rolls[index]);
    });
     return rolls;
  }
  
  const replaceAuthorName = (text) => {
    text = text.replace("Gwerfaur", "Pepe");
    text = text.replace("Sithcario", "Ferrán");
    return text;
  }