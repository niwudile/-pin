<template>
  <transition name="fade">
  <div class="hy">
    <div class="top">
      <div>
        <i class="el-icon-s-home"></i>
      </div>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">工作台</el-breadcrumb-item>
          <el-breadcrumb-item>用户</el-breadcrumb-item>
          <el-breadcrumb-item>会员管理</el-breadcrumb-item>
          <el-breadcrumb-item>个人会员</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="con">
      <div>
        <h4>会员列表</h4>
      </div>
      <div style="margin: 20px">
        <hr />
      </div>
      <div>
        <el-select v-model="hy.hy" placeholder="不限会员状态">
          <el-option value="不限会员状态"> 不限会员状态 </el-option>
          <el-option value="已锁定"> 已锁定 </el-option>
        </el-select>
        <el-select v-model="hy.zctime" placeholder="按注册时间排序">
          <el-option value="按注册时间排序"> 按注册时间排序 </el-option>
          <el-option value="按登录时间排序">按登录时间排序</el-option>
        </el-select>
        <el-select v-model="hy.time" placeholder="不限注册时间">
          <el-option value="不限注册时间"> 不限注册时间 </el-option>
          <el-option value="3天内">3天内</el-option>
          <el-option value="7天内">7天内</el-option>
          <el-option value="15天内">15天内</el-option>
          <el-option value="30天内">30天内</el-option>
        </el-select>
        <el-select v-model="hy.ly" placeholder="不限注册来源">
          <el-option value="不限注册来源"> 不限注册来源</el-option>
          <el-option value="APP"> APP </el-option>
          <el-option value="手机浏览器">手机浏览器 </el-option>
          <el-option value="微信浏览器">微信浏览器 </el-option>
          <el-option value="微信小程序">微信小程序 </el-option>
          <el-option value="抖音小程序"> 抖音小程序</el-option>
          <el-option value="电脑浏览器">电脑浏览器 </el-option>
          <el-option value="系统"> 系统</el-option>
        </el-select>
        <el-select v-model="hy.wb" placeholder="不限微信绑定">
          <el-option value="不限微信绑定"> 不限微信绑定 </el-option>
          <el-option value="已绑定微信"> 已绑定微信 </el-option>
          <el-option value="未绑定微信"> 未绑定微信 </el-option>
        </el-select>
        <el-select v-model="hy.yb" placeholder="不限邮箱绑定">
          <el-option value="不限邮箱绑定"> 不限邮箱绑定 </el-option>
          <el-option value="已绑定邮箱"> 已绑定邮箱 </el-option>
          <el-option value="未绑定邮箱"> 未绑定邮箱 </el-option>
        </el-select>
      </div>
      <div class="right">
        <el-select v-model="sou.UID" placeholder="UID">
          <el-option value="UID"> UID </el-option>
          <el-option value="用户名">用户名</el-option>
          <el-option value="手机号">手机号</el-option>
          <el-option value="企业名称">企业名称</el-option>
        </el-select>
         <el-input placeholder="请输入内容" v-model="sou.name" class="input-with-select">
             <el-button slot="append" icon="el-icon-search"></el-button>  
        </el-input>
      </div>
        <el-table
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="UID"
      label="UID"
      width="60">
    </el-table-column>
    <el-table-column
      prop="qyname"
      label="企业名称"
      width="400">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zctime"
      label="注册时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="zjdl"
      label="最近登录"
      width="120">
    </el-table-column>
    <el-table-column
      label="会员状态"
      width="120">
      <template slot-scope="scope">
          <el-switch
  v-model="scope.row.status"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
      </template>
      
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
          <el-button size="small">管理</el-button>
        <el-button @click="ck(scope.row)"  size="small">查看</el-button>
        <el-button @click="xg(scope.row)"  size="small">修改</el-button>
        <el-popover
  placement="top"
  width="50"
  trigger="click" >
     <ul>
         <li>日志</li>
         <li>锁定</li>
         <li>禁聊</li>
         <li>删除</li>
     </ul>
  <el-button slot="reference">.....</el-button>
</el-popover>
      </template>
    </el-table-column>
  </el-table>
    </div>
    



<!-- Table -->

<el-dialog title="查看会员" :visible.sync="a">
  <div>
      UID:{{a1.UID}}
  </div>
  <div>
      身份:企业会员
  </div>
  <div>
      用户名:{{a1.username}}
  </div>
  <div>
      手机号:{{a1.phone}}
  </div>
  <div>
      注册时间:{{a1.zctime}}
  </div>
  <div>
      最近登陆:{{a1.zjdl}}
  </div>
  <div>
       <el-button @click="a=false">关闭</el-button>
  </div>
 
</el-dialog>








  </div>
</transition>
</template>
<script>
export default {
  data() {
    return {
      hy: {
        hy: "",
        zctime: "",
        time: "",
        ly: "",
        wb: "",
        yb: "",
      },
      sou:{
          UID:'',
          name:''
      },
      tableData:[
        {
            UID:'123',
            qyname:"sdfj",
            username:'hdshf',
            phone:'12321312',
            zctime:'2022-23-99',
            zjdl:'',
            status:false
        }
      ],
        multipleSelection: [],
        a:false,
        a1:{},
        b:true,
        b1:{},
    };
  },
   methods: {
      ck(row) {
        console.log(row);
        this.a=true
        this.a1=row
      },
      xg(row){
          console.log(row);
          this.b=true
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
      }
    },
};
</script>
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {  
  transition: opacity 0.5s;  
}  
.fade-enter, .fade-leave-to {  
  opacity: 0;  
} 
.hy {
  width: 100%;
  position: absolute;
}
.hy {
  width: 100%;
  position: absolute;
}
.top {
  width: 100%;
  height: 50px;
  box-shadow: 0 0 10px#f2f3f4;
  background: white;
  line-height: 50px;
  display: flex;
  .el-breadcrumb {
    line-height: 50px;
    font-size: 16px;
  }
}
.con {
  width: 80%;
  position: absolute;
  left: 50px;
  top: 70px;
  padding: 20px;
  box-shadow: 0 0 10px gainsboro;
}
hr{
    width: 100%;
}
.el-select {
  width: 150px;
}
.right{
    display: flex;
    width: 500px;
    float: right;
}
ul{
    text-align: center;
    list-style: none;
    li:hover{
        background: #9bd2e6;
    }
}
.el-dialog{
    div{
        margin: 20px;
        margin-left: 90px;
        font-size: 15px;
    }
}
</style>