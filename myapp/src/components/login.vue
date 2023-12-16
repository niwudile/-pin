<template>
<div class="div1">
   <img :src="require('../assets/'+src)" alt="" width="100%" height="100%">
    <div class="login">
      <p style="font-size: 20px; text-align: center; margin-top: 20px; " >用户登录</p>
      <p style="font-size: 14px; text-align: center; margin-top:10px;">健康系统统计中心</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
  <el-form-item label="" prop="username">
    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="" prop="password">
    <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
  </el-form-item>

  <el-form-item>
        <div style="display: flex">
          <el-input
            v-model="ruleForm.validCode"
            style="width: 60%"
            placeholder="请输入验证码"
            size="medium"
          ></el-input>
          <ValidCode
            @input="createValidCode"
            style="
              background-color: aliceblue;
              width:200px;
              height:38px;
              margin-top:2px;
            "
          />
        </div>
      </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login('ruleForm')">立即登陆</el-button>
    <el-button >注册</el-button>
    {{ ruleForm.ValidCode }}
  </el-form-item>
</el-form>
    </div>
</div>
</template>
<script>
import ValidCode from "@/components/yzm.vue";
export default {
  components: {
    ValidCode,
  },
  createValidCode: "",
  name: '',
  props: { },
  data () {
    return { 
      imgs:["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"],
      src:"",
      index:0,
      ruleForm:{
        username:"admin",
        password:"123456",
        validCode: "",
        ValidCode:"",
      },
      rules: {
          username: [
            { required: true, message: '请输入3到7个字符', trigger: 'blur' },
            { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入5到10个字符', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
      }
    }
  },
  created(){
    this.random()
  },
  computed: { },
  watch: { },
  methods: { 
    random() {
      let min = Math.ceil(0);
      let max = Math.floor(this.imgs.length - 1);
      let a = Math.floor(Math.random() * (max - min + 1)) + min;
      this.index = a;
      this.src = this.imgs[this.index];
      if (this.imgs.length == this.index + 1) {
        this.index = 0;
      }
    },
   async login(){
       let {data:{code,token,name,mid}} = await this.axios.post("login",this.ruleForm)
       console.log(code);
       if(code==200){
        this.$message({
          message: '登陆成功',
          type: 'success'
        });
        let username=this.ruleForm.username
         sessionStorage.setItem("token",token)
         sessionStorage.setItem("mid",JSON.stringify(mid))
         sessionStorage.setItem("username",username)
         sessionStorage.setItem("name",name)
         this.$router.push({path:"/list",query:{name,mid,username}})
         return false
       }
       if(code==201){
        this.$message({
          message: '用户不存在',
          type: 'warning'
        });
        return false
       }
       if(code==202){
        this.$message({
          message: '密码错误',
          type: 'warning'
        });
        return false
       }
       if(code==203){
        this.$message({
          message: '验证码错误',
          type: 'warning'
        });
        return false
       }
    },
    createValidCode(data) {
      //data验证码的数值
      this.ruleForm.ValidCode = data;
    },
  },
  mounted() { 
   
  }
}
</script>
<style lang='less'>
.div1{
  width: 100%;
  height: 99.57vh;
}
.login{
  width: 400px;
  height: 450px;
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  .el-form{
     padding: 40px;
     box-sizing: border-box;
  }
}
</style>