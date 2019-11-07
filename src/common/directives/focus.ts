import { DirectiveOptions } from 'vue/types/options'

function isInputElement(tagName: string) {
  return ['input', 'textarea'].includes(tagName.toLowerCase())
}

const focus: DirectiveOptions = {
  inserted(el) {
    if (isInputElement(el.tagName)) {
      el.focus()
    } else {
      const input = el.querySelector('input') || el.querySelector('textarea')

      input && input.focus()
    }
  }
}

export default focus
