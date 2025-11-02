from flask import Flask, render_template, jsonify
import random
from datetime import datetime

app = Flask(__name__)

# Fake Data Generation
statuses = ["Normal Driving", "Likely Rash Driving (Sudden Braking)", "Likely Rash Driving (Aggressive Turning)"]

@app.route('/')
def index():
    return render_template('mis.html')

@app.route('/generate-fake-data', methods=['GET'])
def generate_fake_data():
    fake_data = []
    for i in range(20):  # Generate 20 fake records
        record = {
            "driverId": f"DR{i+1:03}",
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "drivingStatus": random.choice(statuses),
            "accelX": round(random.uniform(-20, 20), 2),
            "accelY": round(random.uniform(-20, 20), 2),
            "accelZ": round(random.uniform(-20, 20), 2)
        }
        fake_data.append(record)
    return jsonify(fake_data)

if __name__ == '__main__':
    app.run(debug=True)
                                                        