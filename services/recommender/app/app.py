from fastapi import FastAPI
from routes.router import router
from fastapi.middleware.cors import CORSMiddleware

# instantiate FastAPI app
app = FastAPI()

# setup router
app.include_router(router)

# define allowed origins for CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
]

# setup CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
