import {
  isValidEmail,
  isValidMobile,
  isValidCurrency
} from '@/common/validator'

interface Validator {
  (rule: Rule, value: any, callback: (error?: Error) => void): void
}

interface Rule {
  type?: string
  required?: true
  message: string
  trigger?: string | string[]
  validator?: Validator
}

function createValidator(validator: (val: any) => boolean): Validator {
  return (rule, value, callback) => {
    validator(value) ? callback() : callback(new Error(rule.message))
  }
}

export default {
  // required: { required: true, message: '必填项不能为空' },
  mobile: {
    message: '请输入正确的手机号码',
    validator: createValidator(isValidMobile)
  },
  email: {
    message: '请输入正确的邮箱地址',
    validator: createValidator(isValidEmail)
  },
  currency: {
    message: '请输入正确的金额',
    validator: createValidator(isValidCurrency)
  }
}
