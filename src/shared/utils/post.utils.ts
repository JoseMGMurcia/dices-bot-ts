export const logAndReply = (text: string, msg: any) => {
    console.log(text);
    msg.reply(text);
}