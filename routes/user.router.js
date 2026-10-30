const express =require("express");
const userController=require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter=express.Router();


userRouter.get("/allUsers", authMiddleware,userController.getAllUsers);
userRouter.post("/signup",userController.signup);
userRouter.post("/login",userController.login);
userRouter.get("/userProfile/:id",userController.getUserProfile);
userRouter.put("/updateProfile/:id",userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id",userController.deleteUserProfile);
userRouter.post("/star/:id", userController.starRepository);
userRouter.delete("/unstar/:id", userController.unstarRepository);
userRouter.post("/star/check/:id", userController.checkStarred);
module.exports=userRouter;