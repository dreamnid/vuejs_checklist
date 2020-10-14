<template>
  <!-- Using v-if="checklistsLoaded" in the below div doesn't work
  because checklistsLoaded not declared properly for some reason -->
  <div>
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
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter } from 'vuex-class';
import ChecklistView from '@/components/ChecklistView.vue';
import { Checklist } from '../store';

  @Component({
    components: { ChecklistView },
  })

export default class ChecklistsIndex extends Vue {
    @Getter checklists!: Checklist[]

    @Action loadChecklists!: () => void

    mounted() {
      this.loadChecklists();
    }
}
</script>
