## Seting Up Local Dev Environment

`cd` to this directory
```
cd server
```

Install pipenv if you don't already have it 
```
pip3 install pipenv
```

Enter virtual environment by running the following command
```
pipenv shell
```

Install necessary dependencies/packages:
```
pipenv install -r requirements.txt   
```
Get `.env` file from one of the devs working on the project to connect to database and place in server's root directory.  

Start API server:
```
uvicorn main:app --reload  
```


## Database

The main configs you need to connect to db is in `.env` file. 
To connect using terminal, Google how to do that. Or, you may use apps such as Postico or PgAdmin to see the tables/data in Database.