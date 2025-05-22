// Replace YOUR_API_KEY_HERE with your actual OpenAI API key
const OPENAI_API_KEY = "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";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("textGenForm");
  const input = document.getElementById("input1");
  const result = document.getElementById("result1");
  const error = document.getElementById("error1");
  const spinner = document.getElementById("spinner1");
  const btn = document.getElementById("btn1");
  const clearBtn = document.getElementById("clearBtn");

  function showSpinner(show) {
    spinner.style.display = show ? "block" : "none";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    error.textContent = "";
    result.textContent = "";

    const prompt = input.value.trim();
    if (!prompt) {
      error.textContent = "Please enter a prompt!";
      return;
    }

    btn.disabled = true;
    showSpinner(true);

    try {
      // Call OpenAI API for text generation
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.choices?.[0]?.message?.content?.trim();

      if (!generatedText) {
        throw new Error("No response from API");
      }

      result.textContent = generatedText;

    } catch (err) {
      error.textContent = "Error: " + err.message;
    } finally {
      btn.disabled = false;
      showSpinner(false);
    }
  });

  // Clear button event to reset input, output and error messages
  clearBtn.addEventListener("click", () => {
    input.value = "";
    result.textContent = "";
    error.textContent = "";
  });
});
