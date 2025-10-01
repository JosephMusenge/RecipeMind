from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPEN_AI_KEY")

app = Flask(__name__)
CORS(app)

@app.route('/api/recommendations', methods=['POST'])
def recommend_recipes():
    data = request.get_json()
    grocery_list = data.get('groceryItems', [])

    if not grocery_list or not isinstance(grocery_list, list):
        return jsonify({'error': 'Invalid grocery items'}), 400
    
    try:
        # Generate a prompt for OpenAI
        prompt = f"Based on the following grocery items: {', '.join(grocery_list)}, suggest 3 recipes with ingredients and instructions."

        # Call OpenAI API
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=500
        )

        recipes = response.choices[0].text.strip()
        return jsonify({'recipes': recipes})
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to fetch recipe recommendations'}), 500
    

if __name__ == '__main__':
    app.run(debug=True)