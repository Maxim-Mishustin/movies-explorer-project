const userRouter = require('express').Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');
const {
  getUserInfoValidator,
  updateUserInfoValidator,
} = require('../middlewares/validation');

userRouter.get('/users/me', getUserInfoValidator, getUserInfo);

userRouter.patch('/users/me', updateUserInfoValidator, updateUserInfo);

module.exports = userRouter;
