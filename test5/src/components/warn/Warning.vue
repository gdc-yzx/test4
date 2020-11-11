<template>
  <div class="warn_content">
    <div class="warn_header">
      <span :class="selectTab === 1 ? 'selected':''" @click="selectTabs(1)">设备告警</span>
      <span :class="selectTab === 2 ? 'selected':''" @click="selectTabs(2)">系统告警</span>
    </div>
    <div class="device" v-show="selectTab == 1">
      <div class="search">
        <div class="search_content">
          <span class="search_title">设备名称</span>
          <span>
            <el-input v-model="deviceName" placeholder="请输入设备名" size="small"></el-input>
          </span>
        </div>
        <div class="search_content">
          <span class="search_title">告警级别</span>
          <span>
            <el-select v-model="warnType" placeholder="请选择" size="small">
              <el-option
                v-for="item in warnTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="select_date">
          <span class="search_title">时间</span>
          <span>
            <el-date-picker
              v-model="selectedTime"
              type="datetimerange"
              range-separator="至"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
    </el-date-picker>
          </span>
          <span style="margin-left: 60px">
            <el-button type="primary" size="mini">查询</el-button>
          </span>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="tableHeaderStyle"
        :cell-style="tableCellStyle"
      >
        <el-table-column
          prop="date"
          label="告警编码"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          sortable
          :filters="filterArr"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="模块"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="告警级别"
          sortable
          :filters="filterArr"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column label="状态"
                         align="center"
                         sortable
                         :filters="filterArr"
                         :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <span style="color: red" v-if="scope.row.status == 1">未处理</span>
            <span style="color: #00FF48" v-if="scope.row.status == 2">已处理</span>
            <!--              <span style="color: red">未处理</span>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="时间"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span style="color: #1967B2;font-size: 14px;font-weight: 500;cursor: pointer">详情</span>
            <!--              <span style="color: red">未处理</span>-->
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
      <i class="el-icon-download warn_download"></i>
    </div>

    <div class="device" v-show="selectTab == 2">
      <div class="search">
        <div class="search_content">
          <span class="search_title">告警码</span>
          <span>
<!--            <el-input v-model="deviceName" placeholder="请输入设备名" size="small"></el-input>-->
            <el-select v-model="warnCode" placeholder="请选择" size="small">
              <el-option
                v-for="item in warnCodeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="search_content">
          <span class="search_title">产生时间</span>
          <span>
            <el-select v-model="produceTime" placeholder="请选择" size="small">
              <el-option
                v-for="item in produceTimeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="search_content_time">
          <span class="search_title">恢复时间</span>
          <span>
            <el-date-picker
              v-model="recoverTime"
              type="datetimerange"
              range-separator="至"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
    </el-date-picker>
          </span>
          <span style="margin-left: 60px">
            <el-button type="primary" size="mini">查询</el-button>
          </span>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="tableHeaderStyle"
        :cell-style="tableCellStyle"
      >
        <el-table-column
          prop="date"
          label="告警编码"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="级别"
        >
        </el-table-column>
        <el-table-column label="时间"
                         align="center"
        >
          <template slot-scope="scope">
            <p>2020-10-15 12:28:45</p>
            <p>2020-10-15 12:28:45</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="时间"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="位置"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="告警码"
        >
        </el-table-column>
        <el-table-column label="告警说明"
                         align="center"
        >
          <template slot-scope="scope">
            <p>设备与控制器断开</p>
            <p>原因：心跳中断</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span style="color: #1967B2;font-size: 14px;font-weight: 500;cursor: pointer">详情</span>
            <!--              <span style="color: red">未处理</span>-->
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
      <i class="el-icon-download warn_download"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "warning",
  data() {
    return {
      selectTab: 1,
      deviceName:null,
      warnType:'1',
      warnTypeArr:[
        {
          value:'1',
          label:'全部'
        },
        {
          value:'2',
          label:'严重警告'
        },
        {
          value:'3',
          label:'警告'
        },
        {
          value:'4',
          label:'通知'
        },
      ],
      selectedTime:null,
      tableData:[
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status:1
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          status:2
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
      pageSize:0,
      warnCode:null,
      warnCodeArr:[
        {
          value:'1',
          label:'abc'
        }
      ],
      produceTime:null,
      produceTimeArr:[
        {
          value:'1',
          label:'最近1天'
        }
      ],
      recoverTime:null
    }
  },
  created() {
  },
  beforeCreate() {
  },
  mounted() {
  },
  methods: {
    selectTabs(index){
      this.selectTab = index
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
.warn_content{
  width: 100%;
  height: 100%;
  //background-color: gold;
  padding: 30px 70px;
  box-sizing: border-box;
  .warn_header{
    width: 100%;
    height: 40px;
    //background-color: skyblue;
    text-align: left;
    span:nth-child(1){
      margin-right: 32px;
    }
    span{
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      padding: 7px 14px;
      cursor: pointer;
    }
    .selected{
      font-size: 18px;

      font-weight: 400;
      color: #1F78CD;
      border-bottom: 2px solid #1F78CD;

    }
  }
  .device{
    width: 100%;
    //height: 100%;
    background-color: #fff;
    margin-top: 16px;
    padding: 40px 49px;
    box-sizing: border-box;
    position: relative;
    .search{
      margin-bottom: 27px;
    }
    .warn_download{
      position: absolute;
      top: 35px;
      right: 50px;
      font-size: 35px;
      color: #407ED0;
      cursor: pointer;
    }
  }
}

</style>
