const express = require('express')
const app = express()
const port = 5002

const bodyParser = require('body-parser');

const config = require('./config/key')
const { User } = require("./models/User");

//application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

//application/json
// app.use(bodyParser.json());
app.use(express.json());


const mongoose = require('mongoose')
// mongoose.connect('mongodb+srv://zinkang:abcd1234@boilerplate.fcut2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('MongoBD Connected..'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {

    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
      if (err) return res.json({success: false, err})
      return res.status(200).json({
        success: true
      })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))