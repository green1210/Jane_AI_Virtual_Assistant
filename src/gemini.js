import { GoogleGenAI } from '@google/genai';


 const GEMINI_API_KEY="AIzaSyCV7Jba2EHOp-vnuJeiy-Ja7UlTG3vrzMQ";

async function main(prompt) {
    const ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY,
    });

    const tools = [
        {
            googleSearch: {
            }
        },
    ];
    const config = {
        thinkingConfig: {
            thinkingLevel: 'medium',
        },
        tools,
        maxOutputTokens: 150,
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
        presencePenalty: 0,
        frequencyPenalty: 0,
        
    };

    const model = 'gemini-2.5-flash';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];

    console.log(`Sending request to ${model}...`);
    const responseStream = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });


    let fullResponse = '';
    for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        if (chunkText) {
            fullResponse += chunkText;
        }
    }
       const response=fullResponse;
       return response;
}

export default main;