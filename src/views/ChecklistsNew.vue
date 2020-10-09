<template>
<div>
  <h1>
    <router-link :to="{name: 'ChecklistsIndex'}">⟨</router-link>
    New Checklist
  </h1>
  <form class="new-checklist-form" @submit.prevent="formSubmitted">
    <label>Title</label>
    <input name="name" required v-model.trim="checklist.name" type="text" />
    <input name="commit" type="submit" value="Create Checklist" />
  </form>
</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from "vue-class-component";
  import { Checklist } from "@/store";
  import { Action } from "vuex-class";
  import slugify from "slugify";

  @Component
  export default class ChecklistsNew extends Vue {
    checklist: Partial<Checklist> = {}

    @Action addChecklist!: ({ checklist }: { checklist: Checklist }) => Promise<void>

    async formSubmitted() {
      await this.addChecklist({ checklist: { ...this.checklist, items: [] } as Checklist });
      await this.$router.push({
        name: 'ChecklistsShow',
        params: { slug: slugify(this.checklist.name!) },
      });

    }

  }
</script>
