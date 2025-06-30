const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV05WNGtzU1A2RnR6cjEvVXJtc0kxM2FEYzNReE8wa2xNM1JGR2tiV1VGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQW8yS09mbVl5anFIWFVmRzFzMEJNRkhianJtbXJNRkQvdEw4OW02N3l3UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRWU4Z3d5WXZyL2REVVA0VURQZXc5ckpDM2t4Y2FQSjROQk9Kb0U2cEY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyYU9uSy9mU3hUWFNTdEZBaTFYdmJHTlVpOFF5cHlsbldyeVI2eXBQeEE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlQTTNlT3ZDNUd2OFVUVU1XcHRrUXQzN3dZNDFucFV1KzQvYUt6R3p3MUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVBQVhCQ3BZYnZ6ekc2cURWZm1xVk4rY3ZVWkRzVHcvSEhTS0N2aTd5MEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkU0Ry9jcEU5YklpeTRlaVlVUDd2ankyMTE5WStFaTVidGVJVmdocDZHMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibStmUC9EandXbFRLSysrYVhyaXFjS2FXMXBOZU9lSW9GdnJLc2ZmRXAxTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlpOEN2NXgrMjV3b01jRUU2bHFQalFMcXJDTnlYcDJwY2wzNEwyaHo3eG9nbFBnR3pBQ3BPL2NpUDdHdE1YVHpXcjE2V1FaK2IycU9IS1lzQnUyempRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEsImFkdlNlY3JldEtleSI6Ind5S1hXTzJpUzZLeXNHRFFPTjNJT2xjZy9MYWgyM1ZCT3ZjK3F1bjVJSVk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzYwMDAzNDQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijc3MjI1MjEyMDFFNUUyQjM5NkEzRDg5NUQ5NkU5QTk4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEyNzQwMTl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTc2MDAwMzQ0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCRDQ1N0RGQzVCNTA4RDY4NDEwNUQ3OTBFMDhDMjAwNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMjc0MDE5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJYWk0zUTZYRCIsIm1lIjp7ImlkIjoiMjU1NzYwMDAzNDQzOjlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyNjAwNzgwODcxODA1MDA6OUBsaWQiLCJuYW1lIjoiRGlkZHl58J+TjCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0xBdEtjRUVKV2tpY01HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWkpJTTN4OFZWejZHR3dBZFE3TG5hZDRUa3Nkd2V4bDU4OTRHRDBKUTd4ST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYmZQd0ZQT1JTa1kvMXlYa0c5cXNSbVE5VUtKZnlLQVpVZHFVT3VyTnFwMVZKY2lpV2kxMHowaUhLbUZjMXB2bVUxOXliMjVjRXZ1NVNEaVVHNGJSRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IkxZVmwrbWQ5SnNheUhOSE0xMjFGMnlVNUxSODJCV0dzT0svZTVWcmhoRlM3Qzdpc0xBUmpBWkpBa3FWQjdiK2swQ20rL1l1Mi9zcSs3Y1I4Z3ZMNWhBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzYwMDAzNDQzOjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV1NTRE44ZkZWYytoaHNBSFVPeTUybmVFNUxIY0hzWmVmUGVCZzlDVU84UyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxMjc0MDE4LCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUGhQIn0=',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "RAHEEM-XMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "RAHEEM-XMD",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'RAHEEM_XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/7hxv7a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '2',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",

};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
