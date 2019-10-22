const express = require ('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/racersDataBase";
const cors = require('cors')();
const morgan = require('morgan');
const userRoutes = require('./routes/user-routes')
const leagueRoutes = require('./routes/league-routes')
const stageRoutes = require('./routes/stage-routes')
const raceRoutes = require('./routes/race-routes')

mongoose.connect(
    url,
    { useUnifiedTopology: true, 
    useNewUrlParser: true  }
)
.then(() => console.log('We connected to racersDataBase'))
.catch(error => console.log(error))

app.use(express.json());
app.use(morgan('dev'));
app.use(cors);
app.use('/users', userRoutes);
app.use('/leagues', leagueRoutes);
app.use('/stages', stageRoutes);
app.use('/races', raceRoutes);


app.listen(3000, () => console.log(`Server is running on port ${port} ...`))