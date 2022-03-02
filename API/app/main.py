from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .routes import router 

app = FastAPI()

# auth_handler = AuthHandler()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://172.19.63.248",
    "http://localhost:3000",
    "http://172.17.46.243:3000",
    

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, tags=["API"], prefix="/api")