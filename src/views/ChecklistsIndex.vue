<template>
  <div v-if="checklistsLoaded">
    <h1>Checklists</h1>
    <ul class="checklists">
      <checklist-view v-for="checklist in checklists"
                      :checklist="checklist"
                      :key="checklist.name" />
      <li class="new-checklist">
        <router-link :to="{name: 'ChecklistsNew'}">Add New</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from "vue-class-component";
  import {Action, Getter} from "vuex-class";
  import {Checklist} from "../store";
  import ChecklistView from "@/components/ChecklistView.vue";

  @Component({
    components: {ChecklistView}
  })

  export default class ChecklistsIndex extends Vue {
    @Getter checklists!: Checklist[]

    @Action loadChecklists!: () => void
    mounted() {
      this.loadChecklists()
    }
  }
</script>
