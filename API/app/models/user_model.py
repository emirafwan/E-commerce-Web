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


class UserRegister(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str = Field(...)
    email: EmailStr = Field(...) 
    password: str = Field(...)
    districs: str = Field(...)
    post_code: str = Field(...)
    
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "Uwiizz",
                "email": "Uwiii@google.com",
                "password": "Password Here.",
                "districs": "cakung",
                "post_code": "13950"
            }
        }

class UserLogin(BaseModel):
    username:str = Field(...)
    password:str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "username": "Uwiizz",
                "password": "Password Here."
            }
        }

class UserUpdate(UserLogin):
    pass
    
class UserDelete(UserLogin):
    pass

def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }


