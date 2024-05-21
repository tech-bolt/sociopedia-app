import User from "../models/userModel.js";

export default async function translateMessage(recipientId, text) {
    try {

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            throw new Error("Recipient not found");
        }
        if (!recipient.language) {
            throw new Error("Recipient language not found");
        }

        const targetLanguage = recipient.language;
        const translation = await fetch("https://trans.zillyhuhn.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: targetLanguage,
                format: "text",
                api_key: ""
            }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await translation.json();
        return data.translatedText;
    } catch (error) {
        console.error("Error in translation: ",error);
    }
}