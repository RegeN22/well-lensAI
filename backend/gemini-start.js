import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyBzfw8a69jWdmLa46WdBesTLQzaEOQnmAw")
async function run(ingredients = ['water',"milk","apple","banana","cement","lead","beer"],allergies = ["milk"]) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    // let onlyRating = "answer with the number ONLY. no other words."
    // let onlyRating2 = "answer with the object, then ':', then the rating ONLY."
    // let oneSentence = "answer with only one sentence explaining it. no other words."
    // let rateObject = "rate the next objects on a 1-10 scale based on nutritional value and health cons."
    // let allergicTo = "including the fact that a person is allergic to ";
    // let allergiesInSentence = allergies[0] !== "nothing" ? `${allergicTo} ${allergies.join(",")}.` : "";
    // let currentObject = `the objects are ${ingredients.join(",")}.`;
    let return0 = `
          determine if a product is healthy for a person pr not.
          this is the list of ingredients:${ingredients.join(',')}.
          PAY ATTENTION to the fact that the person is allergic to:${allergies.join(',')}.
          for each ingredient rate it on a scale of 1-10 based on nutritional value and health cons.
          if the person is allergic to said ingredient return 0.
          based on the ratings you gave ,make an average for the entire product  if he is allergic to one of the products that average is 0 and return 'product': rating
                    `;


    const result = await model.generateContent([
      `${return0}`
      ,
       //{inlineData: {data: Buffer.from(fs.readFileSync('path/to/image.png')).toString("base64"), 
       //mimeType: 'image/png'}}
    ]
    );
    console.log(result.response.text());
  }
  run();
    // setInterval(() =>run(), 2000)
