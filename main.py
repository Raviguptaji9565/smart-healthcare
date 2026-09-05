import os
import sys

# Ensure backend directory is in sys.path so 'app' imports work from both root and backend directory
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.main import app  # noqa: F401
