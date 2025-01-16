from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


app = FastAPI()
app.mount("/popup", StaticFiles(directory="popup", html=True), name="popup")


@app.get("/")
def read_root():
    return "asdasd"

@app.get("/manifest.json")
def get_manifest():
    return FileResponse("manifest.json", media_type="application/json")


if __name__ == '__main__':
    import uvicorn
    uvicorn.run("server:app", reload=True)

