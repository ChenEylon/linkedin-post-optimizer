# LinkedIn Post Optimizer

AI-powered tool that grades your LinkedIn post, identifies weak spots, and rewrites it — grounded in real posts that hit 5K–15K likes.

## What it does

Paste your post (and optionally attach a carousel PDF or image), and get back:

- **Score & grade** (0–100, A–F) across 6 categories
- **Category breakdown** — hook, structure, CTA, emotional resonance, hashtags, length
- **Weak spots** — annotated issues with high/medium/low severity and a specific fix for each
- **Full rewrite** — improved version in your voice, with a copy button

## Stack

- **Backend:** FastAPI + Anthropic Claude (claude-sonnet-4-6) with vision
- **Frontend:** React + TypeScript + Vite + Tailwind CSS

---

## Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### 1. Clone the repo

```bash
git clone https://github.com/ChenEylon/linkedin-post-optimizer.git
cd linkedin-post-optimizer
```

### 2. Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` and add your key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Start the server:

```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**.

---

## Usage

1. Paste your LinkedIn post into the textarea
2. Optionally drag and drop a carousel PDF or image
3. Click **Analyze Post**
4. Review the score, weak spots, and rewrite (~10–20 seconds)
5. Copy the improved post with one click

## File upload support

| Type | What Claude analyzes |
|---|---|
| Images (JPG, PNG, etc.) | Visual content, layout, text in image |
| PDF (carousel) | Each slide (up to 10 pages) — structure, cover hook, CTA slide |
