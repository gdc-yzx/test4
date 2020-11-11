<template>
  <div class="control_content">
    <div class="control_content_left">
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        unique-opened
      >
        <el-submenu index="1">
          <template slot="title">
            <span class="align_text">广大通</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">直销最终用户A</el-menu-item>
            <el-menu-item index="1-2">直销最终用户A</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span class="align_text">广大通</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">直销最终用户A</el-menu-item>
            <el-menu-item index="2-2">直销最终用户A</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="control_content_right">
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
              <p>总通道数量</p>
            </div>
            <div class="info_content">
              <span>80/100</span>
              <span class="aisle">(建连/总数)</span>
            </div>
          </div>
          <div class="info_img">
            <img src="../../assets/passageway.png" alt="">
          </div>
        </div>
        <div class="content_top_info">
          <div class="info_num">
            <div class="info_num_title">
              <p>告警个数</p>
            </div>
            <div class="info_content">
              <span>83</span>
              <span>个</span>
            </div>
          </div>
          <div class="info_img">
            <img src="../../assets/warn.png" alt="">
          </div>
        </div>
      </div>
      <div class="content_vis">
        <div id="vis_network"></div>
        <div class="network_info">
          <div class="info_content">
            <p>广大通CPE1-AC000FT</p>
            <p><span>所属租户：</span>广大通电子科技有限公司</p>
            <p><span>所属站点：</span>广大通电子科技有限公司</p>
            <p><span>设备类型：</span>广大通电子科技有限公司</p>
            <p><span>设备型号：</span>广大通电子科技有限公司</p>
            <p><span>管理地址：</span>广大通电子科技有限公司</p>
            <p><span>公司网址：</span>广大通电子科技有限公司</p>
            <p><span>MAC地址：</span>广大通电子科技有限公司</p>
            <p><span>序列号：</span>广大通电子科技有限公司</p>
            <p><span>版本号：</span>广大通电子科技有限公司</p>
          </div>
          <div class="info_content" style="border: none;margin-top: 20px">
            <p style="margin-bottom: 10px"><span style="font-weight: 600;font-size: 14px;">所属租户：</span></p>
            <p><span>连接状态：</span><span class="normal">已连接</span></p>
            <p><span>工作状态：</span><span class="normal">正常</span></p>
            <p><span>认证状态：</span><span class="normal">认证通过</span></p>
          </div>
        </div>
      </div>
      <div class="content_time">
        <span :class="selectedStyle === 1 ?'select_span':''" @click="changTab(1)">日统计</span>
        <span :class="selectedStyle === 2 ?'select_span':''" @click="changTab(2)">周统计</span>
        <span :class="selectedStyle === 3 ?'select_span':''" @click="changTab(3)">月统计</span>
      </div>
      <div class="control_main">
        <div class="main_all">
          <p>总流量</p>
          <div class="main_all_legend">
            <div>
              <span>&nbsp;</span>
              <span><i class="i_upload"></i>上行</span>
              <span><i class="i_down"></i>下行</span>
            </div>
            <div>
              <span>最新</span>
              <span>0.3333GB/s</span>
              <span>0.3333GB/s</span>
            </div>
            <div>
              <span>最小</span>
              <span>0.3333GB/s</span>
              <span>0.3333GB/s</span>
            </div>
            <div>
              <span>最大</span>
              <span>0.3333GB/s</span>
              <span>0.3333GB/s</span>
            </div>
            <div>
              <span>平均</span>
              <span>0.3333GB/s</span>
              <span>0.3333GB/s</span>
            </div>
          </div>
          <div id="main_flow">
            图表
          </div>
        </div>
        <div class="main_cpe">
          <p>CPE节点峰值带宽统计</p>
          <div id="pile"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlowControl",
  data() {
    return {
      selectedStyle: 1,
      chartInstane_all: null,
      chartInstane_pile: null,
      chartInstane_vis: null,

      times: [],

      imgUrl: '../../assets/',
      EDGE_LENGTH_MAIN: 150,
      nodesArray: [

        // {id: 0, label: "0", group: 0},

        {id: 1, label: "1", image: require('../../assets/control-pop.png'), shape: "image",},
        {id: 2, label: "2", image: require('../../assets/control-pop.png'), shape: "image",},
        {id: 3, label: "3", image: require('../../assets/control-pop.png'), shape: "image",},
        {id: 4, label: "4", image: require('../../assets/control-pop.png'), shape: "image",},
        //5-1 6-1
        {id: 5, label: "5", image: require('../../assets/control-cpe.png'), shape: "image",},
        {id: 6, label: "6", image: require('../../assets/control-cpe.png'), shape: "image",},

        //7-2 8-2 9-2
        {id: 7, label: "7", image: require('../../assets/control-cpe.png'), shape: "image",},
        {id: 8, label: "8", image: require('../../assets/control-cpe.png'), shape: "image",},
        {id: 9, label: "9", image: require('../../assets/control-cpe.png'), shape: "image",},

        //10-3 11-3 11-4
        {id: 10, label: "10", image: require('../../assets/off-line.png'), shape: "image",},
        {id: 11, label: "11", image: require('../../assets/control-cpe.png'), shape: "image",},
        //12-4
        {id: 12, label: "12", image: require('../../assets/control-cpe.png'), shape: "image",},

      ],
      edgesArray: [

        {from: 1, to: 2, length: this.EDGE_LENGTH_MAIN},
        {from: 1, to: 3, length: this.EDGE_LENGTH_MAIN},
        {from: 1, to: 4, length: this.EDGE_LENGTH_MAIN},
        {from: 2, to: 3, length: this.EDGE_LENGTH_MAIN},
        {from: 2, to: 4, length: this.EDGE_LENGTH_MAIN},
        {from: 3, to: 4, length: this.EDGE_LENGTH_MAIN},


        {from: 5, to: 1, length: this.EDGE_LENGTH_MAIN},
        {from: 6, to: 1, length: this.EDGE_LENGTH_MAIN},

        {from: 7, to: 2, length: this.EDGE_LENGTH_MAIN},
        {from: 8, to: 2, length: this.EDGE_LENGTH_MAIN},
        {from: 9, to: 2, length: this.EDGE_LENGTH_MAIN},

        {from: 10, to: 3, length: this.EDGE_LENGTH_MAIN},
        {from: 11, to: 3, length: this.EDGE_LENGTH_MAIN},


        {from: 12, to: 4, length: this.EDGE_LENGTH_MAIN},
        {from: 11, to: 4, length: this.EDGE_LENGTH_MAIN},


      ],
      options: {},
      data: {},

      screenInterval:null

    }
  },
  created() {
    this.times = this.get24Hour();
  },
  beforeCreate() {
  },
  mounted() {
    this.initEcharts_all();
    this.initEcharts_pile();
    // window.addEventListener('resize', this.screenAdapter);
    this.initEcharts_vis();
    this.screenInterval = setInterval(()=>{
      this.screenAdapter()
    },500)
    // this.getVisData();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.selectedStyle = 1;
      this.times = this.get24Hour();
      this.changTab(1)
    },
    changTab(index) {
      this.selectedStyle = index;
      if (index == 1) {
        this.times = []
        this.times = this.get24Hour();
      }
      if (index == 2) {
        this.times = []
        this.times = this.formatWeek(7);
      }
      if (index == 3) {
        this.times = []
        this.times = this.formatWeek(30);
      }
      this.initEcharts_all()
    },
    //格式化时间
    formatTime(chinaStandard) {
      let date = new Date(chinaStandard);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      let minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      let time = h + ':' + minute;
      return time
    },
    //24小时
    get24Hour() {
      const timesArr = [];
      for (let i = 0; i < 24; i++) {
        let frontOneHour = new Date(new Date().getTime() - i * 60 * 60 * 1000);
        this.formatTime(frontOneHour)
        timesArr.push(this.formatTime(frontOneHour))
        // console.log('前',i,'个小时',new Date(new Date().getTime() - i * 60 * 60 * 1000)) // 前N个小时
      }
      return timesArr
      // console.log(this.times);
    },
    //格式一周的时间
    formatWeek(date) {
      const arr = []
      for (let i = 1; i <= date; i++) {
        const time = new Date(new Date().setDate(new Date().getDate() + i - 7));
        const year = time.getFullYear();
        const month = `0${time.getMonth() + 1}`.slice(-2);
        const strDate = `0${time.getDate()}`.slice(-2);
        arr.push(`${month}-${strDate}`);
      }
      return arr

    },
    //总流量
    initEcharts_all() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_all = this.$echarts.init(document.getElementById('main_flow'))
      // 绘制图表
      this.chartInstane_all.setOption({
        // title: {
        //   text: 'WAN流量' ,
        //   x:'center',
        //   y:'bottom'
        // },
        color: ['#FC7270', '#0559CC'],
        // legend: {
        //   data: ['接入流量','输出流量'],
        //   x:'right',
        //   padding:[20,60,0,0]
        // },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: this.selectedStyle == 2 ? 0 : 45
          },
          // nameTextStyle:{
          //   color: '#949EAD'
          // }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          scale: true,
          max: 10,
          min: 0,
          splitNumber: 5,
          axisLabel: {formatter: '{value}'},
          name: '(B/S)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name: '上行',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#FC7270'
                }
              }
            },
          },
          {
            data: [3, 6, 3, 4, 9, 1],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name: '下行',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#0559CC'
                }
              }
            },

          }
        ]
      });
    },


    initEcharts_vis() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_vis = this.$echarts.init(document.getElementById('vis_network'))
      let options = {
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 50,
            // symbolRotate:
            roam: false,
            label: {
              normal: {
                show: true,//是否显示标签。
                // position : 'inside',//标签的位置。['50%', '50%'] [x,y]
                position: 'bottom',//标签的位置。['50%', '50%'] [x,y]
                distance:-8,
                textStyle: { //标签的字体样式
                  color: '#3E3E3E', //字体颜色
                  fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                  fontWeight: 'bolder',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                  fontFamily: 'sans-serif', //文字的字体系列
                  fontSize: 12, //字体大小
                }
              },
            },
            focusNodeAdjacency:false,
            force: {
              repulsion:600,
              edgeLength:40,
              // layoutAnimation : false
            },
            // edgeSymbol: ['circle', 'arrow'],
            // edgeSymbolSize: [4, 10],
            // edgeLabel: {
            //   fontSize: 20
            // },
            data: [
              {
                name: '节点1',
                symbol: 'image://' + require('../../assets/control-pop.png')
              },
              {
                name: '节点2',
                symbol: 'image://' + require('../../assets/control-pop.png')
              },
              {
                name: '节点3',
                symbol: 'image://' + require('../../assets/control-pop.png')
              },
              {
                name: '节点4',
                symbol: 'image://' + require('../../assets/control-pop.png')
              },
              {
                name: '节点5',
                symbol: 'image://' + require('../../assets/control-cpe.png')
              },
              {
                name: '节点6',
                symbol: 'image://' + require('../../assets/control-cpe.png')
              },
              {
                name: '节点7',
                ids: 234,
                symbol: 'image://' + require('../../assets/control-cpe.png')
              },
              {
                name: '节点8',
                symbol: 'image://' + require('../../assets/control-cpe.png')
              },
              {
                name: '节点9',
                symbol: 'image://' + require('../../assets/control-cpe.png')
              },
              {
                name: '节点10',
                symbol: 'image://' + require('../../assets/control-cpe.png')
              },

              {
                name: '节点11',
                symbol: 'image://' + require('../../assets/control-cpe.png')
              },
              {
                name: '节点12',
                symbol: 'image://' + require('../../assets/control-cpe.png')
              },
              {
                name: '节点13',
                symbol: 'image://' + require('../../assets/off-line.png')
              }
            ],
            // links: [],
            links: [
              {
                source: '节点1',
                target: '节点2'
              },
              {
                source: '节点2',
                target: '节点3'
              },
              {
                source: '节点3',
                target: '节点4'
              },
              {
                source: '节点4',
                target: '节点1'
              },
              {
                source: '节点5',
                target: '节点1'
              },
              {
                source: '节点6',
                target: '节点1'
              },
              {
                source: '节点7',
                target: '节点1'
              },
              {
                source: '节点8',
                target: '节点2'
              },
              {
                source: '节点9',
                target: '节点2'
              },
              {
                source: '节点10',
                target: '节点2'
              },
              {
                source: '节点11',
                target: '节点3'
              },
              {
                source: '节点12',
                target: '节点3'
              },
              {
                source: '节点13',
                target: '节点4'
              },
              {
                source: '节点13',
                target: '节点3'
              },

            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              color : '#16B778',
            }
          }
        ]
      }
      // 绘制图表
      this.chartInstane_vis.setOption(options);
      this.chartInstane_vis.getZr().on('click', function (params) {
        console.log('点击了节点', params);
      })
      this.chartInstane_vis.on('click', function (params) {
        console.log('点击了节点666', params);
      })
    },
    //CPE节点
    initEcharts_pile() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_pile = this.$echarts.init(document.getElementById('pile'))
      // 绘制图表
      this.chartInstane_pile.setOption({
        /*title: {
          text: '资源总览',
          left:'20px',
          textStyle: {
            color: "#436EEE",
            fontSize: 17,
          }
        },*/
        // tooltip: {
        //   trigger: "axis",
        // },
        legend: {
          itemWidth: 39,
          itemHeight: 20,
          data: ['剩余带宽', '已用带宽'],
        },
        // color:['#7CB4FF','#3166AC'],
        xAxis: {
          data: ["网络设备", "服务器", "应用", "其他", "虚拟机", "存储"],
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            // rotate: this.selectedStyle == 2 ? 0 : 45
          },
        },
        yAxis: {
          splitLine: {
            show: true,
          },
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          scale: true,
          max: 10,
          min: 0,
          splitNumber: 5,
          axisLabel: {formatter: '{value}'},
          name: '(B/S)',
        },
        series: [
          {
            name: '已用带宽',
            type: 'bar',
            stack: '带宽',
            data: [0, 2, 4, 6, 1, 4],
            barWidth: 20,
            itemStyle: {
              normal: {color: "#3166AC"},
            }
          },
          {
            name: '剩余带宽',
            type: 'bar',
            stack: '带宽',
            data: [5, 2, 3, 1, 1, 2],
            barWidth: 20,
            itemStyle: {
              normal: {color: "#7CB4FF"},
            }
          },

        ],
        dataZoom: [
          /*{
            type:'slider',
            start:0,
            end:100,
            show:true,
            backgroundColor: '#92D0EF',
            handleStyle: {
              borderRadius: 20,
            },
            height: 10,//组件高度
            handleIcon:'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
            dataBackground:{
              lineStyle:{
                color:'#92D0EF'
              }
            }
          }*/
          {
            id: "dataZoomX",
            type: "slider",
            backgroundColor: "#92D0EF",
            fillerColor: "#92D0EF",
            showDataShadow: false,
            height: 13,
            // zoomLock:true,
            right: 60,
            left: 60,
            bottom: 15,
            handleSize: "200%", // 手柄大小
            borderColor: "none",
            handleIcon: // 用于画手柄
            // "M0,0 v9.7h5 v-9.7h-5 Z", // 画一个长方形
              "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z",// 画一个圆形
            handleStyle: {
              color: '#fff',
              global: true, // 缺省为 false
              shadowBlur: 6,
              shadowColor: 'rgba(123, 154, 204, 0.5)',
              shadowOffsetX: 0, // 阴影偏移x轴多少
              shadowOffsetY: 0 // 阴影偏移y轴多少
            },
            borderRadius: '20'
          },
        ]
      });
    },
    //屏幕适配
    screenAdapter() {
      this.chartInstane_all.resize();
      this.chartInstane_pile.resize();
      this.chartInstane_vis.resize();
    },


  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    // window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.screenInterval)
  },
 /* watch: {
    changeScreen() {
      this.screenAdapter() // 完成屏幕的适配
      this.initEcharts_all();
      this.initEcharts_pile();
      this.initEcharts_vis();
    }
  }*/
}
</script>

<style scoped lang="scss">
.content_top {
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;

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

        .aisle {
          position: absolute;
          top: 30%;
          right: -20px;
        }
      }
    }
  }
}

.content_vis {
  width: 100%;
  height: 550px;
  background-color: #fff;
  margin-top: 30px;
  border: 1px solid #E1E5E9;
  box-shadow: 2px 1px 10px 0 rgba(213, 213, 213, 0.3);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  //padding-right: 80px;
  box-sizing: border-box;

  #vis_network {
    height: 100%;
    flex: 1;
    //width: 800px;
    //background-color: goldenrod;
  }
  .network_info{
    //flex: 1;
    margin-right: 100px;
    //height: 90%;
    width: 310px;
    background: #F3F8FF;
    box-shadow: 1px 1px 4px 0px rgba(191, 191, 191, 0.5);
    border-radius: 10px;
    //padding: 38px 34px;
    padding-left: 20px;
    padding-top: 10px;
    box-sizing: border-box;
    .info_content{
      p{
        text-align: left;
        margin-bottom: 10px;

        font-size: 12px;
        font-family: "Microsoft YaHei";
        //font-weight: 200;
        color: #3E3E3E;
        .normal{

          font-size: 12px;
          font-family: "Microsoft YaHei";
          font-weight: 200;
          color: #35D48F;
        }
      }
      p:nth-child(1){
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #3E3E3E;
        margin-bottom: 30px;
        text-align: left;
      }
      p>span{
        font-size: 12px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #3E3E3E;
      }
      border-bottom: 1px solid #CAE0FF;
      padding-bottom: 5px;
      box-sizing: border-box;
    }
  }
}

.content_time {
  height: 89px;
  display: flex;
  flex-direction: row;
  background-color: #f9f7ff;
  padding-top: 20px;
  box-sizing: border-box;

  span {
    width: 120px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #CACACA;
    border-radius: 5px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    //font-weight: 200;
    color: #000000;
    line-height: 40px;
    cursor: pointer;
    margin-right: 11px;
    font-weight: 500;
  }

  .select_span {
    color: #fff;
    background: #3166AC;
    border-radius: 5px;
    border: 1px solid #3166AC;
  }
}

.control_main {
  width: 100%;
  height: 550px;
  background-color: #f9f7ff;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .main_cpe {
    width: 49%;
    flex: 1;
    height: 100%;
    background-color: red;
    border: 1px solid #E1E5E9;
    box-shadow: 2px 1px 10px 0 rgba(213, 213, 213, 0.3);
    border-radius: 5px;
  }

  .main_all {
    margin-right: 20px;
    width: 49%;
    flex: 1;
    height: 100%;
    background-color: #fff;
    border: 1px solid #E1E5E9;
    box-shadow: 2px 1px 10px 0 rgba(213, 213, 213, 0.3);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px;
    box-sizing: border-box;

    p {
      flex: 1;
      //background-color: skyblue;
      font-size: 18px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #000000;
    }

    .main_all_legend {
      flex: 2;
      //background-color: palegoldenrod;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        span {
          font-family: "Microsoft YaHei";
          font-weight: 500;
          color: #000000;
          font-size: 14px;

          i {
            display: inline-block;
            width: 25px;
            height: 3px;
            //line-height: 11px;
          }

          .i_upload {
            font-size: 16px;
            background-color: #FC7270;
          }

          .i_down {
            font-size: 16px;
            background-color: #0559CC;
          }
        }

        span:nth-child(1) {
          font-size: 16px;
        }

        span:nth-child(2) {
          margin-top: 21px;
          margin-bottom: 18px;
        }
      }
    }

    #main_flow {
      width: 100%;
      height: 100%;
      flex: 8;
      //background-color: seagreen;
    }
  }

  .main_cpe {
    width: 49%;
    flex: 1;
    height: 100%;
    background-color: #fff;
    border: 1px solid #E1E5E9;
    box-shadow: 2px 1px 10px 0 rgba(213, 213, 213, 0.3);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px;
    box-sizing: border-box;

    p {
      flex: 1;
      font-size: 18px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #000000;
    }

    #pile {
      width: 100%;
      height: 100%;
      flex: 8;
      //background-color: seagreen;
    }
  }
}
</style>
