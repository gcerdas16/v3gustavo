import { sendVoiceFlow } from "./list_templates/sendVoiceFlow";
import { sendImageFlow } from "./list_templates/sendImageFlow";
import { sendPdfFlow } from "./list_templates/sendPdfFlow";
//import { DetectIntention } from "./intention.flow";
import { registerFlow } from "./registerFlow";
import { createFlow } from "@builderbot/bot";
import { mainFlow } from "./mainFlow";
//import { menuFlow } from "./menuFlow";
import { faqFlow } from "./faqFlow";
import { voiceflow } from "./voiceflow";
import { gastosflow } from "./leerexcel";
import { faqFlow2 } from "./faqFlow2";
import { locationflowhere } from "./location";
import { editarPedidoFlow, flowInfo, flowpedidofinal } from "./flowpedidos";
import { faqFlowcopia } from "./faqFlow copy";



export default createFlow([
    mainFlow,
    faqFlow,
    voiceflow,
    registerFlow,
    sendImageFlow,
    sendPdfFlow,
    sendVoiceFlow,
    gastosflow,
    faqFlow2,
    locationflowhere,
    flowpedidofinal,
    flowInfo,
    editarPedidoFlow,
    faqFlowcopia
]);