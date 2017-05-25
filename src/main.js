import Vue from 'vue'
import Orgs from './org.vue'
import Dept from './deptDropdown.vue'


new Vue({
	el:'#organizationsVue',
	render:h => h(Orgs)
})

new Vue({
	el:'#departmentsVue',
	render:h => h(Dept)
})

