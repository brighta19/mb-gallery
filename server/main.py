import os
import psycopg2
import bcrypt
from fastapi import FastAPI, Depends
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv(".env")
app = FastAPI()

# Database Configurations
DB_HOST = os.environ.get("DB_HOST")
DB_DATABASE = os.environ.get("DB_DATABASE")
DB_USER = os.environ.get("DB_USER")
DB_PORT = os.environ.get("DB_PORT")
DB_PASSWORD = os.environ.get("DB_PASSWORD")


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
def get_users(conn = Depends(connection)):
   try:
      cursor = conn.cursor()
      cursor.execute('select * from users')
      conn.commit()
      return cursor.fetchall()
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


@app.post('/login', summary="Login a user")
async def login(user_data: UserLogin, conn = Depends(connection)):
   try:
      cursor = conn.cursor()
      cursor.execute("SELECT * FROM users WHERE username = %s;", (user_data.username,))
      user = cursor.fetchall()
      conn.commit()

      if len(user) == 0:
         return {"message": "user doesn't exist"}

      if user[0][6].encode('utf-8') == bcrypt.hashpw(user_data.password.encode('utf-8'), user[0][6].encode('utf-8')):
         return {"message": "login successful"}
      else:
         return {"message": "password incorrect"}

   finally:
      conn.close()