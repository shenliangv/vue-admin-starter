<template>
  <div class="error">
    <com-placeholder
      :url="errorsMap[errorType].url"
      :title="errorsMap[errorType].title"
      :content="errorsMap[errorType].content"
    />
    <el-button type="primary" @click="toHome">返回首页</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComPlaceholder } from '@/components'
import routesPath from '@/router/routes-path'
import { ErrorType } from '@/common/dict/constants'

import Img_403 from '@/assets/img/placeholder/403.svg'
import Img_404 from '@/assets/img/placeholder/404.svg'
import Img_500 from '@/assets/img/placeholder/500.svg'

const errorsMap = {
  [ErrorType.ERROR_403]: {
    url: Img_403,
    title: '403',
    content: '抱歉，你无权访问该页面'
  },
  [ErrorType.ERROR_404]: {
    url: Img_404,
    title: '404',
    content: '抱歉，你访问的页面不存在'
  },
  [ErrorType.ERROR_500]: {
    url: Img_500,
    title: '500',
    content: '抱歉，服务器出错了'
  },
  [ErrorType.ERROR_NETWORK]: {
    url: Img_500,
    title: '500',
    content: '抱歉，网络出了点问题'
  }
}

export default Vue.extend({
  components: { ComPlaceholder },

  props: {
    errorType: {
      type: String as () => ErrorType
    }
  },

  data() {
    return {
      errorsMap
    }
  },

  methods: {
    toHome() {
      this.$router.push(routesPath.DASHBORD)
    }
  }
})
</script>

<style lang="scss" scoped>
.error {
  padding: 20px;
  text-align: center;
}
</style>
