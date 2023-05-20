import { Message, TextChannel } from "discord.js";

export const reply = (text: string, msg: Message) => {
    console.log(text);
    msg.reply(text);
}

export const post = (text: string, channel: TextChannel) => {
    channel.send(text);
    console.log(text);
}