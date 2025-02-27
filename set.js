const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkw5ZGJVRytjdGJqWUFmcGh0SXlyUUd2azlYYUsrUFREc1RWTHpJNHptND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicThUWTBReXRmRk1xQjBNMk5PTmlnNWg4Q0MzYzdEU0hua2VPR2pFVjNrTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTHhkQ2RTVSs4bGlPdXprYldjaXZyQWI5S3Zkb2RPbzJjV0wwaEcvWlZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQzRtK3dBcnBUNWRnNW5idFUzZGZUcCtSQmNubW5ZSmcwS3BlZ0RpQ1h3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlEVlcxN21iQWx2TFFUMjVlYTMyK1ZqTXJtUms0Y3NjZi93T2NWdXkwazg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjROVkh5bjRIaHFnSWJIMDVFQXROTUR5RVNWQXFIOFJQbkpOOGpCVzJUR3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0VQMFNCU0wyWHFQeE1Oc0x0Vzh5VFV1Rk9VMlh5TG95bHg5RCs0RC8xdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWhhNUIxQjJXa0V1Y1JpZmhGakw0ZHZ4NnJWdFBoUTRhcE5VNys5ajRDcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJGTWZHM1NLL2lEWnE1V0x2YmRmVGNBdWNGRUIrNldDNk5FR2Yrci91NXNUTW5vd0dnbmM2U2UwdU1ISDFScnFkUEZ0bmZHNzJDZVpGM05TNnpwZmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiJQL2Y5T0x2TTY3ZjIzN1dXejU1WkhpcTBCT01jV09RRmhZSld5MXNDUnowPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIyaHIxUXFjMFJBdVNpLS15WVVPMTdBIiwicGhvbmVJZCI6ImEyNmExMGUwLWM0ZTktNDA1MS1iYWM3LTc2MmEwNWFmYjgwNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0Y3R3T1pZMStLTmFDRmpjQkk3RlN4L1REQ0U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUzZqWkhSUGh0WC84SXJXd0hFWjYvMDV2SkxFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkxNUDNGRFQyIiwibWUiOnsiaWQiOiI2MDExMTc1MDg1MjU6NDFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09YTmtLZ0VFS21yZ2I0R0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZBTlJxVThBVytDcWhsVWVyMm5oa0VSK0dqTzkrd2Jvb2J3ZFZuVEUwRkU9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImF3eUJFY2c4YnhjN0doNGFSMURuazVyT0JSM3RleE1XbVJTcDkwc0JyYm5sdTI1V1ZkNVY5blJTalpsK0gzd0lFUC9VeUhpVUNNN3lQNzVjZDFYU0RBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJta2loNms0dnQ1TldWNmJKdnpGOFpmejJMaUtSeEZoekVRVU50K1gyUmYveUEwb3pPbzZFOHBzM3NTbHdCenRMSjJFczV2MzRSdGtGZ2x4L2ZvdkpqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjYwMTExNzUwODUyNTo0MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYd0RVYWxQQUZ2Z3FvWlZIcTlwNFpCRWZob3p2ZnNHNktHOEhWWjB4TkJSIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwNjU4MTAzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVIciJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "Fredi",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255752593977",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

