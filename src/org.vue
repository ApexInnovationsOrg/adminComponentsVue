<template>
<div>
                <div>
                    <div>Search <input name="query" v-model="search"><span class="searchCount">{{ orgs.length }} results</span>
                    </div>
                    <div>
                    <span>Select the organization: </span>
                    <select @keyup.enter="changeOrgs" @keydown.enter.prevent="keyHandler" v-bind:id='ID' name='ID' v-model="selectedID">
                        <option value="-1">&lt;&lt;&lt;Create New Organization&gt;&gt;&gt;</option>
                        <organization-option v-for="(org, i) in orgs" :org="org" :key="org.ID"></organization-option>
                    </select>
                    
                    </div>
                </div>
                <div>Has active licenses: <input type="checkbox" id="hideCheckbox" v-model="hasactive"/><input class="goButton" type="button" v-on:click="changeOrgs" value="Go"></div>

                </div>
</template>

<script>
import orgOption from './orgOption.vue';
import utils from './utils.js';
export default {
  name: 'organizationsVue',
  data () {
    return {
      msg: 'Organizations',
      unfiltered:[],
      orgs:[],
      hasactive:true,
      search:'',
      orgID:utils.findGetParam('ID'),
      selectedID:'-1'
    }
  },
  components:{
    'organization-option':orgOption
  },
  watch:{
    search:function(){
        this.searchOrgs();
    },
    hasactive:function(){
        this.searchOrgs();
    }
  },
  methods:{
    searchOrgs:function(){
        this.orgs = this.unfiltered.filter(org=>{
            var filter = false;
            if(this.hasactive)
            {
                filter = org.Name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 && org.HasActive === 'true';
            }
            else
            {
                filter = org.Name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            }

            if(org.ID == this.orgID)
            {
                filter = true;
            }   

            return filter;
        });

    },
    changeOrgs:function(){
        window.location.href = '/admin/Organizations.php?ID=' + this.selectedID;
    }
  },
    created: function() {
        $.getJSON('/ajax/getOrganizations.php')
            .done(data => {
                if(this.orgID !== null)
                {
                    this.selectedID = this.orgID;
                } 
                this.unfiltered = data
                this.searchOrgs();
            })
    }
}
</script>
<style scoped>
div{
    margin-top:5px;
}
.goButton{
    margin-left:1em;
}
</style>