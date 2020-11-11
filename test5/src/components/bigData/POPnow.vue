<template>
  <div class="up_and_down">
    <el-carousel height="260px" indicator-position="none" arrow="never">
      <el-carousel-item>
        <div class="up_flow" id="pop_now"></div>
      </el-carousel-item>

    </el-carousel>
  </div>

</template>

<script>

export default {
  name: "UpandDown",
  data() {
    return {
      chartInstance_pop_now:null,
    }
  },
  created() {

  },
  beforeCreate() {
  },
  mounted() {
    this.initEcharts_up();
    this.screenInterval = setInterval(()=>{
      this.screenAdapter()
    },500)
  },
  methods: {
    initEcharts_up(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_pop_now = this.$echarts.init(document.getElementById('pop_now'))
      // 绘制图表
      this.chartInstance_pop_now.setOption({
        title: {
          text: 'POP总流量' ,
          x:'left',
          y:'top',
          textStyle:{
            color:'#fff',
            fontSize:16
          }
        },
        color:['#FFE032','#FFFFFF'],
        legend: {
          data: [
            {
              name:'接入流量',
              textStyle:{
                color:'#FFE032'
              }
            },
            {
              name:'输出流量',
              textStyle:{
                color:'#FFf'
              }
            },
          ],
          right:30,
          icon: 'rect',
          itemHeight: 7, //修改icon图形大小
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['1','2','3','4','5','6','7','8','9'],
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:0,
            textStyle: {
              color: '#7785D8'
            }
          },
          nameTextStyle:{
            color: '#7785D8'
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
          axisLabel:{
            formatter:'{value}',
            textStyle: {
              color: '#7785D8'
            }
          },
          name:'(B/S)',
          nameTextStyle:{
            color: '#7785D8'
          },
          splitLine:{
            show:true,
            lineStyle: {
              color:'#242D81'
            }
          }


        },
        series: [
          {
            data: [0, 5, 2, 8,9, 10],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'接入流量',
            // stack: '平均',
            stack: 'all',    //堆叠图设置
            areaStyle: {
              // color:'#F6F6FF',
              opacity:0.1,
              origin:'start',
              normal: {
                // 渐变填充色（线条下半部分）
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FFE032" },
                  { offset: 1, color: "#FFE03200" }
                ])
              }
            },   //堆叠图设置
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#FFE032'
                }
              }
            },
          },
          {
            data: [2, 4, 3, 6, 7, 8],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'输出流量',
            // stack: '平均',
            stack: 'all',    //堆叠图设置
            areaStyle: {
              color:'#F6F6FF',
              opacity:0.1,
              origin:'start',
              normal: {
                // 渐变填充色（线条下半部分）
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#F6F6FF" },
                  { offset: 1, color: "#F6F6FF00" }
                ])
              }
            },   //堆叠图设置
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#fff'
                }
              }
            },
          },


        ]
      });
    },
    //屏幕适配
    screenAdapter () {
      this.chartInstance_pop_now.resize();
    },
  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    clearInterval(this.screenInterval)
  },
}
</script>

<style scoped lang="scss">
.up_flow{
  width: 100%;
  height: 260px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
