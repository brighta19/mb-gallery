import os
import psycopg2
import bcrypt
from fastapi import FastAPI, Depends, HTTPException
from dotenv import load_dotenv
from pydantic import BaseModel
from auth import AuthHandler

load_dotenv(".env")
app = FastAPI()
auth_handler = AuthHandler()

# Database Configurations
DB_URL = os.environ.get("DB_URL")
DB_USER = DB_URL.split(':')[1][2:]
DB_DATABASE = DB_URL.split(':')[3].split('/')[1]
DB_HOST = DB_URL.split(':')[2].split('@')[1]
DB_PORT = DB_URL.split(':')[3].split('/')[0]
DB_PASSWORD = DB_URL.split(':')[2].split('@')[0]

# Connect to Postgres Database
def connection():
   return psycopg2.connect(
      database=DB_DATABASE,
      user=DB_USER,
      password=DB_PASSWORD,
      host=DB_HOST,
      port=DB_PORT
   )


class NewUser(BaseModel):
   name_first: str
   name_last: str
   username: str
   email: str
   password: str
   bio: str


class UserLogin(BaseModel):
   username: str
   password: str
   

@app.get("/")
async def root():
   return {
      "message": "Welcome to exibit.me"
   }


@app.get('/users', summary="Get all users")
def get_users(username = Depends(auth_handler.auth_wrapper), conn = Depends(connection)):
   try:
      cursor = conn.cursor()
      cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
      current_user = cursor.fetchall()
      current_user_role = current_user[0][3]
      if current_user_role == "admin":
         cursor.execute("SELECT * FROM users")
         users = cursor.fetchall()
         conn.commit()
         return users
      else:
         raise HTTPException(status_code=401, detail="You are not authorized to view this page")
   finally:
      conn.close()


@app.post('/register', summary="Create a new user")
async def register(user_data: NewUser, conn = Depends(connection)):
   try:
      cursor = conn.cursor()
      encrypted_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt(10))
      cursor.execute("INSERT INTO users (name_first, name_last, username, email, hash, bio) VALUES (%s, %s, %s, %s, %s, %s);", (user_data.name_first, user_data.name_last, user_data.username, user_data.email, encrypted_password.decode('utf8'), user_data.bio))
      conn.commit()
      return {
         "http": "200",
         "message": "User created successfully",
         "user": user_data
      }
   finally:
      conn.close()


@app.post('/login', summary="Login to an account")
async def login(user_data: UserLogin, conn = Depends(connection)):
   try:
      cursor = conn.cursor()
      cursor.execute("SELECT * FROM users WHERE username = %s;", (user_data.username,))
      user = cursor.fetchall()
      conn.commit()

      if len(user) == 0:
         return {"message": "user doesn't exist"}

      isCorrectPassword = user[0][6].encode('utf-8') == bcrypt.hashpw(user_data.password.encode('utf-8'), user[0][6].encode('utf-8'))
      
      if isCorrectPassword:
         token = auth_handler.encode_token(user[0][4]) # bearer token
         return {
            "message": "login successful",
            "token": token
         }
      else:
         return {"message": "password incorrect"}

   finally:
      conn.close()
      

@app.post('/upload', summary="Upload media files")
def upload(username=Depends(auth_handler.auth_wrapper)):
    return { 'name': username }