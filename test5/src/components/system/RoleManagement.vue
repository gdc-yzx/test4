<template>
  <div class="role">
    <div class="user_role content_distance">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户角色" name="first"></el-tab-pane>
        <el-tab-pane label="企业角色" name="second"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="role_table">
      <div class="role_add" @click="addRole">
        <img src="../../assets/add.png" alt="">
        <span >新增</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="tableHeadeStyle"
        :cell-style="tableCellStyle"

      >
        <el-table-column
          prop="date"
          :label="activeName == 'first' ?'用户角色名称':'企业角色名称'"
          width="200"
          sortable
          :filters="filterArr"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="描述"
          width="180">
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
    </div>


    <!-- 新建和编辑-->
    <transition name="component-fade" mode="out-in" v-if="showMask">
      <div class="mask">
        <div class="mask_content" v-if="activeName=='first' && !showDel">
          <div class="content_title">{{title}}<i class="el-icon-close cancel" @click="showDown"></i></div>
          <div class="content_info">
            <el-form label-position="right" label-width="110px" ref="ruleForm" :rules="rules" :model="formLabelAlign">
              <el-form-item label="用户角色名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="formLabelAlign.describe"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button size="mini" type="info" @click="showDown">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="mask_content" v-if="activeName=='second' && !showDel">
          <div class="content_title">{{title}}<i class="el-icon-close cancel" @click="showDown"></i></div>
          <div class="content_info">
            <el-form label-position="right" label-width="110px" ref="ruleForm" :rules="rules" :model="formLabelAlign">
              <el-form-item label="企业角色名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="formLabelAlign.describe"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button size="mini" type="info" @click="showDown">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="mask_content_del" v-if="showDel">
          <div class="del_trip">
            <p>是否删除该{{title}}</p>
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
  name: "RoleManagement",
  data() {
    return {
      activeName:'first',
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
      formLabelAlign: {
        name: '',
        describe: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
        ],
      },
      showMask:false,
      showDel:false,
      contentTitle:null,
    }
  },
  created() {
  },
  beforeCreate() {
  },
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //表头样式
    tableHeadeStyle(data){
      return  'color:#000;background:#F6F6FF;textAlign: center;font-weight:400;font-size:16px'
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
    addRole(){
      if (this.activeName=='first'){
        this.title = '新增用户角色';
      }else{
        this.title = '新增企业角色';
      }
      this.showMask = true;
      this.showDel = false;
      this.formLabelAlign.nama = null;
      this.formLabelAlign.describe = null;
    },
    //取消
    showDown(){
      this.showMask = false;
      this.formLabelAlign.nama = null;
      this.formLabelAlign.describe = null;
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
    //编辑
    editor(){
      this.showMask = true;
      this.showDel = false;
      if (this.activeName=='first'){
        this.title = '编辑用户角色';
        this.formLabelAlign.nama = null;
        this.formLabelAlign.describe = null;
      }else{
        this.title = '编辑企业角色';
        this.formLabelAlign.nama = null;
        this.formLabelAlign.describe = null;
      }
    },
    //删除
    delRole(){
      this.showMask = true;
      this.showDel = true;
      if(this.activeName =='first'){
        this.title = '用户角色';
      }else{
        this.title = '企业角色';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.role{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 0 70px;
  box-sizing: border-box;
  .user_role{
    width: 100%;
    height: 50px;
    //margin-top: 20px;
    background-color: #f9f7ff;
  }
  .role_table{
    padding: 38px 49px;
    box-sizing: border-box;
    width: 100%;
    //height: 400px;
    background-color: #fff;

    .role_add{
      width: 120px;
      height: 40px;
      background: #FFFFFF;
      border: 1px solid #1F78CD;
      border-radius: 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-bottom: 20px;
      span{
        font-size: 16px;
        font-family: Lantinghei SC;
        font-weight: 200;
        color: #5D99D0;
        margin-left: 10px;
      }
    }
    .tableStyle{
      height: 60px;
      background: #F6F6FF;
    }
    .operator{
      span{
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  .mask_content{
    width: 680px;
    .content_title{
      text-align: center;
      background: #407ED0;
      border-top-left-radius:5px;
      border-top-right-radius:5px;
      height: 76px;
      line-height: 76px;
      font-size: 18px;
      font-family: Lantinghei SC;
      font-weight: 600;
      color: #FFFFFF;
      position: relative;
    }
    .content_info{
      //background-color: #fff;
      padding: 40px 110px 40px 63px;
    }
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
}

</style>
