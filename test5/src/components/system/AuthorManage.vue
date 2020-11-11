<template>
  <div class="public_header">
    <div class="public_contents">
      <div class="search">
        <div class="search_content">
          <span class="search_title">用户角色选择</span>
          <span>
            <el-select v-model="userRole" placeholder="请选择" size="small">
              <el-option
                v-for="item in userRoleArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="search_content">
          <span class="search_title">企业角色选择</span>
          <span>
            <el-select v-model="enterpriseRole" placeholder="请选择" size="small">
              <el-option
                v-for="item in enterpriseRoleArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="search_content">
          <span class="search_title">
            <el-input v-model="keyword"
                      size="small"
                      placeholder="请输入关键字匹配权限"></el-input>
          </span>
          <span>
            <el-button type="primary" size="small">查询</el-button>
          </span>
        </div>
      </div>
      <div class="author_content">
        <el-tabs v-model="authorName" @tab-click="handleClick">
          <el-tab-pane label="匹配权限1" name="first">
            <div class="match_content">
              <el-form ref="form" :model="matchData" label-width="90px">
                <el-form-item label="匹配权限一">
                  <el-select v-model="matchData.data1" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in visibleArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="匹配权限二">
                  <el-select v-model="matchData.data1" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in visibleArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="匹配权限三">
                  <el-select v-model="matchData.data1" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in visibleArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="匹配权限四">
                  <el-select v-model="matchData.data1" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in visibleArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
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
  name: "AuthorManage",
  data() {
    return {
      userRole:null,
      enterpriseRole:null,
      keyword:null,
      userRoleArr: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      enterpriseRoleArr: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],

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
  margin-top: 51px;
  .match_content{
    width: 300px;
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
