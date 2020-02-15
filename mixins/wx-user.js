export default {
  methods: {
    async setOpenId () {
      if (!this.$auth.get()['openId']) {
        const { code } = await this.$wx.login({
          withCredentials: true
        })

        const { data: { openId } } = await this.$store.dispatch(
          'public/wxUsers/postAction', {
            showError: false,
            body: { type: 'MP_CODE_TO_SESSION', code }
          })

        this.$auth.setOpenId(openId)
      }
    },
    async refreshWxUserInfo () {
      if (this.$auth.loggedIn()) {
        const {
          data: {
            nickName,
            avatarUrl,
            phoneNumber,
            name = '',
            extra = {}
          }
        } = await this.$store.dispatch('wx/wxUsers/postAction', {
          showError: false,
          action: 'getUserInfo'
        })

        this.$auth.set({
          nickName,
          avatarUrl,
          phoneNumber,
          name,
          extra
        })
      }
    }
  }
}
