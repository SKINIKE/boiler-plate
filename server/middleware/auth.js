const {User}  = require("../models/users");

let auth = (req, res, next) => {
    //인증처리를 하는곳
    //클라이언트에서 쿠키와 토큰을 가져온다.
    let token = req.cookies.x_auth;
    //토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, err: true})

        req.token = token;
        req.user = user
        next();
    })
}

module.exports = {auth};