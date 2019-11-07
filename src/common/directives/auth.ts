import Vue from 'vue'
import { hasAuth } from '@/utils/auth'
import { addClass } from '@/utils/dom'

import { DirectiveOptions } from 'vue/types/options'

const auth: DirectiveOptions = {
  bind(el, binding) {
    console.log('binding', hasAuth(binding.value), binding)
    if (!hasAuth(binding.value)) {
      Vue.nextTick(() => el.parentNode && el.parentNode.removeChild(el))
      return
    }

    if (binding.modifiers.readonly) {
      addClass(el, 'auth-readonly')
    }
  }
}

export default auth
