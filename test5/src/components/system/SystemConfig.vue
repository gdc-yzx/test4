<template>
  <div class="public_header">
    <div class="public_contents">
      <div class="author_content">
        <el-tabs v-model="authorName" @tab-click="handleClick">
          <el-tab-pane label="配置类别1" name="first">
            <div class="match_content">
              <el-form ref="form" :model="matchData" label-width="85px">
                <el-form-item label="匹配类别一" >
                 <!-- <el-select v-model="matchData.data1" placeholder="请选择" size="small" style="width: 100%">
                    <el-option
                      v-for="item in visibleArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>-->
                  <el-input v-model="matchData.data1" size="small" style="width: 100%" placeholder="请输入内容"></el-input>

                </el-form-item>
                <el-form-item label="匹配类别二">
                  <el-select v-model="matchData.data1" placeholder="请选择" size="small"  style="width: 100%">
                    <el-option
                      v-for="item in visibleArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="匹配类别三">
                  <el-select v-model="matchData.data1" placeholder="请选择" size="small" style="width: 100%">
                    <el-option
                      v-for="item in visibleArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="匹配类别四" style="text-align: left">
                  <el-switch
                    v-model="matchData.data1"
                    active-text="开"
                    inactive-text="关"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="匹配类别五">
                  <el-input v-model="matchData.data1" size="small" style="width: 100%" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="匹配类别六" style="text-align: left">
                  <el-radio-group v-model="matchData.data1" >
                    <el-radio :label="1">全部</el-radio>
                    <el-radio :label="2">选项一</el-radio>
                    <el-radio :label="3">选项二</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div class="match_btn">
                <el-button size="mini" type="primary">保存</el-button>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="匹配权限2" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="匹配权限3" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="匹配权限4" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "SystemConfig",
  data() {
    return {
      authorName:'first',
      visibleArr:[
        {
          value: '1',
          label: '可见'
        },
        {
          value: '2',
          label: '不可见'
        },
      ],
      matchData:{
        data1:"1"
      }
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
    }
  }
}
</script>

<style scoped lang="scss">
.author_content{
  //margin-top: 51px;
  //background-color: skyblue;
  .match_content{
    width: 500px;
    //background-color: skyblue;
    margin: 100px auto;
    .match_btn{
      padding-top: 35px;
      border-top: 1px solid #e9e9e9;
      text-align: right;
    }
  }
}
</style>
