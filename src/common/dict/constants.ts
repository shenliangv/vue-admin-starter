import { encrypt } from '@/utils/helper'

export enum ErrorType {
  ERROR_403 = 'ERROR_403',
  ERROR_404 = 'ERROR_404',
  ERROR_500 = 'ERROR_500',
  ERROR_NETWORK = 'ERROR_NETWORK'
}

export default {
  TOKEN_KEY: encrypt('token'),
  ACCOUNT_KEY: encrypt('account')
}
