import { jwt } from '@/utils/helper'

import { StateUser } from '@/types/store'

const state: StateUser = {
  jwt: jwt()
}

export default state
