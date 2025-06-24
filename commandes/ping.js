const os = require('os');
const process = require('process');
const fs = require('fs');
const { zokou } = require('../framework/zokou');
const axios = require('axios');
const path = require('path');

// Format uptime
function formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

zokou({
    nomCom: "ping",
    categorie: "general",
    reaction: "⚡",
    desc: "Bot ping and system info"
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    try {
        const start = Date.now();
        const emojis = ['⚡', '🚀', '💨', '🎯', '🔥', '🎉', '🌟', '💥', '🧠'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        const end = Date.now();
        const ping = Math.round((end - start) / 2);
        const uptime = formatTime(process.uptime());

        let speed = '🐢 Slow', color = '🔴';
        if (ping <= 100) speed = '🚀 Super Fast', color = '🟢';
        else if (ping <= 250) speed = '⚡ Fast', color = '🟡';
        else if (ping <= 500) speed = '⚠️ Medium', color = '🟠';

        const report = `
╭━━〔 ⚙️ *RAHEEM_XMD - System Report* 〕━━⬣
┃
┃ 🛰️ *Response:* ${ping} ms ${emoji}
┃ 📶 *Speed:* ${color} ${speed}
┃ ⏱️ *Uptime:* ${uptime}
┃ 🧠 *Platform:* ${os.platform().toUpperCase()}
┃ 🧩 *NodeJS:* ${process.version}
┃ 💎 *Bot Name:* RAHEEM_XMD
┃ 🔰 *Developer:* RAHEEM-CMOfficial
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣

_“Speed defines the legend. You’re flying with RAHEEM_XMD-.”_
        `.trim();

        await repondre(report);

        // Send the audio file at the end
        const audioUrl = "https://files.catbox.moe/ykobyr.mp3";
        const audioPath = path.join(__dirname, "../temp/ping_audio.mp3");

        const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(audioPath, Buffer.from(response.data, 'binary'));

        await zk.sendMessage(dest, {
            audio: fs.readFileSync(audioPath),
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: ms });

        fs.unlinkSync(audioPath); // Delete after sending

    } catch (err) {
        console.error('❌ Ping Error:', err);
        await repondre("❌ Ping error. Try again later.");
    }
});
