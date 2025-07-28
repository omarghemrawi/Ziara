import os
from flask import Flask, request, jsonify
# from openai import OpenAI # REMOVE THIS LINE
import google.generativeai as genai # ADD THIS LINE
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Google Generative AI with API key from environment variable
# genai.configure(api_key=os.getenv("OPENAI_API_KEY")) # Or you might want to rename it to GEMINI_API_KEY
genai.configure(api_key=os.getenv("GEMINI_API_KEY")) # Recommended to use a new env variable name

# Initialize the Gemini model
# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) # REMOVE THIS LINE
model = genai.GenerativeModel('models/gemini-1.5-flash') # USE 'gemini-pro' for text-only, or other models as needed

@app.route('/list_models', methods=['GET'])
def list_gemini_models():
    try:
        available_models = []
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                available_models.append(m.name)
        return jsonify({"available_gemini_models_for_generateContent": available_models})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    if not user_message:
        return jsonify({"response": "No message provided."}), 400

    print(f"Received message: {user_message}")

    try:
        # Define the system prompt/safety settings to guide the AI's behavior
        # This is CRUCIAL for enforcing your Lebanon-only and topic-specific constraints.
        # Gemini does not use a 'system' role like OpenAI. You incorporate it into the prompt.
        system_context = (
            "You are an AI assistant specialized in providing information about tourism, religious places, "
            "restaurants, and food ONLY within Lebanon. "
            "Your primary goal is to help users discover places to visit, famous foods, and restaurants "
            "specifically in Lebanon. "
            "If a user asks a question that is NOT related to Lebanon, or is outside the scope of "
            "touristic places, religious sites, restaurants, or food (e.g., asking about politics, "
            "other countries, general knowledge, or personal advice), you MUST politely inform the user "
            "that you can only provide information about Lebanon's tourism, religious sites, "
            "restaurants, and food. "
            "Do not answer questions about other countries. Be concise and helpful. "
            "Based on the following user query, provide a detailed response:\n\n"
        )

        # Send the combined prompt to the Gemini model
        # The content structure for Gemini API calls is slightly different
        response = model.generate_content(system_context + user_message)
        ai_response = response.text.strip() # Access the text content

        print(f"AI raw response: {ai_response}")

        return jsonify({"response": ai_response})

    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        # Consider more specific error handling if needed
        return jsonify({"response": "Sorry, I am currently unable to process your request. Please try again later."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
