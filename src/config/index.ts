import "dotenv/config";

export const config = {
    PORT: process.env.PORT ?? 3008,
    provider: process.env.provider,

    //Meta
    jwtToken: process.env.jwtToken,
    numberId: process.env.numberId,
    verifyToken: process.env.verifyToken,
    version: "v21.0",
    // AI
    Model: process.env.Model,
    ApiKey: process.env.ApiKey,
    // Sheets
    spreadsheetId: process.env.spreadsheetId,
    privateKey: process.env.privateKey,
    clientEmail: process.env.clientEmail,
    //Chatwoot
    CHATWOOT_ACCOUNT_ID: process.env.AccountID,
    CHATWOOT_TOKEN: process.env.ChatwootToken,
    CHATWOOT_ENDPOINT: process.env.ChatwootEndpoint,
    INBOX_NAME: process.env.INBOX_NAME,
    BOT_URL: process.env.BOT_URL
};