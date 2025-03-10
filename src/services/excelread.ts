import { google } from "googleapis";
import { sheets_v4 } from "googleapis/build/src/apis/sheets";
import { config } from "../config";

class SheetManagerGustavo {
    private sheets: sheets_v4.Sheets;
    private spreadsheetId: string;

    constructor(spreadsheetId: string, privateKey: string, clientEmail: string) {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                private_key: privateKey,
                client_email: clientEmail,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        this.sheets = google.sheets({ version: "v4", auth });
        this.spreadsheetId = spreadsheetId;
    }

    // Función para obtener las preguntas/respuestas invertidas
    async getUserConv(range) {
        try {
            const result = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range // Asumiendo que las preguntas están en A y respuestas en B
            });

            const rows = result.data.values;
            if (!rows || rows.length === 0) {
                return [];
            }

            // Tomar las últimas preguntas/respuestas (hasta un máximo de 3) y revertir el orden
            const lastConversations = rows.slice(-20).reverse();

            // Formatear las respuestas en el formato solicitado
            const formattedConversations = [];
            for (let i = 0; i < lastConversations.length; i++) {
                const [userQuestion, assistantAnswer] = lastConversations[i];
                formattedConversations.push(
                    { role: "user", content: userQuestion },
                    { role: "assistant", content: assistantAnswer }
                );
            }

            return formattedConversations;
        } catch (error) {
            console.error("Error al obtener la conversación del usuario:", error);
            return [];
        }
    }

    // Función para agregar una conversación al inicio de la pestaña del usuario
    async addConverToUser(range, conversation: { role: string, content: string }[]): Promise<void> {
        try {
            const question = conversation.find(c => c.role === "user")?.content;
            const answer = conversation.find(c => c.role === "assistant")?.content;
            const date = new Date().toISOString(); // Fecha en formato UTC

            if (!question || !answer) {
                throw new Error("La conversación debe contener tanto una pregunta como una respuesta.");
            }

            // Leer las filas actuales para empujarlas hacia abajo
            const sheetData = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range
            });

            const rows = sheetData.data.values || [];

            // Agregar la nueva conversación en la primera fila
            rows.unshift([question, answer, date]);

            // Escribir las filas de nuevo en la hoja
            await this.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range,
                valueInputOption: 'RAW',
                requestBody: {
                    values: rows,
                },
            });

        } catch (error) {
            console.error("Error al agregar la conversación:", error);
        }
    }



    async readSheetGustavo(range) {

        try {
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId, range
            });
            const rows = response.data.values; // Extracts the rows from the response.
            return rows; // Returns the rows.
        } catch (error) {
            console.error('error', error); // Logs errors.
        }
    }

}
export default new SheetManagerGustavo(
    config.spreadsheetId,
    config.privateKey,
    config.clientEmail
);