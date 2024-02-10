import uvicorn


if __name__ == "__main__":
    # run Uvicorn ASGI server on port 8001
    uvicorn.run(
        "app.app:app",
        port=8001,
        reload=True,
    )
