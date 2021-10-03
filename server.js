// Import required module csvtojson and mongodb packages
const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

var url = "mongodb://localhost:27017/local";

var dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log("DB Connected!");
    dbConn = client.db();

    // CSV file name
    const fileName = "./test.csv";
    var arrayPatients = [];
    var arrayEmails = [];
    const today = new Date();

    csvtojson().fromFile(fileName).then(source => {
        // Fetching the all data from each row
        //console.log(source);
        for (var i = 0; i < source.length; i++) {
            var oneRow = {
                programIdentifier: source[i]["Program Identifier"],
                dataSource: source[i]["Data Source"],
                cardNumber: source[i]["Card Number"],
                memberId: source[i]["Member ID"],
                firstName: source[i]["First Name"],
                lastName: source[i]["Last Name"],
                dateOfBirth: source[i]["Date of Birth"],
                address1: source[i]["Address 1"],
                address2: source[i]["Address 2"],
                city: source[i]["City"],
                state: source[i]["State"],
                zipCode: source[i]["Zip code"],
                telephoneNumber: source[i]["Telephone number"],
                emailAddress: source[i]["Email Address"],
                consent: source[i]["CONSENT"],
                mobilePhone: source[i]["Mobile Phone"],
            };
            arrayPatients.push(oneRow);

            if(oneRow.consent =="Y")
            {
                var idx = arrayEmails.length+1;
                arrayEmails.push({
                    Id: idx,
                    Name: "Day " + idx,
                    scheduled_date: today.setDate(today.getDate() + idx),
                });
            }
        }

        console.log(arrayEmails);

        //inserting into the table "Patients"
        var collectionName = 'Patients';
        var collection = dbConn.collection(collectionName);

        collection.insertMany(arrayPatients, (err, result) => {
            if (err) console.log(err);
            if(result){
                console.log(result);
                console.log("Import CSV into database successfully.");
            }
        });

        //inserting into the table "Emails"
        var collectionName = 'Emails';
        var collection = dbConn.collection(collectionName);

        collection.insertMany(arrayEmails, (err, result) => {
            if (err) console.log(err);
            if(result){
                console.log(result);
                console.log("Inserted emails collection succesfully.");
            }
        });
    });

}).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});
