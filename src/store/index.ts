import ModuleUser from './user'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { StateUser } from '@/interfaces/User';

export interface State {
    user: StateUser;
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    user: ModuleUser,
  }
})
