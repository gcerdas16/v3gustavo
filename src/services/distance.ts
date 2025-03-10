import axios from "axios";

const API_KEY = "AIzaSyBr6lLXaoC7U4383GVx9CaIj8ofW2knPfQ"; // Reemplaza con tu clave real
const BASE_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";

/**
 * Obtiene la distancia y el tiempo entre dos ubicaciones usando la API Distance Matrix.
 * @param origin Dirección o coordenadas de origen (ej. "9.934739,-84.087502" o "San José, Costa Rica")
 * @param destination Dirección o coordenadas de destino
 * @returns Un objeto con la distancia en km y la duración en minutos
 */
async function getDistance(origin: string, destination: string) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                origins: origin,
                destinations: destination,
                key: API_KEY,
                units: "metric", // Para obtener la distancia en kilómetros
            },
        });

        const data = response.data;

        if (data.status !== "OK") {
            throw new Error(`Error en la API: ${data.status}`);
        }

        const element = data.rows[0].elements[0];

        if (element.status !== "OK") {
            throw new Error(`No se pudo calcular la distancia: ${element.status}`);
        }

        return {
            distance_km: element.distance.value / 1000, // Convertir metros a km
            duration_min: element.duration.value / 60, // Convertir segundos a minutos
        };
    } catch (error) {
        console.error("Error obteniendo la distancia:", error);
        return null;
    }
}


export { getDistance };


