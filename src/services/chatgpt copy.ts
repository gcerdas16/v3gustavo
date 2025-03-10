import OpenAI from "openai";

const openaiApiKey = process.env.ApiKey;

const chat = async (prompt, text) => {
    try {
        const openai = new OpenAI({
            apiKey: openaiApiKey,
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: text },
            ],
        });
        const answ = completion.choices[0].message.content
        return answ;
    } catch (err) {
        console.error("Error al conectar con OpenAI:", err);
        return "ERROR";
    }
};

export { chat };
