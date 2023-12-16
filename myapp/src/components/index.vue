<template>
<div>
     <el-button @click="addym" type="primary">添加用户</el-button>
    <template>
  <el-table
    :data="perlist"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
    </el-table-column>

    <el-table-column prop="path" label="图片">  
    <template slot-scope="scope">  
      <img :src="scope.row.path" alt="图片" style="max-width: 100px; max-height: 100px;">  
    </template>  
  </el-table-column>  

  <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index,scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
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
  <img v-if="form.path" :src="form.path" class="avatar" width="150px" height="150px">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
  <el-form-item label="省份">

<el-select v-model="form.proid" placeholder="请选择省份" @change="sheng()">
  <el-option :label="item.name" :value="item._id" v-for="item in prolist" :key="item._id"></el-option>
</el-select>

<el-select v-model="form.city" placeholder="请选择城市" @change="shi()" v-if="this.form.proid">
  <el-option :label="item.name" :value="item._id" v-for="item in newlist" :key="item._id"></el-option>
</el-select>

</el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onupdate">立即修改</el-button>
    <el-button @click="dialogFormVisible=false">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>
</div>
</template>
<script>
export default {
  name: '',
  props: {},
  components: {
  },
  data() {
    return {
      menuchildrenL: "",
      perlist: [],
      dialogFormVisible: false,
      form:{
           name:"",
           age:"",
           phone:"",
           sex:"",
           path:"",
           proid:"",
           city:""
        },
      menulist: [],
      role: "",
      mid: [],
      prolist: [],
      citylist: [],
      formLabelWidth: '120px',
      username: "",
      newlist:[],
    }
  },
  computed: {},
  watch: {},
  methods: {
    shi(){
       console.log(this.newlist);
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
    async index() {
      let { data: { prolist, citylist } } = await this.axios.get("procity")
      this.prolist = prolist,
        this.citylist = citylist
      let { data: { perlist } } = await this.axios.get("per_list")
      this.perlist = perlist
    },
    async handleDelete(id) {
      console.log(id);
      let { data: { code } } = await this.axios.delete("pre_delete", { params: { _id: id } })
      if (code == 200) {
        this.index()
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }
    },
    addym() {
      this.$router.push("/add")
    },
    handleEdit(index, id) {
      this.dialogFormVisible = true

      this.form = this.perlist[index]
      this.form.upid = id
    },
    async onupdate() {
      let { data: { code } } = await this.axios.post("pre_update", this.form)
      if (code == 200) {
        this.dialogFormVisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }
    },
    boss() {
      this.menuitem = this.menulist[0]
    },
    success(val) {
      this.form.path = val.path
    },
  },
  mounted() {
    this.index()
  }
}
</script>
<style lang='less'>
* {
  margin: 0;
  padding: 0;
}

.el-header {
  width: 100%;
  height: 7vh;
  background: #2c2f3a;
  color: #fff;
  line-height: 7vh;
  display: flex;
  justify-content: space-between;

  .box1 {
    width: 200px;
    height: 7vh;
  }

  .box2 {
    width: 900px;
    height: 7vh;
  }

  .box3 {
    width: 500px;
    height: 7vh;
  }
}

.el-aside {
  height: 92.5vh;
  background: #2e2f3a;
}
</style>