import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GENERATIVE_AI_API_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const responseSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      title: { type: "string" },
      content: { type: "string" },
    },
  },
};

export function useGenAI() {
  const getBabyDetails = async (userPrompt: string) => {
    try {
      const fullPrompt = `
          ${userPrompt}
  
  Please provide your response in the following JSON format:
  ${JSON.stringify(responseSchema, null, 2)}
  
  Ensure that your response is a valid JSON array of objects, each containing 'title', and 'content' fields.
  `;

      const result = await model.generateContent(fullPrompt);
      const textResponse = result.response.candidates[0].content.parts[0].text;

      // Extract JSON from the response text
      const jsonStartIndex = textResponse.indexOf("{");
      const jsonEndIndex = textResponse.lastIndexOf("}") + 1;
      const jsonString = textResponse.substring(jsonStartIndex, jsonEndIndex);

      // Parse the JSON string and return the `items` array
      const jsonResponse = JSON.parse(jsonString);
      return jsonResponse.items;
    } catch (err) {
      console.error("Error generating content:", err);
      throw err;
    }
  };

  function generatePrenatalInfoPrompt(prenatalData: {
    gestationalAge: string;
    gender: string;
    multiplePregnancy: string;
  }): string {
    return `
        Based on the following information about a pregnancy:
        - Gestational Age: ${prenatalData.gestationalAge}
        - Gender: ${prenatalData.gender}
        - Multiple Pregnancy: ${prenatalData.multiplePregnancy}
    
        Please provide the following information in a short and direct manner:
        1. Estimated size of the baby (or babies)
        2. Key developmental milestones at this stage
        3. What the mother might be experiencing
        All in a short sentence max 7 words.
    
        Respond in the following JSON format:
        {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": { "type": "string" },
              "content": { "type": "string" }
            }
          }
        }
    
        Where:
        - 'title' is the category (e.g., "Baby Size", "Development", "Maternal Experience")
        - 'content' is a direct statemnt, e.g 20grams, "Baby can now hear", "Mother may experience morning sickness"
      `;
  }

  return { getBabyDetails, generatePrenatalInfoPrompt };
}
