import os, time, random, smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

SMTP_SERVER = "smtp-relay.brevo.com"
SMTP_PORT = 587
SMTP_LOGIN = os.getenv("BREVO_SMTP_LOGIN")
SMTP_PASSWORD = os.getenv("BREVO_SMTP_PASSWORD")
SENDER = "no-reply@muvr-u.com"
SENDER_NAME = "Muvr"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SendOTPReq(BaseModel):
    email: str

class VerifyOTPReq(BaseModel):
    email: str
    code: str

OTPS = {}          # { email: (code, expires_at) }
LAST_SEND = {}     # { email: last_timestamp }


def send_email(recipient: str, subject: str, body: str):
    if not (SMTP_LOGIN and SMTP_PASSWORD):
        raise RuntimeError("SMTP credentials not set")
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = formataddr((SENDER_NAME, SENDER))
    msg["To"] = recipient
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=8) as s:
        s.starttls()
        s.login(SMTP_LOGIN, SMTP_PASSWORD)
        s.sendmail(SENDER, [recipient], msg.as_string())


@app.post("/send-otp")
def send_otp(req: SendOTPReq, background: BackgroundTasks):
    email = req.email.strip().lower()
    now = time.time()
    if now - LAST_SEND.get(email, 0) < 45:
        raise HTTPException(status_code=429, detail="Too many requests. Try again soon.")
    code = f"{random.randint(0, 999999):06d}"
    expires = now + 300  # 5 minutes
    OTPS[email] = (code, expires)
    LAST_SEND[email] = now

    body = (
        "Dear user,\n\n"
        f"Your one-time password (OTP) for login is: {code}\n"
        "This code is valid for 5 minutes.\n\n"
        "For your security, please do not share this code with anyone.\n"
        "If you did not request this OTP, you can safely ignore this message.\n\n"
        "Thank you,\n"
        "The Muvr Team"
    )
    background.add_task(send_email, email, "Your OTP Code", body)
    return {"ok": True}


@app.post("/verify-otp")
def verify_otp(req: VerifyOTPReq):
    email = req.email.strip().lower()
    code = req.code.strip()
    pair = OTPS.get(email)
    if not pair:
        raise HTTPException(status_code=400, detail="No OTP sent.")
    saved_code, exp = pair
    if time.time() > exp:
        del OTPS[email]
        raise HTTPException(status_code=400, detail="OTP expired.")
    if code != saved_code:
        raise HTTPException(status_code=400, detail="Invalid OTP.")
    del OTPS[email]
    return {"ok": True}
