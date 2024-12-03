const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get("/suggestions", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Generate five to-do list suggestions for daily tasks.",
      max_tokens: 50,
      n: 1,
    });
    const suggestions = response.data.choices[0].text.trim().split("\n").filter(Boolean);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error generating suggestions:", error.message);
    res.status(500).json({ error: "Failed to generate suggestions" });
  }
});


module.exports = router;
