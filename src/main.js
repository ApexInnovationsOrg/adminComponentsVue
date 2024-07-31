import Vue from 'vue'
import Orgs from './org.vue'
import Dept from './deptDropdown.vue'
// import Leads from './leadPlacement.vue'


new Vue({
	el:'#organizationsVue',
	render:h => h(Orgs)
})

new Vue({
	el:'#departmentsVue',
	render:h => h(Dept)
})

// new Vue({
// 	el:'#leadComponentVue',
// 	render:h => h(Leads)
// })