const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser') //최신 express에는 bodyParser기능이 내장되어있다.
const cookieParser = require('cookie-parser')
const {User}  = require("./models/users")
const config = require("./config/key")

app.use(express.urlencoded({extended: true})); //express에서 제공하는 bodyParser기능

app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면
  //그것들을 DB에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login',(req, res) => {
  //요청된 이메일을 DB에서 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "일치하는 이메일이 없습니다."
      })
    }
    //요청된 이메일이 있다면 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch){
        return res.json({
          loginSuccess: false,
          message: " 비밀번호가 틀립니다."
        })
      }
      //비밀번호 확인 후 일치하면 token생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        //token을 저장한다.
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        })

      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})