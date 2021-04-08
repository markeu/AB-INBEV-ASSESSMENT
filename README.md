# AB-INBEV-ASSESSMENT

AB-INBEV recruitment accessment task.

### REST API Docs

[AB-INBEV documentation link](https://ab-inbev-assessment.herokuapp.com/api-docs/)

### Required Features

```
User can sign up.
User can sign in.
An Authenticated user can calculate the area of different shapes.
An Authenticated user can fetch all previous computation record.
```


## Installation and Running the Application

Ensure that you have nodejs and npm installed in your computer

a. Clone this repository into your named folder

```bash
git clone https://github.com/markeu/AB-INBEV-ASSESSMENT.git
git status
```

b. Install the project dependencies

```bash
yarn
```

c. start the application

```bash
yarn start
```


## Test the endpoints

The application can be tested locally through localhost on port 5000 or through the live [url](https://ab-inbev-assessment.herokuapp.com) using postman or easily using the documentation link [url](https://ab-inbev-assessment.herokuapp.com/api-docs/)

1. Run the application while postman is open
2. Go to postman and test against the endpoints below with the required property:-

### Endpoints to test

Method        | Endpoint      | Enable a user to: |
------------- | ------------- | ---------------
POST  | /signup | Create user account  |
POST  | /login  | Login a user |
POST  | /calculate  | Calculate the area of different shapes |
GET  | /fetchRecords | Fetch all my previously computated data |



## Author

* Uche Uzochukwu Mark