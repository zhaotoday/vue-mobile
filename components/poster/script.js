import CPopup from '@/components/popup'

export default {
  name: 'c-poster',
  components: { CPopup },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    }
  }
}
