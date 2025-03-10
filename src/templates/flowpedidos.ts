import { addKeyword, EVENTS } from "@builderbot/bot";
import { idleFlow, reset, start, stop } from "~/services/idle";

// Flujo para mostrar la información final del pedido
const flowInfo = addKeyword("hello")
    .addAnswer(
        'Your info:',
        null,
        async (_, { flowDynamic, state }) => {
            const data = state.getMyState();
            await flowDynamic(`*Name:* ${data.name}\n*Pedido:* ${data.cantidadysabores}`);
        }
    );

// Flujo principal de pedido final
const flowpedidofinal = addKeyword("hello")
    .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, 300000))
    .addAnswer(
        "What's your name?",
        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, 300000);
            await state.update({ name: ctx.body });
        }
    )
    .addAnswer(
        "¿Qué sabores y cantidad va a querer?",
        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, 300000);
            await state.update({ cantidadysabores: ctx.body });
        }
    )
    .addAnswer(
        "¿Quiere editar su pedido?",
        { capture: true },
        async (ctx, { state, gotoFlow, endFlow, fallBack }) => {
            // Se actualiza el estado (puedes cambiar la clave si no es 'email')
            await state.update({ email: ctx.body });
            reset(ctx, gotoFlow, 300000);
            switch (ctx.body.trim().toLowerCase()) {
                case "si":
                    stop(ctx);
                    return gotoFlow(editarPedidoFlow);  // Redirige al flujo de edición
                case "no":
                    stop(ctx);
                    return gotoFlow(flowInfo);            // Muestra la info final
                default:
                    return fallBack(`Solo acepto "Si" o "No" como respuestas.`);
            }
        }
    );

// Flujo para editar el pedido (por ejemplo, volver a preguntar los sabores y cantidad)
const editarPedidoFlow = addKeyword("editar")
    .addAnswer(
        "Entendido. Por favor, indique nuevamente qué sabores y cantidad desea:",
        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, 300000);
            await state.update({ cantidadysabores: ctx.body });
            // Una vez editado, se muestra la información final nuevamente
            return gotoFlow(flowInfo);
        }
    );

export { flowpedidofinal, flowInfo, editarPedidoFlow };
