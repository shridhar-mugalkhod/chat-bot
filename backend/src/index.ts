import {disconnectFromDB,connectToDB} from './db/connections.js'
import app from './app.js'

const port = process.env.PORT || 3001;

connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  })
})
