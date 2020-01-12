import createStore from '../../../utils/create-store'
import Model from '/dicts'

export default createStore({
  Model,
  state: { list: {} }
})
