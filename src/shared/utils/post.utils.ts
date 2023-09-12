import { Client, Message, TextChannel } from "discord.js";

export const reply = (text: string, msg: Message) => {
    console.log(text);
    msg.reply(text);
}

export const post = (text: string, msg: Message, client: Client) => {
    const channelId = msg.channelId;
    const channel = client.channels.cache.get(channelId) as TextChannel;

    channel.send(text);
    console.log(text);
}