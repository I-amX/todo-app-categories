from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)

# Configure CORS for frontend deployment
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:5173",  # Vite dev server
            "https://your-frontend.vercel.app"  # Replace after deployment
        ]
    }
})

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify API status"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'message': 'Todo API is running!'
    }), 200

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Return available categories"""
    return jsonify({
        'categories': ['Work', 'Personal']
    }), 200

@app.route('/api/status', methods=['GET'])
def status():
    """Detailed status for frontend connection"""
    return jsonify({
        'api_version': '1.0.0',
        'service': 'Todo App Backend',
        'frontend_integration': 'active',
        'server_time': datetime.now().isoformat()
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)