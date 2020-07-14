# Would You Rather Project
This is the submission code for the final assessment project for Udacity's React & Redux course. 

The name of the Project is: Would You Rather. Its a game where participants ask would you rather questions and answers them. A Learderboard tracks the score of each participant based on how many questions they have asked and answered.

Instructions for running this Project:

* install all project dependencies with `npm install`
* start the development server with `npm start` or `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Technology
Primary technology: React & Redux. 

Supporting: Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## File Structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file.
├── .gitignore
├── public
│   ├── favicon.ico # React Icon as favicon.
│   ├── index.html # DO NOT MODIFY
│   └── manifest.json
└── src
    ├── components
    |   ├── App.js # This is the root of app.
    |       └── QuestionBoard.js (Tab for Unanswered/Answered)
    |           └── QuestionsUnanswered.js 
    |               └── QuestionDisplay.js + button to answer
    |           └── QuestionsAnswered.js
    |               └── QuestionDisplay.js + button to see poll
    |       |── QuestionHandler.js (URL: /question)
    |           |── QuestionResult.js (if answered)
    |           └── QuestionAnswer.js (if unanswered)
    |       |── NewQuestion.js
    |       |── LeaderBoard.js
    |       └── PageNotFoundHandler.js
    |           |── ForceLoginPage.js 
    |           └── PageNotFound.js
    |
    ├── actions
    │   ├── authedUser.js
    │   ├── questions.js
    │   ├── routeTrack.js
    |   ├── shared.js # contains handleInitialData
    │   └── users.js   
    |
    ├── middleware
    │   ├── index.js
    │   └── logger.js
    |
    ├── reducers
    │   ├── authedUser.js
    |   ├── index.js # contains combineReducers
    │   ├── questions.js
    │   ├── routeTrack.js
    │   └── users.js
    |
    ├── utils
    │   ├── _DATA.js
    |   ├── api.js
    │   └── helpers.js
    |   
    ├── index.css # Global styles.
    └── index.js # File for DOM rendering only
```

## App Data
The `_DATA.js` file represents a fake database and methods that let you access the data.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type    | Description                          |
|--------------|---------|--------------------------------------|
| id           | String  | The user’s unique identifier         |
| name         | String  | The user’s first name  and last name |
| avatarURL    | String  | The path to the image file           |
| questions    | Array   | A list of ids of the polling questions this user created |
| answers      | Object  |  The objects keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options. |

### Questions

Questions include:

| Attribute | Type   | Description       |
|-----------|--------|-------------------|
| id        | String | The question’s unique identifier |
| author    | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type   | Description |
|-----------|--------|-------------------|
| votes     | Array  | A list that contains the id of each user who voted for that option|
| text      | String | The text of the option |

Code talks to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|