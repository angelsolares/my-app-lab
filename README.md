# my-app-lab

My app lab is a NodeJs challenge requested from HCS.

## Installation

Code can be cloned from the following public repository:

https://github.com/angelsolares/my-app-lab

Download and install Cvs2JSON from here https://www.npmjs.com/package/csv2json and follow the instructions.

Download and install Jest Automation framework from here https://jestjs.io/docs/mongodb and follow the instructions

Download your prefered MonoDB IDE like Atlas Community Server from here
https://www.mongodb.com/try/download/community

## Description

This project is divided on the actual logic for executing the requested challenge, and a second project for testing.

For actual project:
There is a csv file called "test.csv" located on the root of the project, when you serve the project will
load the file and send it to a colletion on MongoDB, this collection will be called Patients. Then later the project will check for every patient that has their field "consent" equal to "Y" if so, it will send this information to the another created collection called "Emails".

For testing project:
The project will run four validations that should be meet as true, two of them will be for printing some values and the other three for making some comparisons. For this to run correctly, it is recommended to first run the actual project for filling the database with info.

## Usage

For running actual project to fill collections use
$node server.js

For running tests use
$npm test

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
