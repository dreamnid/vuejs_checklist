<template>
  <li class="checklist-item">
    <label>
      <input :checked="item.checked" @change="checkboxClicked" type="checkbox" />
      <span class="challenge">{{item.challenge}}</span>
      <span class="response" v-if="item.response">{{item.response | capitalize}}</span>
    </label>
  </li>

</template>

<script lang="ts">
  import Vue from "vue"
  import Component from "vue-class-component";
  import {Checklist, ChecklistItem} from "@/store";
  import {Prop} from "vue-property-decorator";
  import {Action} from "vuex-class";

  @Component({
    filters: {
      capitalize(input: string) { return input.toUpperCase() },
    }
  })
  export default class ChecklistItemView extends Vue {
    @Prop({type: Object, required: true}) checklist!: Checklist
    @Prop( {type: Object, required: true}) item!: ChecklistItem
    @Prop({type: Number, required: true}) index!: number

    @Action toggleItem!: (payload: {checklistName: string, itemIndex: number}) => void
    checkboxClicked() {
      this.toggleItem({checklistName: this.checklist.name, itemIndex: this.index})

    }

  }
</script>
