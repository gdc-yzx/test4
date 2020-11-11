<template>
  <div class="public_header">
    <div class="public_contents">
      <div class="public_add" @click="addUser">
        <img src="../../assets/add.png" alt="">
        <span class="public_span">新增</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="tableHeaderStyle"
        :cell-style="tableCellStyle"
      >
        <el-table-column
          prop="date"
          label="用户账号"
          width="200"
          sortable
          :filters="filterArr"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="修改时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户角色"
          :filters="filterArr"
          :filter-method="filterHandler"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="企业"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operator">
              <span><img src="../../assets/write.png" alt="" @click="editor"></span>
              <span><img src="../../assets/delete.png" alt="" @click="delRole"></span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          @prev-click="prevClick"
          @next-click="nextClick"
          @current-change="handleCurrentChange"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <!--新建  编辑-->
    <transition name="component-fade" mode="out-in" v-if="showMask">
      <div class="mask">
        <div class="mask_content">
          <div class="content_title">{{title}}<i class="el-icon-close cancel" @click="showDown"></i></div>
          <div class="content_info">
            <el-form label-position="right" label-width="110px" ref="ruleForm" :rules="rules" :model="userManage">
              <el-form-item label="用户账号" prop="account">
                <el-input v-model="userManage.account" size="small"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="name">
                <el-input v-model="userManage.name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="用户角色" prop="role">
                <el-select v-model="userManage.role" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in userRoleArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业" prop="enterprise">
                <el-select v-model="userManage.enterprise" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in enterpriseArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userManage.email" size="small"></el-input>
              </el-form-item>
              <el-form-item label="用户状态" style="text-align: left" v-if="title !== '新增用户'">
                <el-radio-group v-model="userManage.status">
                  <el-radio :label="1">激活</el-radio>
                  <el-radio :label="2">未激活</el-radio>
                  <el-radio :label="3">选项二</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item style="text-align: right">
                <el-button size="mini" type="info" @click="showDown">取消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </transition>
    <!--删除-->
    <transition name="component-fade" mode="out-in" v-if="showDel">
      <div class="mask">
        <div class="mask_content_del" >
          <div class="del_trip">
            <p>是否删除该用户</p>
            <p>
              <el-button size="mini" type="primary" >确认</el-button>
              <el-button size="mini" type="info" @click="showDown">取消</el-button>
            </p>
          </div>
          <i class="el-icon-close cancel" @click="showDown"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
  data() {
    return {
      tableData:[
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ],
      filterArr:[
        {text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'},
      ],
      showMask:false,
      showDel:false,
      title:'',
      userManage:{
        account:'',
        name: '',
        describe: '',
        role:'',
        enterprise:'',
        email:'',
        status:1
      },
      rules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
        ],
        account: [
          {required: true, message: '请输入用户账号', trigger: 'blur'},
        ],
        role: [
          {required: true, message: '请选择用户角色', trigger: 'change'},
        ],
        enterprise: [
          {required: true, message: '请选择企业', trigger: 'change'},
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
      },
      userRoleArr:[
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      enterpriseArr:[
        {
          value: '选项1',
          label: '黄金糕'
        }
      ]
    }
  },
  created() {
  },
  beforeCreate() {
  },
  mounted() {
  },
  methods: {
//表头样式
    tableHeaderStyle(data){
      return  'color:#000;background:#F6F6FF;textAlign: center;font-weight:800;font-size:16px'
    },
    //单元格样式
    tableCellStyle(data){
      //console.log(data);
      return "textAlign: center;color:#767676;font-size:14px;font-weight:200"
    },
    //排序
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    //新增
    addUser(){
      this.title = '新增用户';
      this.showMask = true;
      this.userManage = {
        account:null,
        name:null,
        role:null,
        enterprise:null,
        email:null,
        status:1,
      };
    },
    //编辑
    editor(){
      this.title = '编辑用户';
      this.showMask = true;
      this.userManage = {
        account:null,
        name:null,
        role:null,
        enterprise:null,
        email:null,
        status:1,
      };
    },
    delRole(){
      this.showDel = true;
    },
    //上一页
    prevClick(page){
      console.log('上一页',page)
    },
    //下一页
    nextClick(page){
      console.log('下一页',page)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //取消
    showDown(){
      this.showMask = false;
      this.showDel = false;
      this.userManage = {
        account:null,
        name:null,
        role:null,
        enterprise:null,
        email:null,
        status:1,
      };
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
.mask_content{
  width: 680px;
}
.mask_content_del{
  width: 400px;
  background: #FFFFFF;
  box-shadow: 3px 3px 30px 0px rgba(30, 30, 30, 0.3);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 85px;
  padding-bottom: 60px;
  .del_trip{
    p:nth-child(1){
      font-size: 18px;
      font-family: Lantinghei SC;
      font-weight: 200;
      color: #0D0D0D;
      margin-bottom: 54px;
    }
  }
}
</style>
