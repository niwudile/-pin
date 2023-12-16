var mongoose=require("./db")



var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    tel:String,
    sex:String,
    rid:{
        type:mongoose.Types.ObjectId,
        ref:"role"
    }
})

var roleSchema=new mongoose.Schema({
    name:String,
    mid:{
        type:[mongoose.Types.ObjectId],
        ref:"menu" 
    }
})

var menuSchema=new mongoose.Schema({
    name:String,
    level:String,
    url:String,
    pid:mongoose.Types.ObjectId
})

var personalSchema=new mongoose.Schema({
    name:String,
    age:Number,
    phone:String,
    sex:String,
    path:String,
    proid:{
        type:mongoose.Types.ObjectId,
        ref:"province"
    }
})

var provinceSchema=new mongoose.Schema({
    name:String,
    cid:{
        type:[mongoose.Types.ObjectId],
        ref:"city"
    }
})

var citySchema=new mongoose.Schema({
    name:String,
})

var personalModel=mongoose.model("personal",personalSchema,"personal")
var provincelModel=mongoose.model("province",provinceSchema,"province")
var cityModel=mongoose.model("city",citySchema,"city")
var userModel=mongoose.model("user",userSchema,"user")
var roleModel=mongoose.model("role",roleSchema,"role")
var menuModel=mongoose.model("menu",menuSchema,"menu")




module.exports={
    personalModel,
    provincelModel,
    cityModel,
    userModel,
    roleModel,
    menuModel
}
