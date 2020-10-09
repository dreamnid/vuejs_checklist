import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import slugify from "slugify";
import {cloneDeep} from "lodash-es";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

export interface ChecklistItem {
  challenge: string
  response?: string
  checked: boolean
}

export interface Checklist {
  name: string
  items: ChecklistItem[]
}

interface AppState {
  checklists: Checklist[],
  checklistsLoading: boolean,
  checklistsError: Error | null
}

const state: AppState = {
  checklists: [],
  checklistsLoading: false,
  checklistsError: null,
}

export default new Vuex.Store({
  state,
  getters: {
    checklists(state: AppState) {
      return state.checklists
    },
    checklistBySlug(state: AppState): (slug: string) => Checklist | undefined {
      return (slug: string) => state.checklists.find(c => slugify(c.name) === slug)
    },
  },
  mutations: {
    ADD_CHECKLIST(state: AppState, {checklist}: {checklist: Checklist}) {
      var newChecklists = cloneDeep(state.checklists)
      newChecklists.push(checklist)
      state.checklists = newChecklists
    },
    ADD_ITEM(state: AppState, {checklistName, item}: {checklistName: string, item: ChecklistItem}) {
      var newChecklists = cloneDeep(state.checklists)
      var checklist = newChecklists.find((c: Checklist) => c.name === checklistName)
      if (checklist) {
        checklist.items.push(item)
        state.checklists = newChecklists
      }

    },
    TOGGLE_ITEM(state: AppState, {checklistName, itemIndex}: {checklistName: string, itemIndex: number}) {
      var newChecklists = cloneDeep(state.checklists)
      var checklist = newChecklists.find((c: Checklist) => c.name === checklistName)
      if (checklist) {
        var item = checklist.items[itemIndex]
        if (item) {
          item.checked = !item.checked
          state.checklists = newChecklists
        }
      }
    },
    LOAD_CHECKLISTS(state: AppState, {checklists}: {checklists: Checklist[]}) {
      state.checklists = checklists
    },
  },
  actions: {
    loadChecklists({commit}: ActionContext<AppState, AppState>) {
      fetch('http://localhost:3000/checklists')
        .then(response => response.json())
        .then(body => {
          commit('LOAD_CHECKLISTS', {checklists: body})
        })
        .catch(error => commit('SET_CHECKLIST_ERROR', true))
    },
    addChecklist({commit}: ActionContext<AppState, AppState>, {checklist}: {checklist: Checklist}) {
      commit('ADD_CHECKLIST', {checklist})

    },
    addItem({commit}: ActionContext<AppState, AppState>, {checklistName, item}: {checklistName: string, item: ChecklistItem}) {
      commit('ADD_ITEM', {checklistName, item})
    },
    toggleItem({commit}: ActionContext<AppState, AppState>, {checklistName, itemIndex}: {checklistName: string, itemIndex: number}) {
      commit('TOGGLE_ITEM', {checklistName, itemIndex})
    }
  },
  plugins: [createLogger()]
});
