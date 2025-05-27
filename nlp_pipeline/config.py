import os
import google.generativeai as gen_ai

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

gen_ai.configure(api_key=GEMINI_API_KEY)
model = gen_ai.GenerativeModel("gemini-2.0-flash-exp")
