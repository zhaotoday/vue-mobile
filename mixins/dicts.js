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
      const { version } = await this.$store.dispatch('public/dicts/getList', {
        query: { name: 'config' }
      })

      if (version !== config.version) this.getDictsList()
    }
  }
}
