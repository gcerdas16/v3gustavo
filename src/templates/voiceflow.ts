import { addKeyword, EVENTS } from "@builderbot/bot";
import aiServices from "~/services/aiServices";
import sheetsService from "~/services/sheetsService";
import { config } from "../config";
import path from "path";
import fs, { stat } from "fs";
import { downloadFileBaileys } from "~/utils/downloader";
import { voice2text } from "~/services/voice2txt";
import { removeFile } from "~/utils/remover";

const pathPrompt = path.join(
    process.cwd(),
    "assets/prompts",
    "prompt_OpenAi.txt"
);
const prompt = fs.readFileSync(pathPrompt, "utf8");

export const voiceflow = addKeyword(EVENTS.VOICE_NOTE).addAction(
    async (ctx, { endFlow, flowDynamic, gotoFlow }) => {



        let filePath;
        if (config.provider === "baileys") {
            filePath = await downloadFileBaileys(ctx);
        } else {
            console.log("ERROR: Falta agregar un provider al .env")
        }

        const transcript = await voice2text(filePath.filePath)

        const history = await sheetsService.getUserConv(ctx.from);
        history.push({ role: "user", content: transcript });
        try {
            const AI = new aiServices(config.ApiKey);
            const response = await AI.chat(prompt, history);
            await sheetsService.addConverToUser(ctx.from, [
                { role: "user", content: transcript },
                { role: "assistant", content: response },
            ]);
            //if (response.includes("humanotest")) {
            //return gotoFlow(
            //humanoflow2
            //);
            //}
            removeFile(filePath.filePath)
            removeFile(filePath.fileOldPath)
            return endFlow(response);

        } catch (error) {
            console.log("Error en llamada GPT", error);
            return endFlow("Por favor, intenta de nuevo");
        }
    });

