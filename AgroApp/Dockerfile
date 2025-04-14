# Use official Python image as base
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the necessary files
COPY . /app3

# Install dependencies
RUN pip install --no-cache-dir fastapi uvicorn torch torchvision pillow numpy gdown

# Expose port 8000
EXPOSE 8000

# Run the FastAPI application
CMD ["uvicorn", "app3:app", "--host", "0.0.0.0", "--port", "8000"]
