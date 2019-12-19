<template>
  <div class="login">
    <header class="login-header">
      <img class="login-header__logo" src="@/assets/img/logo.png" />
      <p class="login-header__slogan">
        Ant Design 是西湖区最具影响力的 Web 设计规范
      </p>
    </header>

    <section class="login-body">
      <el-tabs v-model="loginType" stretch>
        <el-tab-pane label="账号密码登录" :name="LoginTypes.ACCOUNT">
          <el-form
            ref="formAccount"
            :model="formAccount"
            :rules="formAccountRules"
            @keyup.enter.native="onLogin"
          >
            <el-form-item prop="username">
              <i class="el-icon-user icon" />
              <el-input
                v-model="formAccount.username"
                placeholder="用户名"
                size="default"
              />
            </el-form-item>
            <el-form-item prop="password">
              <i class="el-icon-lock icon" />
              <el-input
                v-model="formAccount.password"
                type="password"
                placeholder="密码"
                size="default"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="手机号登录" :name="LoginTypes.MOBILE">
          <el-form
            ref="formMobile"
            :model="formMobile"
            :rules="formMobileRules"
            @keyup.enter.native="onLogin"
          >
            <el-form-item prop="mobile">
              <i class="el-icon-mobile-phone icon" />
              <el-input
                v-model="formMobile.mobile"
                placeholder="手机号"
                size="default"
              />
            </el-form-item>
            <el-form-item prop="code" class="form-item-code">
              <i class="el-icon-message icon" />
              <el-input
                v-model="formMobile.code"
                placeholder="验证码"
                size="default"
              />
              <el-button
                @click="onFetchCode"
                :disabled="!canFetchCode"
                size="default"
              >
                {{ codeBtnText }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="login-body__operate">
        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        <el-link type="primary" :underline="false">忘记密码</el-link>
        <el-link type="primary" :underline="false">注册账户</el-link>
      </div>
      <el-button
        class="login-body__submit"
        type="primary"
        @click="onLogin"
        size="default"
      >
        登录
      </el-button>
    </section>

    <the-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheFooter from '@/views/layout/the-footer.vue'

import routesPath from '@/router/routes-path'
import constants from '@/common/dict/constants'
import Timer from '@/common/class/Timer'
import validation from '@/common/dict/validation'
import { isEmptyObject } from '@/utils/lang'
import { encrypt, decrypt } from '@/utils/crypto'

import { ElForm } from 'element-ui/types/form'
import { PlainObject } from '@/types/base'

enum LoginTypes {
  ACCOUNT = 'ACCOUNT',
  MOBILE = 'MOBILE'
}

const CODE_BTN_TEXT_DEFAULT = '获取验证码'

export default Vue.extend({
  components: { TheFooter },

  data() {
    return {
      rememberMe: false,
      LoginTypes,
      codeBtnText: CODE_BTN_TEXT_DEFAULT,
      loginType: LoginTypes.ACCOUNT,
      formAccount: {
        username: 'admin',
        password: '123456',
        grant_type: 'password',
        mode: 'account_password'
      },
      formMobile: {
        mobile: '',
        code: '',
        grant_type: 'password',
        mode: 'sms_verification_code'
      },
      formAccountRules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      },
      formMobileRules: {
        mobile: [{ ...validation.mobile }],
        code: [{ required: true, message: '请输入验证码' }]
      }
    }
  },

  computed: {
    canFetchCode(): boolean {
      return this.codeBtnText === CODE_BTN_TEXT_DEFAULT
    },

    formData(): PlainObject {
      switch (this.loginType) {
        case LoginTypes.ACCOUNT:
          return this.formAccount

        case LoginTypes.MOBILE:
          return this.formMobile

        default:
          return {}
      }
    },

    nextPath(): string {
      return (this.$route.query.redirect as string) || routesPath.DASHBORD
    }
  },

  created() {
    this.initFormData()
  },

  methods: {
    initFormData() {
      if (!isEmptyObject(this.account())) {
        const { username, password, mobile } = this.account()

        this.rememberMe = true
        this.formMobile.mobile = mobile
        this.formAccount = Object.assign({}, this.formAccount, {
          username,
          password
        })
      }
    },

    async onLogin(): Promise<void> {
      try {
        switch (this.loginType) {
          case LoginTypes.ACCOUNT:
            await (this.$refs.formAccount as ElForm).validate()
            await this.$store.dispatch('user/loginByAccount', this.formData)
            break

          case LoginTypes.MOBILE:
            await (this.$refs.formMobile as ElForm).validate()
            await this.$store.dispatch('user/loginByMobile', this.formData)
            break
        }

        this.rememberMe ? this.saveAccount() : this.removeAccount()
        this.$router.replace(this.nextPath)
      } catch (err) {
        console.log(err)
      }
    },

    onFetchCode() {
      if (!this.canFetchCode) {
        return
      }

      const formMobile = this.$refs.formMobile as ElForm

      formMobile.validateField('mobile', async errorMessage => {
        if (!errorMessage) {
          await this.$store.dispatch('user/fetchCode', this.formMobile.mobile)

          const timer = new Timer(1000, 60 * 1000, this.countdown)
          timer.start()
        }
      })
    },

    countdown(t: number) {
      if (t > 0) {
        this.codeBtnText = `${Math.floor(t / 1000)}s`
      } else {
        this.codeBtnText = CODE_BTN_TEXT_DEFAULT
      }
    },

    account(): PlainObject {
      const accountString = localStorage.getItem(constants.ACCOUNT_KEY)

      return accountString ? JSON.parse(decrypt(accountString)) : {}
    },

    saveAccount() {
      const accountString = JSON.stringify(
        Object.assign(this.account(), this.formData)
      )

      localStorage.setItem(constants.ACCOUNT_KEY, encrypt(accountString))
    },

    removeAccount() {
      localStorage.removeItem(constants.ACCOUNT_KEY)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/var.scss';

.login {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 90px;
  background: #f0f2f5 url('../../assets/img/login-bg.svg') no-repeat;
  background-position: center 110px;
  background-size: 100%;
}

.login-header {
  margin-bottom: 40px;
  text-align: center;

  &__logo {
    width: 168px;
  }

  &__slogan {
    margin-top: 20px;
    color: $--color-text-secondary;
  }
}

.login-body {
  width: 360px;
  flex: 1;
  margin: 0 auto 100px;

  ::v-deep .el-tabs {
    &__header {
      width: 72%;
      margin: 0 auto 30px;
    }

    &__content {
      overflow: visible;
    }

    &__item {
      height: 45px;
      line-height: 45px;
    }

    &__nav-wrap::after {
      background-color: transparent;
    }
  }

  &__operate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -6px;
    margin-bottom: 36px;

    .el-checkbox {
      flex: 1;
    }

    ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
      color: $--color-text-primary;
    }

    .el-link + .el-link {
      &:before {
        content: '|';
        margin: -2px 6px 0;
      }
    }
  }

  &__submit {
    width: 100%;
  }

  ::v-deep .el-form-item {
    position: relative;

    .icon {
      position: absolute;
      top: 50%;
      left: 12px;
      z-index: 1;
      transform: translateY(-50%);
      color: $--color-text-placeholder;
    }

    input {
      padding-left: 33px;
    }
  }

  ::v-deep .form-item-code {
    .el-form-item__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .el-input {
      flex: 1;
    }

    .el-button {
      width: 112px;
      margin-left: 10px;

      &.is-disabled {
        border-color: #d9d9d9;
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
