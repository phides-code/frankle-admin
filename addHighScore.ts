import { MongoClient, MongoClientOptions } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as MongoClientOptions;

interface HighScore {
    name: string;
    time: number;
    word: string;
}

const addHighScore = async (highScore: HighScore) => {
    const client = new MongoClient(MONGO_URI, options);
    const dbName = 'frankle';
    const collectionName = 'highscores';

    console.log('adding new high score: ');
    console.log(highScore);

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected to DB: ' + dbName);

        const resultOfInsert = await db
            .collection(collectionName)
            .insertOne(highScore);

        console.log('got resultOfInsert: ');
        console.log(resultOfInsert);
        console.log('Added to high scores list');
    } catch (err: any) {
        console.log('addHighScore caught error: ');
        console.log(err.message);
    } finally {
        client.close();
        console.log('Disconnected.');
    }
};

const readHighScore = () => {
    const name: string = process.argv[2];
    const time: number = parseInt(process.argv[3]);
    const word: string = process.argv[4];

    if (!name || !time || !word) {
        console.log(
            'Error: please provide a name, time, and word as arguments'
        );
    } else if (isNaN(time)) {
        console.log('Error: time must be a number');
    } else {
        const highScore: HighScore = { name, time, word };
        addHighScore(highScore);
    }
};

readHighScore();
