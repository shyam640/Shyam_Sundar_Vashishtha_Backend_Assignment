# **STEELEYE BACKEND ASSIGNMENT**

#### **NOTE : This assignment is completed in two languages namely NodeJS and Python, My working tech stack is ```MERN Stack```, So I have done the asignment primarly in NodeJS.**

<br>

#### **After reading fastapi documentation, I also did it using python.**

<br>

#### **But if company requires me to learn python backend, i am ready to learn and go with it.**

<br>
<br>
<hr>

## **Starting the Application**

- Download this repository in your local system, unzip it and open it in any IDE.

### ***NodeJS Application***
- Go to terminal and type 
1. ```npm install```
2. ```npm start```

- Now move to browser and navigate to ```http://localhost:3000```


### ***Python Application***
- Go to terminal and type 
1. ```pip install fastapi typing pydantic uvicorn```
2. ```uvicorn main:app --reload```

- Now move to browser and navigate to ```http://127.0.0.1:8000```
  
### **Endpoints**
- ```localhost:3000/trades``` :- List All the trades
- ```localhost:3000/trades/trade_id``` :- List trade with specific trade it
- ```localhost:3000/trades?trader=AMZN``` :- Filtering trade
- ```localhost:3000/trades?limit=3``` :- Bonus : Pagination and limit
- ```localhost:3000/trades?sort=true``` :- Sorting list based on price


