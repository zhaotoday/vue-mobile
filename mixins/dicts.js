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
    }
  }
}
