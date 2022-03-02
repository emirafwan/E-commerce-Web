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


class AddProduct(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    branch:str = Field(...)
    name: str = Field(...)
    description: str = Field (...)
    price: float = Field(...)
    image: str = Field(...) 

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "branch":"ckg",
                "name": "Shoe",
                "description": "running Shoes.",
                "price": 10,
                "image": "https://media.istockphoto.com/photos/running-shoes-picture-id1249496770?b=1&k=20&m=1249496770&s=170667a&w=0&h=_SUv4odBqZIzcXvdK9rqhPBIenbyBspPFiQOSDRi-RI=",
            }
        }

class AllProduct(AddProduct):
    pass

class ProductUpdate(AddProduct):
    pass

class ProductDelete(AddProduct):
    pass




# format = [
    {"branch":"ckg", "name":"Magic-Mouse", "description":"magic mouse with 1ms response time.", "price":50, "image":"https://macstore.id/konten/uploads/2018/08/MRME2_AV1-1.jpg"}
    {"branch":"ckg", "name": "Bi-Headphone", "description":"comfort way to hear music", "price":15,"image": "https://i5.walmartimages.com/asr/4fe97836-61ac-43f4-9435-549ea693e793_1.b71a34c39acf22b59157d031ffac43e2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"}

    {"branch":"ckg", "name":"Minyak goreng", "description":"minyak goreng Bimoli 2 Liter", "price":2, "image": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/1/21/941cce47-8898-41e0-be56-a973b36d77df.jpg"}
    {"branch":"ckg", "name":"Gula Pasir", "description":"GULAKU Premium Gula Pasir 1 kg", "price":1, "image": "https://www.kiozorenz.com/image-product/img4918-1586591386.jpg"}
    {"branch":"ckg", "name":"Mentega", "description":"Blue Band Mentega [200gr].", "price":3, "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//90/MTA-7138125/blue_band_blue_band_mentega_serbaguna_-200gr-_full05_d3e66wvi.jpg"}
    {"branch":"ckg", "name":"Saos Pedas", "description":"ABC Saus Pedas [335 mL].", "price":0.4, "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-12133651/abc_saus_sambal_abc_sambal_asli_sauce_saos_sambal_335ml_full02_faksfc3z.jpg"}
    {"branch":"ckg", "name":"Kecap", "description":"Kecap Bango 135ml.", "price":1, "image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/MTA-11707649/bango_bango_kecap_manis_275_ml_full02_k45lbfna.jpeg"}
    {"branch":"ckg", "name":"Garam", "description":"Refina Garam Meja Reffil 250 Gr.", "price":0.5,"image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//89/MTA-11324276/refina_refina-garam-meja-reffil-250-gr_full01.jpg"}
    {"branch":"ckg", "name":"Saos Tomat", "description":"ABC Saus Tomat [335 mL].", "price":0.3,"image": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-3939155/abc_abc_saus_tomat_335ml_full02.jpg"}
# ]