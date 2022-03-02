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


class AddressAdd(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    Fullname: str = Field(...)
    Email: EmailStr = Field(...) 
    City: str = Field(...)
    Post: str = Field(...)
    Address: str = Field(...)
    
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "Fullname": "Uwiizz",
                "Email": "Uwiii@google.com",
                "City": "Jakarta Timur",
                "Post": "13950",
                "Address": "jl.pulogebang rt003/04 no.130 13950 "
            }
        }

