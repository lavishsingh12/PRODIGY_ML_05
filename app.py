import base64
import io
import re
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import google.generativeai as genai
from fastapi.responses import JSONResponse
import json
from dotenv import load_dotenv
import os
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # genai.configure(api_key="your_api_key")  if you dont save it as your environment variable
model = genai.GenerativeModel("gemini-1.5-flash")  # WE can also use "gemini-1.5-pro"

# Let's setup FastAPI app
app = FastAPI()

# CORS setup for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageRequest(BaseModel):
    image: str

@app.post("/predict")
async def predict(request: ImageRequest):
    try:
        print("📥 Received base64 image data")

        # Let's Decode and save the image
        image_data = base64.b64decode(request.image)
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        image_path = "temp_image.jpg"
        image.save(image_path)
        print("✅ Image saved as temp_image.jpg")

        # Now Upload image to Gemini
        uploaded = genai.upload_file(image_path)
        print(f"✅ Image uploaded: {uploaded.uri}")

        # Send prompt
        prompt = """
        You are a food expert. Identify the food item in this image and provide estimated nutritional information.

        Respond in this strict JSON format only:
        {
            "food": "name",
            "calories": number,
            "carbs": number,
            "protein": number,
            "fat": number,
            "fiber": number,
            "sugar": number
        }
        """

        response = model.generate_content([prompt, uploaded])
        raw_text = response.text.strip()
        print("📨 Gemini Response:\n", raw_text)

        # Extract JSON block from raw_text using regex
        match = re.search(r"\{[\s\S]*\}", raw_text)
        if match:
            try:
                result_json = json.loads(match.group())
            except Exception as e:
                print("⚠️ JSON parsing failed:", e)
                result_json = {
                    "food": "Unknown",
                    "calories": 0,
                    "carbs": 0,
                    "protein": 0,
                    "fat": 0,
                    "fiber": 0,
                    "sugar": 0,
                }
        else:
            print("⚠️ No JSON found in Gemini output.")
            result_json = {
                "food": "Unknown",
                "calories": 0,
                "carbs": 0,
                "protein": 0,
                "fat": 0,
                "fiber": 0,
                "sugar": 0,
            }

        return JSONResponse(content=result_json)


    except Exception as e:
        print("❌ Error:", e)
        return {
            "food": "Unknown",
            "calories": 0,
            "carbs": 0,
            "protein": 0,
            "fat": 0,
            "fiber": 0,
            "sugar": 0,
        }
