import {connect,disconnect} from 'mongoose';

export const connectToDB = async () => {
    try {
        await connect(process.env.MONGODB_URL,{}).then(() => {
            console.log("Database connection successful");
        })
    } catch (err) {
        console.log(`Error while connecting to DB: ${err}`);
    }
}

export const disconnectFromDB = async () => {
    try {
        await disconnect();
    } catch (err) {
        console.log(`Error while Disconnecting from DB: ${err}`);

    }
}