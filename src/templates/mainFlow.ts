import { addKeyword, EVENTS } from "@builderbot/bot";
import { registerFlow } from "./registerFlow";
import sheetsService from "../services/sheetsService";
//import { DetectIntention } from "./intention.flow";
import { QueueConfig, createMessageQueue } from "fast";
import { faqFlow } from "./faqFlow";
import { eventNames } from "process";
import { voiceflow } from "./voiceflow";
import { gastosflow } from "./leerexcel";
import { faqFlow2 } from "./faqFlow2";
import { locationflowhere } from "./location";
import { faqFlowcopia } from "./faqFlow copy";



const queueConfig: QueueConfig = { gapMilliseconds: 15000 };
const enqueueMessage = createMessageQueue(queueConfig);


const mainFlow = addKeyword([
  EVENTS.WELCOME,
  EVENTS.MEDIA,
  EVENTS.DOCUMENT,
  EVENTS.VOICE_NOTE
]).addAction(async (ctx, ctxFn) => {
  const isUser = await sheetsService.userExists(ctx.from);

  if (ctx.body.includes("_event_voice") && (!isUser)) {
    return ctxFn.gotoFlow(registerFlow);
  }

  if (ctx.body.includes("_event_voice") && (isUser)) {
    return ctxFn.gotoFlow(voiceflow);
  }
  if (!isUser) {
    //await ctxFn.flowDynamic(
    //  "Bienvenido a este Chabot! Para comenzar, necesito registrate!"
    //);
    return ctxFn.gotoFlow(registerFlow);
  } else {
    return ctxFn.gotoFlow(faqFlowcopia);
  }
});

export { mainFlow, }




