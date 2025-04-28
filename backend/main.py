from fastapi import FastAPI
from routes import user_routes
import uvicorn

app = FastAPI()

# Include your API routes
app.include_router(user_routes.router, prefix="/api/users")

@app.get("/")
def root():
    return {"message": "Smart Home Simulator API is running 🚀"}

"""
@app.post("...")

# Optional for testing locally:
# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
"""