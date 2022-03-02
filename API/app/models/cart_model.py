from typing import Optional
from pydantic import BaseModel, SecretStr, Field, EmailStr
from datetime import date, datetime, time, timedelta
from bson.objectid import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class AddCart(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    productId: str = Field(...)
    quantity: int = Field(...)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "productId":"6200b87aaa8e783802ed6dd8",
                "quantity": 1,
            }
        }
        
class FindCartById(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "_id":"6201283a9d6f087e58787e0c"
            }
        }
    

class UpdateQuantityCart(FindCartById):
    quantity: int = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "_id":"6201283a9d6f087e58787e0c",
                "quantity": 12,
            }
        }

class AllCart(AddCart):
    branch:str = Field(...)
    name: str = Field(...)
    description: str = Field (...)
    price: float = Field(...)
    image: str = Field(...) 
    
class TotalCart(BaseModel):
    price: float = Field(...)
    quantity: int = Field(...)

class TotalPrice(BaseModel):
    price: float = Field(...)

class TotalQuantity(BaseModel):
    quantity: int = Field(...)







class SalesReport(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    description: str = Field (...)
    price: float = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Shoe",
                "description": "running Shoes.",
                "price": 10
            }
        }