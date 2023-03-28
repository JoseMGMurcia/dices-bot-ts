import { Message } from "discord.js";

export const reply = (text: string, msg: Message) => {
    console.log(text);
    msg.reply(text);
}