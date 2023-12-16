var mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/lx_upload")
var con=mongoose.connection
con.on("open",()=>{
    console.log("连接数据库成功");
})
con.on("error",(err)=>{
    console.log(err);
})
module.exports=mongoose