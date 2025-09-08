from flask import Flask
from flask_cors import CORS
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, origins=["https://sign-lang-beta.vercel.app"])

    from .routes import main
    app.register_blueprint(main)

    return app