import { addKeyword } from "@builderbot/bot";

const sendImageFlow = addKeyword("GS0310972").addAnswer(
  "Te adjunto una imagen",
  //{
  //media: "./public/assets/logo.png",
  //}
);

export { sendImageFlow };
