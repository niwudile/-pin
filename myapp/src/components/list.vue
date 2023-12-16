<template>
  <div>
    <el-container>
      <el-header>
        <!-- <top :menu="menulist" :role="role"></top> -->
        <div class="box1">
          后台管理中心
        </div>
        <div class="box2">
          <el-menu class="el-menu-demo" mode="horizontal" background-color="#2d2f3a" text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item :index="item.url" v-for="item in menulist" :key="item._id" @click="select(item)">{{ item.name
            }}</el-menu-item>
          </el-menu>

        </div>
        <div class="box3">
          <el-menu class="el-menu-demo" mode="horizontal" background-color="#2d2f3a" text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item @click="boss()"><span class="el-icon-s-home"></span> 网站首页</el-menu-item>
            <el-menu-item @click="openFullScreen2"><span class="el-icon-refresh"></span> 更新缓存</el-menu-item>
            <el-submenu index="2">
              <template slot="title"><span class="el-icon-user-solid"></span>{{ username }} <span></span> <span
                  style="color: #4ec08e;">({{ role }})</span> </template>
              <el-menu-item><span class="el-icon-s-tools"></span> 个人中心</el-menu-item>
              <el-menu-item @click="bye"><span class="el-icon-switch-button"></span> 退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>


      </el-header>
      <el-container>
      <div v-if="menuchildrenL === 1">
        <el-aside width="200px">
          <el-menu class="el-menu-vertical-demo" background-color="#2e2f3a" text-color="#fff" active-text-color="#ffd04b" router :default-active="stag">
            <el-menu-item :index="ele.url" v-for="ele in menuitem.children" :key="ele._id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ ele.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </div>
      <el-aside width="200px" v-else>
        <el-menu class="el-menu-vertical-demo" background-color="#2e2f3a" text-color="#fff" active-text-color="#ffd04b" router :default-active="staging">
          <el-submenu :index="ele.url" v-for="ele in menuitem.children" :key="ele._id">
            <template slot="title">
              <i></i>
              <span>{{ ele.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="iii.url" v-for="iii in ele.children" :key="iii._id">{{ iii.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    </el-container>
   
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
      stag:"",
      staging:"",
      menuchildrenL: "",
      menuitem: "",
      perlist: [],
      dialogFormVisible: false,
      form: {
        upid: "",
        name: '',
        age: '',
        phone: '',
        sex: '',
        path: "",
        proid: "",
      },
      menulist: [],
      role: "",
      mid: [],
      prolist: [],
      citylist: [],
      formLabelWidth: '120px',
      username: "",
    }
  },
  created() {
    this.role=sessionStorage.getItem("name")
    this.username=sessionStorage.getItem("username")
    this.mid=JSON.parse(sessionStorage.getItem("mid"))
  },
  computed: {},
  watch: {},
  methods: {
    select(item) {
      this.menuitem = item
      this.menuchildrenL = this.menuitem.children.length;
      if(item.children[0].children){
        this.staging=item.children[0].children[0].url
        this.$router.push("/"+item.children[0].children[0].url)
      }else{
        this.stag=item.children[0].url
        this.$router.push("/"+item.children[0].url)
      }
      console.log(this.stag);
      console.log(this.staging);
    },
    async mlist() {
      let { data: { data } } = await this.axios.get("list_menu", { params: { mid: this.mid } })
      this.menulist = data
      this.menuitem = this.menulist[0]
      this.menuchildrenL = this.menuitem.children.length;
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
    bye() {
      this.$confirm('你确定要退出吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem("mid")
        sessionStorage.removeItem("name")
        sessionStorage.removeItem("username")
        this.$router.push("/login")
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
    openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 500);
      },
    success(val) {
      this.form.path = val.path
    },
  },
  mounted() {
    this.index()
    this.mlist()
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
    // border: 1px solid #fff;
  }

  .box2 {
    width: 900px;
    height: 7vh;
    // border: 1px solid #fff;
  }

  .box3 {
    width: 500px;
    height: 7vh;
    // border: 1px solid #fff;
  }
}

.el-aside {
  height: 92.5vh;
  background: #2e2f3a;
}
</style>