from fastapi import FastAPI

app = FastAPI(title="u-academy API", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to u-academy API"}

from app.api.v1.api_router import api_router
app.include_router(api_router, prefix="/api/v1")
