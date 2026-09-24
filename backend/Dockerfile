# Use lightweight Python 3.11/3.12 base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application and models
COPY . .

# Expose port (default 8000)
EXPOSE 8000

# Start Uvicorn server (reads PORT dynamically from environment if set)
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
