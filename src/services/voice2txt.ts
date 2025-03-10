import OpenAI from "openai";
import { config } from '../config/index.js';
import path from "path";
import fs from "fs";

const openaiApiKey = config.ApiKey;

export const voice2text = async (path) => {
    if (!fs.existsSync(path)) {
        throw new Error("No se encuentra el archivo");
    }
    try {
        const openai = new OpenAI({
            apiKey: openaiApiKey,
        });
        const resp = await openai.audio.transcriptions.create({
            file: fs.createReadStream(path),
            model: "whisper-1",
        });
        return resp.text;
    } catch (err) {
        console.log(err);
        return "Error";
    }
};