from fastapi import FastAPI

app = FastAPI(title="u-academy API", version="1.0.0")

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.db.session import engine
from app.db.base import Base

Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "U-Academy API'ye Hoş Geldiniz"}

from app.api.v1.api_router import api_router
app.include_router(api_router, prefix="/api/v1")
