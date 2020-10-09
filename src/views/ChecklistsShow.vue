<template>
  <div class="checklist" v-if="checklist">
    <h1>
      <router-link :to="{name: 'ChecklistsIndex'}">&lt;</router-link>
      {{checklist.name}}
    </h1>

    <ul>
      <checklist-item-view v-for="(item, index) in checklist.items"
                           :key="index"
                           :checklist="checklist"
                           :item="item"
                           :index="index" />

      <li class="new-item">
        <form @submit.prevent="newItemFormSubmitted">
          <input name="challenge"
                 placeholder="Challenge"
                 required
                 type="text"
                 ref="challengeField"
                 v-model.trim="newItem.challenge" />
          <input name="response"
                 placeholder="Response"
                 type="text"
                 v-model.trim="newItem.response" />
          <input name="commit" type="submit" value="Add" />
        </form>
      </li>
    </ul>

  </div>
  <p v-else>Hello world</p>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Action, Getter} from "vuex-class";
  import {Checklist, ChecklistItem} from "@/store";
  import Component from "vue-class-component";
  import ChecklistItemView from "@/components/ChecklistItemView.vue";

  @Component(
    {components: {ChecklistItemView}
    }
  )
  export default class ChecklistsShow extends Vue {
    $refs!: {
      challengeField: HTMLInputElement
    }

    newItem: Partial<ChecklistItem> = {}
    @Getter checklistBySlug!: (slug: string) => Checklist | null
    get checklist(): Checklist | null {
      return this.checklistBySlug(this.$route.params.slug)
    }

    @Action addItem!: ({checklistName, item}: {checklistName: string, item: ChecklistItem}) => Promise<void>
    async newItemFormSubmitted() {
      this.addItem({checklistName: this.checklist!.name, item: this.newItem as ChecklistItem})
      this.newItem = {}
      this.$refs.challengeField.focus()
    }

    mounted() {
      // When the form is in the dom, automatically focus on the new field
      this.$refs.challengeField.focus()
    }
  }
</script>

