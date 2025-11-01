from sqlalchemy import Column, Integer, String, Float, Boolean, JSON, DateTime
from sqlalchemy.sql import func
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    images = Column(JSON, nullable=False)  # List of image URLs
    badge = Column(String, nullable=True)
    inStock = Column(Boolean, default=True)
    featured = Column(Boolean, default=False)
    specifications = Column(JSON, default={})
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), onupdate=func.now(), default=func.now())
