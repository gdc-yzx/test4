<template>
  <div class="public_header">
    <div class="public_contents">
      <div class="search">
        <div class="search_content">
          <span class="search_title">用户</span>
          <span>
            <el-select v-model="userName" placeholder="请选择" size="small">
              <el-option
                v-for="item in userArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="search_content">
          <span class="search_title">操作时间</span>
          <span>
            <el-select v-model="operateTime" placeholder="请选择" size="small">
              <el-option
                v-for="item in operateTimeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span style="margin-left: 60px">
            <el-button type="primary" size="small">查询</el-button>
          </span>
        </div>

      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="tableHeaderStyle"
        :cell-style="tableCellStyle"
      >
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span v-text="getIndex(scope.$index)"> </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="用户名"
          sortable
          :filters="filterArr"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="IP地址"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="动作"
          :filters="filterArr"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作对象"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="结果"
          :filters="filterArr"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作时间"
        >
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

  </div>
</template>

<script>
export default {
  name: "operate",
  data() {
    return {
      userName:null,
      userArr:[
        {
          value:'1',
          label:'用户1'
        }
      ],
      operateTime:null,
      operateTimeArr:[
        {
          value:'1',
          label:'最近一小时'
        },
        {
          value:'2',
          label:'最近一天'
        },
        {
          value:'3',
          label:'最近七天'
        },
      ],
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
      currentPage:1,
      pageSize:0
    }
  },
  created() {
  },
  beforeCreate() {
  },
  mounted() {
  },
  methods: {
    //获取表格序号
    getIndex($index) {
      //表格序号
      return (this.currentPage - 1) * this.pageSize + $index + 1
    },
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
  }
}
</script>

<style scoped lang="scss">
.search{
  margin-bottom: 20px;
}
.search_title{
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #000000;
}
</style>
