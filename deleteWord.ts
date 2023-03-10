import { MongoClient, MongoClientOptions } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as MongoClientOptions;

const deleteWord = async (wordToDelete: string) => {
    const wordToDeleteFormatted = wordToDelete.toUpperCase();

    console.log('Deleting word: ' + wordToDeleteFormatted);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = 'frankle';
    const collectionName = 'wordlist';

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected to DB:' + dbName);

        const resultOfDelete = await db.collection(collectionName).deleteOne({
            word: wordToDeleteFormatted,
        });

        console.log('got resultOfDelete: ');
        console.log(resultOfDelete);
    } catch (err) {
        console.log('deleteWord caught error: ');
        console.log(err.message);
    } finally {
        client.close();
        console.log('Disconnected.');
    }
};

if (process.argv.length !== 3) {
    console.log('Please provide one word as an argument.');
} else {
    deleteWord(process.argv[2]);
}
