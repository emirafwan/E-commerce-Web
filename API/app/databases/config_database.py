import motor.motor_asyncio


client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://root:p455w0rd@172.29.125.220:27017/?authSource=admin')

database = client.database
userCOl = database.user_collection
addressCOL = database.address_collection
salesCOL = database.sales_collection
cartCOl = database.cart_collection
productCOl = database.product_collection
adminCOl = database.admin_collection
branchCOl = database.branch_collection