<template>
  <div class="big_screen">
    <header>
      <h1>广大通设备运营管理平台</h1>
      <div class="showTime">
        <p>{{nowTime.hours}}:{{nowTime.minutes}}:{{nowTime.seconds}}</p>
        <span>{{nowTime.year}}-{{nowTime.month}}-{{nowTime.day}}</span>
      </div>
    </header>
    <section class="mainbox">
      <div class="column">
        <div class="panel">
          <upanddown />
        </div>
        <div class="panel">
          <screencpe />
        </div>
        <div class="panel">
          <cpeFlow />
        </div>
      </div>
      <div class="column"></div>
      <div class="column">
        <div class="panel">
          <popnow />
        </div>
        <div class="panel">
          <devicearea />
        </div>
        <div class="panel">
          <warnnum />
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import upanddown from './UpandDown'
import screencpe from './ScreenCPE'
import cpeFlow from './CPEupFlow'
import warnnum from './WarnNum'
import popnow from './POPnow'
import devicearea from './DeviceArea'
export default {
  name: "BigData",
  data() {
    return {
      nowTime:{
        year:null,
        month:null,
        day:null,
        hours:null,
        minutes:null,
        seconds:null,
      },
      times:null
    }
  },
  components:{
    upanddown,
    screencpe,
    cpeFlow,
    warnnum,
    popnow,
    devicearea
  },
  created() {
  },
  beforeCreate() {
  },
  mounted() {
    this.getNowTime();
  },
  methods: {
    getNowTime(){
      clearTimeout(this.times); //清除定时器
      let dt = new Date();
      let y = dt.getFullYear();
      let mt = dt.getMonth() + 1;
      let day = dt.getDate();
      let h = dt.getHours(); //获取时
      let m = dt.getMinutes(); //获取分
      let s = dt.getSeconds(); //获取秒
      this.nowTime = {
        year:y,
        month:mt,
        day:day,
        hours:h,
        minutes:m > 10 ? m :'0'+m,
        seconds:s > 10 ? s :'0'+s,
      }
      this.times = setTimeout(this.getNowTime, 1000); //设定定时器，循环运行
    }
  },
  destroyed() {
    clearTimeout(this.times); //清除定时器
  }
}
</script>

<style scoped lang="scss">
.big_screen{
  //width: 100%;
  //height: 100%;
  margin: 0;
  padding: 0 0 70px;
  /*  背景图定位 / 背景图尺寸  cover 完全铺满容器  contain 完整显示在容器内 */
  background: url(../../assets/bigScreen/bg.png) no-repeat #000;
  background-size: cover;
  header{
    //width: 770px;
    height: 140px;
    background: url(../../assets/bigScreen/bantou.png) no-repeat top center;
    background-size: 100% 100%;
    position: relative;
    h1{
        background-image:-webkit-linear-gradient(top,#ccd7f8,#85a0ee);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      font-size: 40px;
      line-height: 80px;
      font-family: "Microsoft YaHei";
    }
    .showTime{
      position: absolute;
      top: 30px;
      right: 40px;
      p{
        font-size: 36px;
        font-family: DIN Alternate;
        font-weight: bold;
        color: #FFFFFF;
      }
      span{

        font-size: 16px;
        font-family: DIN Alternate;
        font-weight: bold;
        color: #FFFFFF;
      }
    }
  }
  .mainbox{
    width: 100%;
    height: 100%;
    //background-color: skyblue;
    display: flex;
    .column{
      flex: 3;
      //background-color: pink;
      .panel{
        background: url("../../assets/bigScreen/border.png") no-repeat center center;
        width: 420px;
        height: 260px;
        margin: 0 auto;
        background-size: cover;
      }
      .panel:nth-child(2){
        margin-top: 35px;
        margin-bottom: 35px;
      }
    }
    .column:nth-child(2){
      flex: 5;
      background-color: slateblue;
    }
  }
}
</style>
