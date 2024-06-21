from flask import Flask, request, render_template, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

model = joblib.load('alzheimers_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json
    input_df = pd.DataFrame([input_data])

    input_df = input_df.apply(pd.to_numeric)

    input_scaled = scaler.transform(input_df)

    prediction = model.predict(input_scaled)[0]

    diagnosis_map = {0: "No Alzheimer's", 1: "Alzheimer's"}
    diagnosis = diagnosis_map[prediction]

    return jsonify({'diagnosis': diagnosis})

if __name__ == '__main__':
    
    app.run(debug=True)
