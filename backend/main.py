import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from analyzer import analyze  # noqa: E402

app = FastAPI(title="LinkedIn Post Optimizer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


@app.post("/api/analyze")
async def analyze_post(
    post_text: str = Form(...),
    files: Optional[list[UploadFile]] = File(default=None),
):
    if not post_text.strip():
        raise HTTPException(status_code=422, detail="Post text cannot be empty.")

    file_data: list[tuple[str, bytes, str]] = []
    if files:
        for f in files:
            content_type = f.content_type or "application/octet-stream"
            if not (content_type.startswith("image/") or content_type == "application/pdf"):
                raise HTTPException(
                    status_code=422,
                    detail=f"Unsupported file type '{content_type}'. Upload images or PDFs only.",
                )
            raw = await f.read()
            file_data.append((f.filename or "file", raw, content_type))

    try:
        result = analyze(post_text, file_data)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e)) from e
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e)) from e

    return result
