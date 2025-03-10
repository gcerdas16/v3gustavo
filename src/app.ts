import { join } from 'path'
import { createBot, createProvider, createFlow, addKeyword, utils } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { config } from './config'
import templates from './templates'
import { providerBaileys, providerMeta } from './provider'


const PORT = config.PORT;

const main = async () => {
    const adapterFlow = templates;
    let adapterProvider;
    if (config.provider === "meta") {
        adapterProvider = providerMeta;
    } else if (config.provider === "baileys") {
        adapterProvider = providerBaileys;
    } else {
        console.log("ERROR: Falta agregar un provider al .env")
    }


    const adapterDB = new Database();

    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    httpServer(+PORT);
};

main();