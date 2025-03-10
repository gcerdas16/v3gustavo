import { downloadMediaMessage } from "@adiwajshing/baileys";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const formats: Record<string, { code: string; ext: string }> = {
    mp3: {
        code: "libmp3lame",
        ext: "mp3",
    },
};

const convertAudio = async (filePath: string, format: string = "mp3"): Promise<string> => {
    if (!filePath) {
        throw new Error("filePath is required");
    }
    const convertedFilePath = path.join(
        path.dirname(filePath),
        `${path.basename(filePath, path.extname(filePath))}.${formats[format].ext}`
    );

    await new Promise<void>((resolve, reject) => {
        ffmpeg(filePath)
            .audioCodec(formats[format].code)
            .audioBitrate("128k")
            .format(formats[format].ext)
            .output(convertedFilePath)
            .on("end", () => resolve())
            .on("error", (err) => reject(err))
            .run();
    });

    return convertedFilePath;
};

export const downloadFileBaileys = async (ctx: any) => {
    const bufferOrStream = await downloadMediaMessage(ctx, "buffer", {});
    let buffer: Buffer;

    if (Buffer.isBuffer(bufferOrStream)) {
        buffer = bufferOrStream;
    } else if (bufferOrStream instanceof Readable) {
        const chunks: Buffer[] = [];
        for await (const chunk of bufferOrStream) {
            chunks.push(chunk);
        }
        buffer = Buffer.concat(chunks);
    } else {
        throw new Error("Tipo de dato inesperado recibido de downloadMediaMessage");
    }

    const tmpDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
    }

    const fileName = `file-${Date.now()}.ogg`;
    const filePath = path.join(tmpDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const audioExtensions = ["oga", "ogg", "wav", "mp3"];
    let finalFilePath = filePath;
    let finalExtension = "ogg";

    if (audioExtensions.includes(finalExtension)) {
        try {
            finalFilePath = await convertAudio(filePath, "mp3");
            finalExtension = "mp3";
        } catch (error) {
            console.error(`Error converting file: ${(error as Error).message}`);
        }
    }

    return {
        fileName: path.basename(finalFilePath),
        fileOldPath: filePath,
        filePath: finalFilePath,
        fileBuffer: fs.readFileSync(finalFilePath),
        extension: finalExtension,
    };
};

export default { downloadFileBaileys };
