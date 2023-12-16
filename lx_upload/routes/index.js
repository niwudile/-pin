var express = require('express');
var router = express.Router();
var multiparty=require("multiparty")
var jwt = require("jsonwebtoken")
var {  personalModel,provincelModel,cityModel,userModel,roleModel,menuModel}=require("../model/model")



router.post("/add_user",(req,res)=>{
  let userdata=req.body
  userModel.create(userdata)
  res.send({
    code:200,
    msg:"添加用户成功"
  })
})

router.post("/add_role",(req,res)=>{
  let roledata=req.body
  roleModel.create(roledata)
  res.send({
    code:200,
    msg:"添加角色成功"
  })
})

router.post("/add_menu",(req,res)=>{
  let menudata=req.body
     menuModel.create(menudata)
    res.send({
      code:200,
      menudata,
      msg:"添加权限成功"
    })
})

router.get("/list_menu",async(req,res)=>{
    let {mid}=req.query
    console.log(mid);
    let menulist=await menuModel.find({_id:mid}).lean()
    let menuobj={}
    menulist.forEach((menuitem)=>{
      menuobj[menuitem["_id"]]=menuitem
    })
    let data=[]
    menulist.forEach((menuitem)=>{
      if(!menuitem["pid"]){
        data.push(menuitem)
      }else{
        if(menuobj[menuitem['pid']] && !menuobj[menuitem["pid"]]['children']){
          menuobj[menuitem["pid"]]['children']=[]
        }
        menuobj[menuitem["pid"]]['children'].push(menuitem)
      }
    })
    res.send({
       data,
    })
})

router.post("/login",async (req,res)=>{
   let {username,password,validCode,ValidCode}= req.body
   let userlist = await userModel.find({username})
   if(userlist.length!=0){
    let rolelist = await roleModel.find({_id:userlist[0].rid})
      if(validCode==ValidCode){
         if(userlist[0].password==password){
          let token="Bearer "+ jwt.sign({username},"ice",{expiresIn:"1h"})
          let name=rolelist[0].name
          let mid=rolelist[0].mid
          res.send({
                    code:200,
                    msg:"登陆成功",
                    name,
                    mid,
                    token,
               })
         }else{
          res.send({
            code:202,
            msg:"密码错误"
          })
         }
      }else{
        res.send({
          code:203,
          msg:"验证码错误"
        })
      }
   }else{
     res.send({
      code:201,
      msg:"用户不存在"
     })
   }
})

router.get("/per_list",async(req,res)=>{
   let perlist=await personalModel.find()
   res.send({
    perlist,
   })
})

router.delete("/pre_delete",async (req,res)=>{
   let {_id}=req.query
   console.log(_id);
   await personalModel.deleteOne({_id})
   res.send({
    code:200
   })
})

router.post("/pre_update",async(req,res)=>{
    let perdata=req.body
    let {_id}=req.body
   await personalModel.updateOne({_id},perdata)
    res.send({
      code:200,
      msg:"修改成功"
    })
})

router.post("/per_add",async (req,res)=>{
  let perdata=req.body
  personalModel.create(perdata)
  res.send({
    code:200,
    msg:"添加成功"
  })
})

router.get("/procity",async(req,res)=>{
     let prolist=await provincelModel.find().populate()
     console.log(prolist);
     let citylist=await cityModel.find()
     res.send({
      prolist,
      citylist,
     })
})

router.post("/add_upload",(req,res)=>{
      let form=new multiparty.Form()
      form.uploadDir='upload'
      form.parse(req,(err,file,imgdata)=>{
        res.send({
           path:'http://localhost:3000/'+imgdata.file[0].path,
        })
      })
})
module.exports = router;
