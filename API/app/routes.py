from fastapi import APIRouter, Body, HTTPException, status, Request, Depends
from fastapi.responses import JSONResponse

from .models.user_model import *
from .models.product_model import *
from .models.cart_model import *
from .models.admin_model import *
from .models.address_model import *


from .databases.database import *

router = APIRouter()

#User Route
@router.post("/user/register", response_description="registering data")
async def post_user(user_data: UserRegister = Body(...)):
    data = await registerUser(user_data)
    if data:
        return ResponseModel(data, "data successfully registered")
    raise HTTPException(400, "username already exist")

@router.post("/user/login", response_description="retrieving data")
async def post_userlog(user_data: UserLogin = Body(...)):
    data = await loginUser(user_data)
    if data:
        return ResponseModel(data, "data successfully retrieved")
    raise HTTPException(400, "Wrong Username or Password")

@router.get("/user/{username}", response_description="retrieving user")
async def get_username(username:str):
    data = await fetch_one_user(username)
    if data:
        return ResponseModel(data, "data successfully retrieved ")
    raise HTTPException(404, f"There is no user with the username {username}")

@router.put("/user/update", response_description="retrieve list of user data")
async def put_user(user_data:UserUpdate = Body(...), auth = Depends(auth_handler.auth_wrapper)):
    data = await updateUser(user_data)
    if data:
        return ResponseModel(data, "data successfully Changed")
    raise HTTPException(400, "there are something wrong")

@router.delete("/user/delete")
async def delete_user(username):
    data = await deleteUser(username)
    if data:
        return ResponseModel(data, "data successfully deleted")
    raise HTTPException(400, "cant find username to delete")



#Product
@router.post("/products/add", response_description="adding product")
async def post_product(product_data: AddProduct = Body(...)):
    data = await addProduct(product_data)
    if data:
        return ResponseModel(data, "data successfully registered")
    raise HTTPException(400, "there are something wrong")

@router.get("/products", response_description="fetch all products")
async def get_product():
    products = []
    data = await fetchAll()
    if data:
        async for document in data:
            products.append(AllProduct(**document))
        return ResponseModel(products, "Products successfully retrieved")
    raise HTTPException(400, "there are something wrong")

@router.put("/products/update", response_description="update data product")
async def put_product(product_data:ProductUpdate = Body(...)):
    data = await updateProduct(product_data)
    if data:
        return ResponseModel(data, "data successfully Changed")
    raise HTTPException(400, "there are something wrong")

@router.delete("/product/delete/{name}")
async def delete_product(name):
    data = await deleteProduct(name)
    if data:
        return ResponseModel(data, "data successfully deleted")
    raise HTTPException(400, "cant find product to delete")



#carts
@router.post("/carts/add", response_description="adding cart")
async def post_cart(cart_data: AddCart = Body(...)):
    data = await addCart(cart_data)
    if data:
        return ResponseModel(data, "data successfully registered")
    raise HTTPException(400, "there are something wrong")

@router.get("/carts", response_description="fetch all carts")
async def get_carts():
    data = await fetchAllCart()
    if data:
        return ResponseModel(data, "Carts successfully retrieved")
    raise HTTPException(400, "there are something wrong")

@router.get("/carts/cartbyid", response_description="retrieving cart by userid")
async def get_userId(cart_id: str):
    data = await fetchCart(cart_id)
    if data:
        return ResponseModel(data, "data successfully retrieved ")
    raise HTTPException(404, f"There is no cart with the userid {cart_id}")

@router.get("/totalCart", response_description="fetch all carts")
async def get_totalcarts():
    data = await cartPrice()
    if data:
        return ResponseModel(data, "Carts successfully retrieved")
    raise HTTPException(400, "there are something wrong")

@router.put("/carts/update", response_description="update cart quantity")
async def update_qty(cart_data:UpdateQuantityCart = Body(...)):
    data = await updateCartQty(cart_data)
    if data:
        return ResponseModel(data, "Carts successfully retrieved")
    raise HTTPException(400, "there are something wrong")

@router.delete("/carts/delete", response_description="delete one item on cart")
async def delete_cart(cart_id:FindCartById = Body(...)):
    data = await deleteCart(cart_id)
    if data:
        return ResponseModel(data, "item on Carts successfully Deleted")
    raise HTTPException(400, "there are something wrong")

@router.delete("/carts/empty", response_description="delete all cart")
async def empty_cart():
    data = await emptyCart()
    if data:
        return ResponseModel(data, "Carts successfully Deleted")
    raise HTTPException(400, "there are something wrong")



#Address
@router.post("/address/add", response_description="adding address data")
async def post_address(address_data: AddressAdd = Body(...)):
    data = await addAddress(address_data)
    if data:
        return ResponseModel(data, "data successfully registered")
    raise HTTPException(400, "username already exist")

@router.get("/address", response_description="fetch all address")
async def get_address():
    data = await getAddress()
    if data:
        return ResponseModel(data, "Carts successfully retrieved")
    raise HTTPException(400, "there are something wrong")

@router.post("/sales/add", response_description="adding sales data")
async def post_sales(sales_data: SalesReport = Body(...)):
    data = await addSales(sales_data)
    if data:
        return ResponseModel(data, "data successfully registered")
    raise HTTPException(400, "username already exist")

@router.get("/sales", response_description="fetch all sales report")
async def get_sales():
    data = await getSalesReport()
    if data:
        return ResponseModel(data, "Carts successfully retrieved")
    raise HTTPException(400, "there are something wrong")











#Admin
@router.post("/admin/register", response_description="registering data")
async def post_admin(admin_data: AdminRegister = Body(...)):
    data = await registerAdmin(admin_data)
    if data:
        return ResponseModel(data, "data successfully registered")
    raise HTTPException(400, "username already exist")



@router.get("/testing", response_description="fetch all carts")
async def get_test():
    data = await testing()
    if data:
        return ResponseModel(data, "Carts successfully retrieved")
    raise HTTPException(400, "there are something wrong")