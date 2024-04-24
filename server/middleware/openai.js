const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
    apiKey: "apikeytoopenai",
});


const systemPrompt =
    "You are an assistant helping a user to create ballot paper quetions for elction. " +
    "Given a message , you should extract the title and description of the Quetion. " +
    "The user will provide the details like title and description and also provide any example" +
    "To compute relatives dates, assume that the current timestamp is " +
    new Date().toISOString() +
    ". ";

async function askChatGPT(question) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question },
            ],
            tools: [
                {
                    type: "function",
                    function: {
                        name: "createQuetion",
                        description: "Create a new Quetion",
                        parameters: {
                            type: "object",
                            properties: {
                                title: {
                                    type: "string",
                                    description: "The title of the job",
                                },
                                description: {
                                    type: "string",
                                    description: "The description of the job",
                                },
                            },
                        },
                    },
                },
            ],
            tool_choice: { type: "function", function: { name: "createQuetion" } },
            model: "gpt-3.5-turbo",
        });
        return chatCompletion.choices[0].message.tool_calls[0].function;
    } catch (error) {
        console.error("Error making a query: ", error);
        return null;
    }
}

async function getResponse(question) {
    const suggestion = await askChatGPT(question);
    if (suggestion) {
        return suggestion;
    } else {
        console.log("No response received from ChatGPT.");
    }
}

module.exports = getResponse;