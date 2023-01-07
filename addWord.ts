import { MongoClient, MongoClientOptions } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as MongoClientOptions;

const addWord = async (newWord: string) => {
    const newWordFormatted = newWord.toUpperCase();
    console.log('Adding word to wordlist: ' + newWordFormatted);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = 'frankle';
    const collectionName = 'wordlist';

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected to DB:' + dbName);

        const foundWord = await db
            .collection(collectionName)
            .findOne({ word: newWordFormatted });

        if (foundWord) {
            throw new Error('Word already in wordlist');
        } else {
            const resultOfInsert = await db
                .collection(collectionName)
                .insertOne({
                    word: newWordFormatted,
                });

            console.log('got resultOfInsert: ');
            console.log(resultOfInsert);
            console.log('Added to wordlist');
        }
    } catch (err: any) {
        console.log('addWord caught error: ');
        console.log(err.message);
    } finally {
        client.close();

        console.log('Disconnected.');
    }
};

if (process.argv.length !== 3 || process.argv[2].length !== 5) {
    console.log('Please provide one 5-letter word as an argument.');
} else {
    addWord(process.argv[2]);
}
