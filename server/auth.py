import jwt
import os
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv(".env")

class AuthHandler():
   security = HTTPBearer()
   secret = os.environ.get("JWT_SECRET")
   
   def encode_token(self, user_id):
      payload = {
         'exp': datetime.utcnow() + timedelta(days=0, minutes=5),
         'iat': datetime.utcnow(),
         'sub': user_id
      }
      return jwt.encode(
         payload,
         self.secret,
         algorithm='HS256'
      )


   def decode_token(self, token):
      try:
         payload = jwt.decode(token, self.secret, algorithms=['HS256'])
         return payload['sub']
      except jwt.ExpiredSignatureError:
         raise HTTPException(
               status_code=401, detail='Signature has expired')
      except jwt.InvalidTokenError as e:
         raise HTTPException(status_code=401, detail='Invalid token')


   def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
      return self.decode_token(auth.credentials)
