<template>
  <div class="home_content">
    <div class="home_content_right">
      <div class="content_top">
        <div class="content_top_info">
          <div class="info_num">
            <div class="info_num_title">
              <p>POP数量</p>
            </div>
            <div class="info_content">
              <span>4/4</span>
              <span>(在线/总数)</span>
            </div>
          </div>
          <div class="info_img">
            <img src="../../assets/POP.png" alt="">
          </div>
        </div>
        <div class="content_top_info">
          <div class="info_num">
            <div class="info_num_title">
              <p>CPE数量</p>
            </div>
            <div class="info_content">
              <span>5/8</span>
              <span>(在线/总数)</span>
            </div>
          </div>
          <div class="info_img">
            <img src="../../assets/CPE.png" alt="">
          </div>
        </div>
        <div class="content_top_info">
          <div class="info_num">
            <div class="info_num_title">
              <p>云网关数量</p>
            </div>
            <div class="info_content">
              <span>80/100</span>
              <span>(在线/总数)</span>
            </div>
          </div>
          <div class="info_img">
            <img src="../../assets/cloud.png" alt="">
          </div>
        </div>
        <div class="content_top_info">
          <div class="info_num">
            <div class="info_num_title">
              <p>总告警数量</p>
            </div>
            <div class="info_content">
              <span>83</span>
              <span>(<span class="warn_type warn_green">警告</span>/<span class="warn_type warn_yellow">主要</span>/<span class="warn_type warn_red">严重</span>)</span>
            </div>
          </div>
          <div class="info_img">
            <img src="../../assets/warn.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="home_echarts">
      <div class="items">
        <div class="items1" id="item_up"></div>
        <div class="items1 items2" id="item_down"></div>
      </div>
      <div class="items">
        <div class="items1">
          <div id="item_cpe"></div>
          <div class="items_change_select">
            <span @click="changTopTab(1)" :class="changCpe === 1 ? 'change_select':'no_change'">上行</span>
            <span @click="changTopTab(2)":class="changCpe === 2 ? 'change_select':'no_change'">下行</span>
          </div>
        </div>
        <div class="items1" style="margin-left: 23px">
          <div id="item_pop"></div>
          <div class="items_change_select">
            <span @click="changPOPTab(1)" :class="changePop === 1 ? 'change_select':'no_change'">上行</span>
            <span @click="changPOPTab(2)":class="changePop === 2 ? 'change_select':'no_change'">下行</span>
          </div>
        </div>
      </div>
      <div class="items">
        <div class="items1" id="item_warn"></div>
        <div class="items1 items2">
          <p class="warn_title">
            <span>设备告警</span>
            <span class="el-icon-more"></span>
          </p>
          <div class="warn_table">
            <el-table
              :data="tableData"
              style="width: 100%"
              :header-cell-style="tableHeaderStyle"
              :cell-style="tableCellStyle"
            >
              <el-table-column
                prop="date"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="name"
                label="设备名称"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="告警级别"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="状态"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="时间"
                >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      chartInstance_up:null,
      chartInstance_down:null,
      chartInstance_cpe:null,
      chartInstance_pop:null,
      chartInstance_warn:null,



      changCpe:1,
      changePop:1,

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
      screenInterval:null
    }
  },
  created() {
  },
  beforeCreate() {
  },
  mounted() {
    this.initEcharts_up();
    this.initEcharts_down();
    this.initEcharts_cpe();
    this.initEcharts_pop();
    this.initEcharts_warn();
    // window.addEventListener('resize', this.screenAdapter)
    this.screenInterval = setInterval(()=>{
      this.screenAdapter()
    },500)
    // this.screenAdapter()
  },
  methods: {
    changTopTab(index){
      this.changCpe = index
    },
    changPOPTab(index){
      this.changePop = index
    },
    initEcharts_up(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_up = this.$echarts.init(document.getElementById('item_up'))
      // 绘制图表
      this.chartInstance_up.setOption({
        title: {
          text: '上行总流量' ,
          x:'40',
          y:'top',
          textStyle:{
            fontWeight:'600',
            fontFamily: 'Microsoft YaHei',
            fontSize:18
          }
        },
        color:['#0458CC'],
        // legend: {
        //   data: ['平均','cpu1', 'cpu2', 'cpu3', 'cpu4', 'cpu5']
        // },
        tooltip: {
          show:true,
          trigger: 'axis',
          backgroundColor:'#3166AC',
          // position: [0,0],
          axisPointer: {
            type: 'none',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter:function (params){
            // console.log(params);
            return params[0].value+'B/S'
          }
        },
        xAxis: {
          type: 'category',
          data: ['01', '02', '03', '03', '05', '06', '07'],
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(B/S)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            name:'平均',
            // stack: '平均',
            stack: 'all',    //堆叠图设置
            areaStyle: {
              color:'#B4DBFF',
              opacity:0.3,
              origin:'start'
            },   //堆叠图设置
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#0458CC'
                }
              },
              emphasis:{
                color: '#fff',
                borderColor:'#172F7F',
                borderWidth:2
              }
            },
            showSymbol: false,


          },
          /*{
            data: [30, 60, 30, 48, 90, 10],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'cpu1',
            stack: 'all',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },
            areaStyle: {}

          }*/
        ]
      });
    },
    initEcharts_down(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_down = this.$echarts.init(document.getElementById('item_down'))
      // 绘制图表
      this.chartInstance_down.setOption({
        title: {
          text: '下行总流量' ,
          x:'40',
          y:'top'
        },
        color:['#0458CC'],
        // legend: {
        //   data: ['平均','cpu1', 'cpu2', 'cpu3', 'cpu4', 'cpu5']
        // },
        tooltip: {
          show:true,
          trigger: 'axis',
          backgroundColor:'#3166AC',
          // position: [0,0],
          axisPointer: {
            type: 'none',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter:function (params){
            // console.log(params);
            return params[0].value+'B/S'
          }
        },
        xAxis: {
          type: 'category',
          data: ['01', '02', '03', '03', '05', '06', '07'],
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(B/S)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            name:'平均',
            // stack: '平均',
            stack: 'all',    //堆叠图设置
            areaStyle: {
              color:'#B4DBFF',
              opacity:0.3,
              origin:'start'
            },   //堆叠图设置
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#0458CC'
                }
              },
              emphasis:{
                color: '#fff',
                borderColor:'#172F7F',
                borderWidth:2
              }
            },
            showSymbol: false,


          },
          /*{
            data: [30, 60, 30, 48, 90, 10],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'cpu1',
            stack: 'all',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },
            areaStyle: {}

          }*/
        ]
      });
      // window.addEventListener("resize", function () {
      //   this.chartInstance_up.resize();
      // })
    },
    initEcharts_cpe(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_cpe = this.$echarts.init(document.getElementById('item_cpe'))
      // 绘制图表
      this.chartInstance_cpe.setOption({
        title: {
          text: 'CPE隧道带宽TOP10' ,
          x:'40',
          y:'top'
        },
        color:['#0458CC'],
        // tooltip: {},
        xAxis: {
          type: 'category',
          data: ['01', '02', '03', '03', '05', '06', '07','08','09','10'],
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(B)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'bar',
            barWidth:'20',
            name:'平均',
            // itemStyle : {
            //   normal : {
            //     lineStyle:{
            //       color:'#0458CC'
            //     }
            //   },
            // },
          },
        ]
      });
      // window.addEventListener("resize", function () {
      //   this.chartInstance_up.resize();
      // })
    },
    initEcharts_pop(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_pop = this.$echarts.init(document.getElementById('item_pop'))
      // 绘制图表
      this.chartInstance_pop.setOption({
        title: {
          text: 'POP隧道带宽TOP10' ,
          x:'40',
          y:'top'
        },
        color:['#0458CC'],
        // tooltip: {},
        xAxis: {
          type: 'category',
          data: ['01', '02', '03', '03', '05', '06', '07','08','09','10'],
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(B)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'bar',
            barWidth:'20',
            name:'平均',
            // itemStyle : {
            //   normal : {
            //     lineStyle:{
            //       color:'#0458CC'
            //     }
            //   },
            // },
          },
        ]
      });
      // window.addEventListener("resize", function () {
      //   this.chartInstance_up.resize();
      // })
    },
    initEcharts_warn(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_warn = this.$echarts.init(document.getElementById('item_warn'))
      // 绘制图表
      this.chartInstance_warn.setOption({
        title: {
          text: '告警个数TOP10' ,
          x:'40',
          y:'top'
        },
        color:['#0458CC'],
        // tooltip: {},
        xAxis: {
          type: 'category',
          data: ['01', '02', '03', '03', '05', '06', '07','08','09','10'],
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(个)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'bar',
            barWidth:'20',
            name:'平均',
            // itemStyle : {
            //   normal : {
            //     lineStyle:{
            //       color:'#0458CC'
            //     }
            //   },
            // },
          },
        ]
      });
      // window.addEventListener("resize", function () {
      //   this.chartInstance_up.resize();
      // })
    },
    //屏幕适配
    screenAdapter () {
      this.chartInstance_up.resize()
      this.chartInstance_down.resize()
      this.chartInstance_cpe.resize()
      this.chartInstance_pop.resize()
      this.chartInstance_warn.resize()
    },

    //表头样式
    tableHeaderStyle(data){
      return  'color:#000;background:#F6F6FF;textAlign: center;font-weight:500;font-size:14px;'
    },
    //单元格样式
    tableCellStyle(data){
      //console.log(data);
      return "textAlign: center;color:#767676;font-size:14px;font-weight:200"
    },
  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    // window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.screenInterval)
  },
  watch:{
  }
}
</script>

<style scoped lang="scss">

.home_content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  padding: 30px 70px;
  box-sizing: border-box;
  //padding-right: 40px;
}
.home_content_right{
  width: 100%;
  height: 140px;
  //background-color: red;
  .content_top {
    width: 100%;
    height: 140px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    //margin-top: 30px;

    .content_top_info {
      flex: 1;
      height: 100%;
      background: linear-gradient(90deg, #407ED0 0%, #3166AC 100%);
      box-shadow: 0 2px 7px 0 rgba(25, 103, 178, 0.3);
      border-radius: 5px;
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;

      &:nth-child(2) {
        margin: 0 10px;
      }

      &:nth-child(3) {
        margin-right: 10px;
      }

      .info_img {
        flex: 1;
        height: 100%;
        //background: url("../../assets/passageway.png") no-repeat center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        img {
          width: 79px;
          height: 79px;
        }
      }

      .info_num {
        flex: 2;
        height: 100%;
        //background-color: yellow;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .info_num_title {
          width: 100%;
          height: 100%;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: 200;
          color: #F9F7FF;
          flex: 1;
          //background-color: red;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          box-sizing: border-box;
          //padding-left: 20px;
          padding-bottom: 5px;

          p {
            margin-left: 25px;
          }
        }

        .info_content {
          width: 100%;
          flex: 1;
          //background-color: saddlebrown;
          //padding: 10px;
          box-sizing: border-box;
          text-align: left;
          position: relative;

          span:nth-child(1) {
            font-size: 40px;
            font-family: DIN Alternate;
            font-weight: bold;
            color: #FFFFFF;
            margin-left: 25px;
          }

          span:nth-child(2) {
            margin-left: 5px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 300;
            color: #F9F7FF;
          }

          .warn_type {
            font-size: 14px !important;
            font-family: "Microsoft YaHei";
            font-weight: 500 !important;
            margin-left: 0 !important;
          }
          .warn_green{
            color: #3DFFB8 !important;
          }
          .warn_yellow{
            color: #FFF95B !important;
          }
          .warn_red{
            color:#FF0000;
          }
        }
      }
    }
  }
}
.home_echarts{
  flex: 2;
  margin-top: 40px;
  width: 100%;
  //height: 100%;
  //background-color: skyblue;
  padding-bottom: 40px;
  box-sizing: border-box;
  .items{
    //width: 100%;
    height: 370px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .items1{
      height: 100%;
      flex: 1;
      background: #FFFFFF;
      border: 1px solid #E1E5E9;
      box-shadow: 2px 1px 10px 0px rgba(213, 213, 213, 0.3);
      border-radius: 5px;
      padding-top: 15px;
      box-sizing: border-box;
      position: relative;
      .items_change_select{
        position: absolute;
        top: 20px;
        right: 50px;
        width: 150px;
        height: 30px;
        border:1px solid #3166AC ;
        border-radius: 15px;
        text-align: left;
        overflow: hidden;
        //border-top-right-radius: 15px;
        //border-bottom-right-radius: 15px;
        span{
          text-align: center;
          float: left;
          width: 75px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
        }
        .change_select{
          background-color: #3166AC;
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 200;
          color: #FFFFFF;
          border: none;
        }
        .no_change{
          background-color: #fff;
          font-size: 14px;
          font-family: Lantinghei SC;
          font-weight: 200;
          color: #7E7E7E;
          border: none;
        }
      }
    }
    #item_cpe{
      width: 100%;
      height: 100%;
    }
    #item_pop{
      width: 100%;
      height: 100%;
    }
    .items2{
      margin-left: 23px;
    }
    .warn_title{
      height: 20px;
      //background-color: skyblue;
      span:nth-child(1){
        margin-left: 60px;
        float: left;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        line-height: 20px;
        color: #000;
      }
      span:nth-child(2){
        width: 19px;
        height: 19px;
        float: right;
        border: 1px solid #3166AC;
        color: #3166AC;
        border-radius: 50%;
        line-height: 19px;
        margin-right: 60px;
        cursor: pointer;
      }
    }
    .warn_table{
      padding: 0 60px;
      margin-top: 32px;
      box-sizing: border-box;
      .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 40px;
      }
    }
  }
}
</style>
