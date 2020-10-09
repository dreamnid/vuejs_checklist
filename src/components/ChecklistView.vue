<template>
  <li>
    <router-link :to="{name: 'ChecklistsShow', params: {slug: checklistSlug}}">
      {{checklist.name}}
    </router-link>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from "vue-class-component";
  import {Getter} from "vuex-class";
  import {Checklist} from "../store";
  import slugify from 'slugify';
  import {Prop} from "vue-property-decorator";


  @Component
  export default class ChecklistView extends Vue {
    @Prop({type: Object, required: true}) checklist!: Checklist

    get checklistSlug(): string {
      return slugify(this.checklist.name)
    }
  }
</script>
