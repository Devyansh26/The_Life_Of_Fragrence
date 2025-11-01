from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Base, SessionLocal, engine
import models, schemas, utils
import cloudinary
import cloudinary.uploader
import os
import json

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "hello"}

# 🧩 ADMIN LOGIN
@app.post("/login")
def login(request: schemas.LoginRequest):
    if request.username == utils.ADMIN_USERNAME and request.password == utils.ADMIN_PASSWORD:
        token = utils.create_access_token({"sub": request.username})
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# 🧩 ADMIN — ADD PRODUCT
@app.post("/upload", response_model=schemas.ProductResponse)
def upload_product(
    name: str = Form(...),
    category: str = Form(...),
    price: float = Form(...),
    description: str = Form(...),
    badge: str = Form(None),
    inStock: bool = Form(True),
    featured: bool = Form(False),
    specifications: str = Form("{}"),
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
    user=Depends(utils.verify_token)
):
    image_urls = []
    for file in files:
        upload_result = cloudinary.uploader.upload(file.file, folder=f"tlof/{category}")
        image_urls.append(upload_result.get("secure_url"))

    new_product = models.Product(
        name=name,
        category=category,
        price=price,
        description=description,
        badge=badge,
        inStock=inStock,
        featured=featured,
        specifications=json.loads(specifications),
        images=image_urls
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# 🧩 PUBLIC — GET ALL PRODUCTS
@app.get("/manage", response_model=list[schemas.ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

# 🧩 PUBLIC — GET SINGLE PRODUCT BY ID
@app.get("/products/{product_id}", response_model=schemas.ProductResponse)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# 🧩 ADMIN — UPDATE PRODUCT
@app.put("/products/{product_id}", response_model=schemas.ProductResponse)
def update_product(
    product_id: int,
    name: str = Form(None),
    category: str = Form(None),
    price: float = Form(None),
    description: str = Form(None),
    badge: str = Form(None),
    inStock: bool = Form(None),
    featured: bool = Form(None),
    specifications: str = Form(None),
    files: list[UploadFile] = File(None),
    db: Session = Depends(get_db),
    user=Depends(utils.verify_token)
):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Update only provided fields
    if name is not None: product.name = name
    if category is not None: product.category = category
    if price is not None: product.price = price
    if description is not None: product.description = description
    if badge is not None: product.badge = badge
    if inStock is not None: product.inStock = inStock
    if featured is not None: product.featured = featured
    if specifications is not None: product.specifications = json.loads(specifications)

    if files:
        image_urls = []
        for file in files:
            upload_result = cloudinary.uploader.upload(file.file, folder=f"tlof/{category or product.category}")
            image_urls.append(upload_result.get("secure_url"))
        product.images = image_urls

    db.commit()
    db.refresh(product)
    return product

# 🧩 ADMIN — DELETE PRODUCT
@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), user=Depends(utils.verify_token)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return {"message": f"Product '{product.name}' deleted successfully"}
