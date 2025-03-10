import { addKeyword, EVENTS } from "@builderbot/bot";
import { getDistance } from "~/services/distance";
import axios from "axios";

const locationflowhere = addKeyword(EVENTS.LOCATION)
    .addAnswer(`Gracias por tu ubicaciones`, null, async (ctx, { endFlow, flowDynamic, gotoFlow }) => {
        const API_KEY = "AIzaSyBr6lLXaoC7U4383GVx9CaIj8ofW2knPfQ"; // Reemplaza con tu clave real
        const userLatitude = ctx.message.locationMessage.degreesLatitude;
        const userLongitude = ctx.message.locationMessage.degreesLongitude;
        const locationString = `${userLatitude}, ${userLongitude}`;


        try {
            const NegocioAdress = `9.943800119587424, -84.12791591770406`
            const ClienteAdress = locationString
            const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${ClienteAdress}&destinations=${NegocioAdress}&key=${API_KEY}`;

            const responsedistancia = await axios.get(apiUrl);


            const data = responsedistancia.data;
            console.log(responsedistancia.data);
            console.log(responsedistancia.data.rows[0].elements)
        } catch (error) {
            console.log(error)
        }
    })

export { locationflowhere };

