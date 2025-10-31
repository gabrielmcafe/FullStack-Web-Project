import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'asdf#FGSgvasgf$5$WGT'
    
    # Usar SQLite para compatibilidade universal
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
