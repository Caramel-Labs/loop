import uvicorn


if __name__ == "__main__":
    # run Uvicorn ASGI server on port 8000
    uvicorn.run(
        "app.app:app",
        port=8000,
        reload=True,
    )
