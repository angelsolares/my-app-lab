
const csvtojson = require('csvtojson');
const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017/";
const fileName = "./test.csv";

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('local');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Data in flat file should matche the data in Patients collection', async () => {
    const patients = db.collection('Patients');
    const patientsCount = await patients.countDocuments();
    var csvFileLenght = 0;
    csvtojson().fromFile(fileName).then(source => {
      csvFileLenght = source.length;
      expect(csvFileLenght).toBe(patientsCount);
    });
  });

  it('Print out all Patient IDs where the first name is missing', async () => {
    const patients = db.collection('Patients');
    const myCursor = await patients.find({firstName: ""});
    for await (let doc of myCursor) {
      console.log(doc._id)
    }
  });

  it('Print out all Patient IDs where email address is missing, but consent is Y', async () => {
    const patients = db.collection('Patients');
    const myCursor = await patients.find({emailAddress: "", consent: 'Y'});
    for await (let doc of myCursor) {
      console.log(doc._id)
    }
  });

  it('Emails created should be the same as Patients who have consent as Y', async () => {
    const patients = db.collection('Patients');
    const patientsCount = await patients.countDocuments({consent:'Y'});
    const emails = db.collection('Emails');
    const emailsCount = await emails.countDocuments();
    expect(emailsCount).toBe(patientsCount);
  });

  it('Emails should be scheduled correctly', async () => {
    const emails = db.collection('Emails');
    const myCursor = await emails.find({});
    for await (let doc of myCursor) {
      expect(doc.Name).toBe('Day ' + doc.Id);
    }
  });

});