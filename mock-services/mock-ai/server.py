import json
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = 8080
OVERLAP = 0.25

PHOTO = "Look closely at the photo"
VIDEO = "These are frames from one video"
SEGMENT = "These are frames from one segment"
FINAL_VIDEO = "descriptions of consecutive segments"
SOUND = "Listen to the sound of a video"
AUDIO = "Listen to the recording"
MUSIC = "This is a music track"
DIRECTOR = "You are the director"


def _seconds(text: str) -> list[str]:
    marker = "taken at seconds "
    start = text.find(marker)
    if start < 0:
        return []
    end = text.find(". ", start)
    chunk = text[start + len(marker) : end if end >= 0 else None]
    return [one.strip() for one in chunk.split(",") if one.strip()]


def _plan(text: str) -> dict:
    start = text.find('{"movie"')
    if start < 0:
        raise ValueError("the report is not in the request")
    report, _ = json.JSONDecoder().raw_decode(text[start:])
    shots = report.get("shots") or []
    target = float((report.get("movie") or {}).get("targetSeconds") or 0)
    each = (
        (target + OVERLAP * (len(shots) - 1)) / len(shots) if target > 0 and shots else 2.5
    )
    commands = []
    for shot in shots:
        kind = shot.get("kind")
        seconds = each if kind == "photo" else min(each, float(shot.get("durationSeconds") or each))
        commands.append(
            {
                "type": "shot",
                "itemId": shot["itemId"],
                "mediaId": shot["mediaId"],
                "kind": kind,
                "sourceStartSeconds": 0.0,
                "seconds": round(max(seconds, 0.5), 3),
                "liveLevel": 0.0 if kind == "photo" else 0.6,
                "framing": None,
                "motion": "none",
                "transitionSeconds": OVERLAP,
                "role": "portrait" if kind == "photo" else "action",
            }
        )
    total = sum(command["seconds"] for command in commands) - OVERLAP * max(len(commands) - 1, 0)
    tracks = report.get("music") or []
    if tracks and total > 0:
        track = tracks[0]
        seconds = min(float(track.get("durationSeconds") or total), total)
        fade = min(0.5, seconds)
        commands.append(
            {
                "type": "music",
                "songId": track["songId"],
                "mediaId": track["mediaId"],
                "sourceStartSeconds": 0.0,
                "seconds": round(seconds, 3),
                "atSeconds": 0.0,
                "gain": 0.8,
                "fadeInSeconds": fade,
                "fadeOutSeconds": fade,
            }
        )
    return {
        "summary": f"Mock edit: {len(shots)} shots, {'with music' if tracks else 'no music'}.",
        "commands": commands,
    }


def _answer(text: str) -> dict:
    if DIRECTOR in text:
        return _plan(text)
    if FINAL_VIDEO in text:
        return {
            "summary": "Mock: a clip from the event.",
            "description": "Mock: a detailed description of the clip.",
            "score": 5.0,
            "tags": {"mock": "video"},
        }
    if SEGMENT in text:
        return {
            "context": "Mock: the event continues.",
            "description": "Mock: a segment of the event.",
            "score": 5.0,
            "tags": {"mock": "segment", "shotSize": "medium"},
        }
    if VIDEO in text:
        return {
            "summary": "Mock: a clip from the event.",
            "description": "Mock: a detailed description of the clip.",
            "score": 5.0,
            "tags": {"mock": "video"},
            "frames": [
                {"description": f"Mock: the frame at {second} seconds.", "tags": {"mock": "frame"}}
                for second in _seconds(text)
            ],
        }
    if SOUND in text:
        return {
            "description": "Mock: the sound of the event.",
            "tags": {"mock": "sound"},
            "sounds": [],
            "words": [],
        }
    if MUSIC in text:
        return {
            "summary": "Mock: a music track.",
            "description": "Mock: a warm track with a steady beat.",
            "score": 5.0,
            "tags": {"mock": "music", "bpm": "100"},
            "sounds": [],
            "words": [],
        }
    if AUDIO in text:
        return {
            "summary": "Mock: a recording from the event.",
            "description": "Mock: voices and laughter.",
            "score": 5.0,
            "tags": {"mock": "audio"},
            "sounds": [],
            "words": [],
        }
    if PHOTO in text:
        return {
            "summary": "Mock: a frame from the event.",
            "description": "Mock: a detailed description of the frame.",
            "score": 5.0,
            "tags": {"mock": "photo"},
        }
    return {
        "summary": "Mock answer.",
        "description": "Mock answer.",
        "score": 5.0,
        "tags": {"mock": "answer"},
    }


class Handler(BaseHTTPRequestHandler):
    def do_POST(self) -> None:
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length)
        try:
            request = json.loads(body or b"{}")
            text = "\n".join(
                part.get("text", "")
                for part in request.get("input", [])
                if part.get("type") == "text"
            )
            answer = json.dumps(_answer(text), ensure_ascii=False)
        except Exception as exc:
            self._send(400, {"error": str(exc)})
            return
        usage = {
            "total_input_tokens": max(1, len(text) // 4),
            "total_output_tokens": max(1, len(answer) // 4),
        }
        usage["total_tokens"] = usage["total_input_tokens"] + usage["total_output_tokens"]
        self._send(200, {"output_text": answer, "usage": usage})

    def _send(self, status: int, payload: dict) -> None:
        data = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, format: str, *args) -> None:
        sys.stderr.write("mock-ai " + format % args + "\n")


def main() -> None:
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"mock-ai listening on :{PORT}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
