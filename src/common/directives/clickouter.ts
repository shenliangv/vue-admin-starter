import { DirectiveOptions } from 'vue/types/options'

let eventHandler: EventListener = () => {}

const clickouter: DirectiveOptions = {
  inserted(el, binding) {
    eventHandler = event => {
      if (!el.contains(event.target as Node)) {
        binding.value()
      }
    }

    document.addEventListener('click', eventHandler, true)
  },

  unbind() {
    document.removeEventListener('click', eventHandler, true)
  }
}

export default clickouter
