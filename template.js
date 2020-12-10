/**
 *@param
 * Created by darkmoon on 2020/11/22.
 */

module.exports = {
	page:{
		vue:`<template>
</template>
<script lang="ts" src="./script.ts"></script>
<style scoped lang="scss" src="./style.scss"></style>
`,
		ts:`import { defineComponent } from 'vue';

export default defineComponent({
  name: '{{ name }}',
  data() {
    return {};
  },
  methods: {},
});
`,
		scss: '',
		router:`export default [
  {
    path: '',
    name: '{{ name }}',
    component: () => import('./index.vue'),
  },
]`

	},
	component:{
		vue:`<template>
</template>
<script lang="ts" src="./script.ts"></script>
<style scoped lang="scss" src="./style.scss"></style>
`,
		ts:`import { defineComponent } from 'vue';

export default defineComponent({
  name: '{{ name }}',
  data() {
    return {};
  },
  methods: {},
});
`,
		scss: ''

	},
	name:{
		vue:"index",
		ts:"script",
		scss:"style",
		router:"router"
	}
}
