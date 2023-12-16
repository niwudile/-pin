<template>
<div>
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="年龄">
    <el-input v-model="form.age"></el-input>
  </el-form-item>
  <el-form-item label="电话">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-input v-model="form.sex"></el-input>
  </el-form-item>
  <el-form-item label="图片上传">
    <el-upload
  class="avatar-uploader"
  action="http://localhost:3000/add_upload"
  :show-file-list="false"
  :on-success="success">
  <img v-if="form.path" :src="form.path" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
  <el-form-item label="省份">

    <el-select v-model="form.proid" placeholder="请选择活动区域" @change="sheng()">
      <el-option :label="item.name" :value="item._id" v-for="item in prolist" :key="item._id"></el-option>
    </el-select>

    <el-select v-model="form.city" placeholder="请选择活动区域" @change="shi()" v-if="this.form.proid">
      <el-option :label="item.name" :value="item.name" v-for="item in newlist" :key="item._id"></el-option>
    </el-select>

  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="upSubmit">取消</el-button>
  </el-form-item>
</el-form>
  
</div>
</template>
<script>
export default {
  name: '',
  props: { },
  data () {
    return { 
        cityid:"",
        form:{
           name:"",
           age:"",
           phone:"",
           sex:"",
           path:"",
           proid:"",
           city:""
        },
        prolist:[],
        citylist:[],
        newlist:[],
    }
  },
  computed: { },
  watch: { },
  methods: { 
    shi(){
       
       console.log(this.form.city,this.form.proid);
    },
    sheng(){
      this.form.city=""
       this.newlist=[]
      let index =this.prolist.findIndex(ele=>{
        return ele._id==this.form.proid
      })
       this.prolist[index].cid.filter((proitem)=>{
        let list = this.citylist.filter(ele=>{
            return  proitem==ele._id
          })
           this.newlist.push(list[0])
      })
    },
   async index(){
    let {data:{prolist,citylist}}  = await this.axios.get("procity")
            this.prolist=prolist,
            this.citylist=citylist
            console.log(citylist);
    },
    success(val){
       this.form.path=val.path
    },
   async onSubmit(){
       let {data:{code}} =  await this.axios.post("/per_add",this.form)   
       if(code==200){
        this.$router.push("/list")
        this.$message({
          message: '添加成功',
          type: 'success'
        });
       }
    },
    upSubmit(){
      this.$router.push("/list")
    }
  },
  mounted() { 
    this.index()
  }
}
</script>
<style lang='less'>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>