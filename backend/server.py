from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from supabase import create_client, Client


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Supabase connection
supabase_url = os.environ['SUPABASE_URL']
supabase_key = os.environ['SUPABASE_SERVICE_KEY']
supabase: Client = create_client(supabase_url, supabase_key)

# Create the main app without a prefix
app = FastAPI(title="Lucas Azaro Consulting API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# --------- Models ---------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    service: str = Field(..., max_length=80)
    message: str = Field(..., min_length=5, max_length=4000)
    locale: Optional[str] = Field(default="en", max_length=4)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    service: str
    message: str
    locale: Optional[str] = "en"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# --------- Routes ---------
@api_router.get("/")
async def root():
    return {"message": "Lucas Azaro Consulting API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = {
        "id": status_obj.id,
        "client_name": status_obj.client_name,
        "timestamp": status_obj.timestamp.isoformat(),
    }
    result = supabase.table("status_checks").insert(doc).execute()
    if result.data:
        row = result.data[0]
        if isinstance(row.get("timestamp"), str):
            row["timestamp"] = datetime.fromisoformat(row["timestamp"])
        return StatusCheck(**row)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    result = supabase.table("status_checks").select("*").order("timestamp", desc=True).limit(1000).execute()
    rows = result.data or []
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    try:
        obj = Contact(**payload.model_dump())
        doc = {
            "id": obj.id,
            "name": obj.name,
            "email": obj.email,
            "company": obj.company,
            "service": obj.service,
            "message": obj.message,
            "locale": obj.locale,
            "created_at": obj.created_at.isoformat(),
        }
        result = supabase.table("contact_requests").insert(doc).execute()
        if result.data:
            row = result.data[0]
            if isinstance(row.get("created_at"), str):
                row["created_at"] = datetime.fromisoformat(row["created_at"])
            return Contact(**row)
        return obj
    except Exception as e:
        logger.exception("create_contact failed")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts():
    result = supabase.table("contact_requests").select("*").order("created_at", desc=True).limit(500).execute()
    rows = result.data or []
    for r in rows:
        if isinstance(r.get("created_at"), str):
            r["created_at"] = datetime.fromisoformat(r["created_at"])
    return rows


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
