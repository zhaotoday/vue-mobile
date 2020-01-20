import { mapState } from 'vuex'

export default {
  computed: mapState({
    dicts: state => state['public/dicts'].list
  }),
  methods: {
    getDictsList () {
      return this.$store.dispatch('public/dicts/getList', {})
    },
    async loadDicts () {
      if (!this.dicts.config) {
        await this.getDictsList()
      }
    },
    async updateDicts () {
      await this.loadDicts()

      const { config } = this.dicts
      const { data: { version } } = await this.$store.dispatch(
        'public/dicts/postAction',
        {
          body: {
            actionType: 'GET_CONFIG'
          }
        }
      )

      if (version !== config.version) this.getDictsList()
    }
  }
}
