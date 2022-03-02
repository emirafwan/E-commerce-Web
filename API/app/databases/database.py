from .config_database import *
from bson.objectid import ObjectId
from fastapi.encoders import jsonable_encoder

from ..auth import AuthHandler
from ..models.cart_model import *
from ..models.address_model import *

auth_handler = AuthHandler()


#user client
async def registerUser(user_data):
    user_data = jsonable_encoder(user_data)
    user_data["password"]= auth_handler.get_password_hash(user_data["password"])
    check_username = await userCOl.find_one({"username":user_data["username"]})
    if check_username:
        return False
    else:
        regis = await userCOl.insert_one(user_data)
        response = await userCOl.find_one({"_id":regis.inserted_id})
        return response

async def loginUser(user_data):
    user_data = jsonable_encoder(user_data)
    check_username = await userCOl.find_one({"username":user_data["username"]} ,{"_id":0})
    if check_username and auth_handler.verify_password(user_data["password"], check_username["password"]):
        token = auth_handler.encode_token(user_data['username'])
        return {"token":token}
    else: 
        return False

# async def fetch_one_user(username):
#     response = await userCOl.find_one({"username": username})
#     return response

async def fetch_one_user(username):
    response = await userCOl.find_one({"username": username})
    token = auth_handler.encode_token(response['username'])
    return token

async def updateUser(user_data):
    user_data = jsonable_encoder(user_data)
    user_data["password"]= auth_handler.get_password_hash(user_data["password"])
    update = await userCOl.update_one({"username": user_data["username"]}, {"$set": {"password": user_data["password"]}})
    result = await userCOl.find_one({"username":user_data["username"]})
    return result
    
async def deleteUser(username):
    check_username = await userCOl.find_one({"username":username})
    if check_username:
        result = await userCOl.delete_one({"username":username})
        return "success"
    else:
        return False


#product
async def addProduct(product_data):
    product_data = jsonable_encoder(product_data)
    add = await productCOl.insert_one(product_data)
    response = await productCOl.find_one({"_id":add.inserted_id})
    return response

async def fetchAll():
    response = productCOl.find({})
    if response:
        return response
    else:
        return False 

async def updateProduct(product_data):
    product_data = jsonable_encoder(product_data)
    update = await productCOl.update_one({"name": product_data["name"]}, {"$set": {"price": product_data["price"]}})
    result = await productCOl.find_one({"name":product_data["name"]})
    return result
    
async def deleteProduct(name):
    check_username = await productCOl.find_one({"name":name})
    if check_username:
        result = await productCOl.delete_one({"name":name})
        return "success"
    else:
        return False


#cart
async def addCart(cart_data):
    carts = []
    total = 0
    findproductbyid = await productCOl.find_one({"_id":cart_data.productId},{"_id":0})
    findproductbyid.update({"productId":cart_data.productId, "quantity":cart_data.quantity})
    add = await cartCOl.insert_one(findproductbyid)
    response = cartCOl.find({})
    total_items = await cartCOl.count_documents({})
    async for document in response:
        carts.append(AllCart(**document))
        total = total + (TotalPrice(**document).price * TotalQuantity(**document).quantity)
    return carts, total_items, total

async def fetchAllCart():
    carts = [] 
    total = 0 
    response = cartCOl.find({})
    total_items = await cartCOl.count_documents({})
    async for document in response:
        carts.append(AllCart(**document))
        total = total + (TotalPrice(**document).price * TotalQuantity(**document).quantity)
    return carts, total_items, total

async def fetchCart(cart_id):
    carts = []
    total = 0
    response = cartCOl.find({"_id":ObjectId(cart_id)})
    total_items = await cartCOl.count_documents({})
    async for document in response:
        carts.append(AllCart(**document))
        total = total + (TotalPrice(**document).price * TotalQuantity(**document).quantity)
    if carts:
        return carts, total_items, total
    else:
        return False

async def cartPrice():
    carts = []
    total = 0
    result = cartCOl.find({})
    async for document in result:
       total = total + (TotalPrice(**document).price * TotalQuantity(**document).quantity)
    return total

async def updateCartQty(cart_data):
    cart_data = jsonable_encoder(cart_data)
    cartid = cart_data["_id"]
    carts = []
    total = 0
    update = await cartCOl.update_one({"_id":ObjectId(cartid)}, {"$set": {"quantity":cart_data["quantity"]}})
    total_items = await cartCOl.count_documents({})
    result = cartCOl.find({})
    async for document in result:
        carts.append(AllCart(**document))
        total = total + (TotalPrice(**document).price * TotalQuantity(**document).quantity)
    return carts, total_items, total
    
async def deleteCart(cart_id):
    cart_id = jsonable_encoder(cart_id)
    cartid = cart_id["_id"]
    carts = []
    total = 0
    delete = await cartCOl.delete_one({"_id":ObjectId(cartid)})
    total_items = await cartCOl.count_documents({})
    result = cartCOl.find({})
    async for document in result:
        carts.append(AllCart(**document))
        total = total + (TotalPrice(**document).price * TotalQuantity(**document).quantity)
    return carts, total_items, total

async def emptyCart():
    carts = []
    total = 0
    response = cartCOl.delete_many({})
    total_items = await cartCOl.count_documents({})
    result = cartCOl.find({})
    async for document in result:
        carts.append(AllCart(**document))
        total = total + (TotalPrice(**document).price * TotalQuantity(**document).quantity)
    return carts, total_items, total 


async def addAddress(address_data):
    address_data = jsonable_encoder(address_data)
    add = await addressCOL.insert_one(address_data)
    response = await addressCOL.find_one({"_id":add.inserted_id})
    return response

async def getAddress():
    response = []
    result = addressCOL.find({})
    async for document in result:
        response.append(AddressAdd(**document))
    return response

async def getSalesReport():
    response = []
    result = salesCOL.find({})
    async for document in result:
        response.append(SalesReport(**document))
    return response

async def addSales(sales_data):
    sales_data = jsonable_encoder(sales_data)
    add = await salesCOL.insert_one(sales_data)
    response = await salesCOL.find_one({"_id":add.inserted_id})
    return response


#admin
adminCOl
async def registerAdmin(admin_data):
    admin_data = jsonable_encoder(admin_data)
    admin_data["password"]= auth_handler.get_password_hash(admin_data["password"])
    check_username = await adminCOl.find_one({"username":admin_data["username"]})
    if check_username:
        return False
    else:
        regis = await adminCOl.insert_one(admin_data)
        response = await adminCOl.find_one({"_id":regis.inserted_id})
        return response



async def testing():
    return "success"