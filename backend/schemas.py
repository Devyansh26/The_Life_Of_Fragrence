
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    category: str
    price: float
    description: str
    images: List[str]
    badge: Optional[str] = None
    inStock: bool = True
    featured: bool = False
    specifications: Optional[Dict[str, str]] = {}

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None
    badge: Optional[str] = None
    inStock: Optional[bool] = None
    featured: Optional[bool] = None
    specifications: Optional[Dict[str, str]] = None

class ProductResponse(ProductBase):
    id: int
    createdAt: datetime
    updatedAt: datetime

    class Config:
        orm_mode = True


class LoginRequest(BaseModel):
    username: str
    password: str
