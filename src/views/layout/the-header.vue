<template>
  <el-header>
    <div
      :class="['logo', { 'is-collapsed': $store.state.global.menuCollapse }]"
    >
      <img src="@/assets/img/logo.png" />
      <h1>国科股份</h1>
    </div>

    <i
      :class="[
        'menu-toggle',
        $store.state.global.menuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
      ]"
      @click="onToggleMenuCollapse"
    ></i>

    <div class="toolbar">
      <com-search
        class="toolbar__item"
        placeholder="站内搜索"
        :search="search"
        :fetchSuggestions="fetchSuggestions"
      />

      <el-badge :value="22" :max="99" class="toolbar__item toolbar__message">
        <i class="el-icon-bell"></i>
      </el-badge>
      <header-message />

      <el-dropdown
        class="toolbar__item toolbar__user"
        trigger="hover"
        :show-timeout="62"
        @command="onCommand"
      >
        <div>
          <el-avatar
            src="https://s.gravatar.com/avatar/2704278e1d1b9836f186f05909dfa386?s=50&d=retro"
            shape="square"
            size="medium"
          >
            令狐冲
          </el-avatar>
          <span>令狐冲</span>
        </div>
        <el-dropdown-menu>
          <el-dropdown-item
            icon="el-icon-user"
            :command="Command.TO_USER_CENTER"
          >
            <!---->个人中心
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-setting"
            :command="Command.TO_USER_SETTING"
          >
            <!---->个人设置
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-switch-button"
            :command="Command.LOGOUT"
            divided
          >
            <!---->退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts">
import Vue from 'vue'

import { ComSearch } from '@/components'
import headerMessage from './message.vue'
import routesPath from '@/router/routes-path'

enum Command {
  LOGOUT = 'LOGOUT',
  TO_USER_CENTER = 'TO_USER_CENTER',
  TO_USER_SETTING = 'TO_USER_SETTING'
}

export default Vue.extend({
  components: { ComSearch, headerMessage },

  data() {
    return {
      Command
    }
  },

  methods: {
    onCommand(command: Command) {
      switch (command) {
        case Command.LOGOUT:
          this.logout()
          break

        case Command.TO_USER_CENTER:
          this.$router.push(routesPath.USER_CENTER)
          break

        case Command.TO_USER_SETTING:
          this.$router.push(routesPath.USER_SETTING)
          break
      }
    },

    search(keyword: string) {
      console.log('onsearch', keyword)
    },

    fetchSuggestions(keyword: string, cb: Function) {
      console.log('fetchSuggestions', keyword)
      setTimeout(() => {
        cb([
          {
            value: '福荣祥烧腊（平溪路店）',
            address: '上海市长宁区协和路福泉路255弄57-73号'
          },
          {
            value: '速记黄焖鸡米饭',
            address: '上海市长宁区北新泾街道金钟路180号1层01号摊位'
          },
          { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
          {
            value: '(小杨生煎)西郊百联餐厅',
            address: '长宁区仙霞西路88号百联2楼'
          },
          { value: '阳阳麻辣烫', address: '天山西路389号' },
          {
            value: '南拳妈妈龙虾盖浇饭',
            address: '普陀区金沙江路1699号鑫乐惠美食广场A13'
          },
          { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
          { value: '浏阳蒸菜', address: '天山西路430号' },
          { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
          {
            value: '樱花食堂（凌空店）',
            address: '上海市长宁区金钟路968号15楼15-105室'
          },
          { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' }
        ])
      }, 300)
    },

    onToggleMenuCollapse() {
      this.$store.dispatch('global/toggleMenuCollapse')
    },

    async logout(): Promise<void> {
      try {
        await this.$confirm('确定退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$store.dispatch('user/logout')
      } catch (err) {
        console.log('cancel logout', err)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/var';
@import '@/assets/styles/mixins';

.el-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  height: $layout-header-height !important;
  padding: 0;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  ::v-deep [class^='el-icon'] {
    font-size: 18px;
    color: $--color-text-primary;
    cursor: pointer;
  }

  .logo {
    position: relative;
    z-index: 3;

    overflow: hidden;
    display: flex;
    align-items: center;

    box-sizing: border-box;
    width: $layout-siderbar-width;
    height: $layout-header-height;
    padding-left: 24px;
    // box-shadow: 1px 0px 0 0 #e8e8e8;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
    transition: all 0.3s ease-in-out;

    h1 {
      display: none;
    }

    img {
      width: 130px;
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }

    &.is-collapsed {
      width: $layout-siderbar-width-collapsed;
      padding-left: 15px;
    }
  }

  .menu-toggle {
    width: 50px;
    height: $layout-header-height;
    line-height: $layout-header-height;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    height: 100%;
    padding-right: 12px;

    &__item {
      padding: 0 12px;
    }

    &__user {
      cursor: pointer;

      .el-avatar {
        margin-right: 8px;
        vertical-align: middle;
      }
    }

    &__message {
      padding-right: 0;
      margin-right: 20px;
      cursor: pointer;
      // @include extend-click(10px, 16px);
    }
  }
}
</style>
