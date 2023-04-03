import './config/env-config';
import './config/multi-processing';
import { connection } from './database';
import app from './app';

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, async () => {
    const db = await connection;
    console.log(
        `\n> Connected to the ${db.connection.name.toUpperCase()} database.` +
            `\n> Server listening on port ${PORT}\n`,
    );
});
