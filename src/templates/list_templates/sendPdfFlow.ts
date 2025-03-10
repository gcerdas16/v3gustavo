import { addKeyword } from "@builderbot/bot";

const sendPdfFlow = addKeyword("GS0310973").addAnswer("Te adjunto un PDF", {
  media: "./public/assets/AIP-Links.pdf",
});

export { sendPdfFlow };
