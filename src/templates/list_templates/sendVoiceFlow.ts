import { addKeyword } from "@builderbot/bot";

const sendVoiceFlow = addKeyword("GS0310971").addAction(async (ctx, ctxFn) => {
  await ctxFn.flowDynamic([
    { body: "send Audio", media: "./public/assets/audio.mp3" },
  ]);
});

export { sendVoiceFlow };
