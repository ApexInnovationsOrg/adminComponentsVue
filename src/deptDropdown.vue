<template>
  <div>
      <div>
      <label>Search </label><input v-model.trim="search"><span class="searchCount">{{ searchSize }} results</span>
      </div>
      <label>Department: </label>
      <select class="departmentScrolldown" name="DepartmentID" v-model="selectedID" v-if="!loadingRouteData">
          <department-option v-for="dept in depts" :dept="dept" :key="dept.ID"></department-option>
      </select>
          <input class="goButton" type="button" v-on:click="changeDepts" value="Go">
  </div>
</template>

<script>
import deptOption from './deptOption.vue';
export default {
  name: 'departmentsVue',
  data () {
    return {
      loadingRouteData:true,
      msg: 'Department search',
      unfiltered:[],
      depts:[],
      search:'',
      deptID: this.getDeptID(),
      orgName: this.getOrgName(),
      selectedID:'-1',
      searchSize: 0,
      maxAllowedSize:2000,
    }
  },
  components:{
    'department-option':deptOption
  },
  watch:{
    search:function(){
        var that = this;
        if(this.waiter)
        {
          // console.log(clear);
          clearTimeout(this.waiter);
        }

        this.waiter = setTimeout(function(){
          that.searchDepts()
        },350);
    }
  },
  methods:{
    getDeptID:function(){
      var tempDept = -1;
      if(typeof userDept !== 'undefined'){
        tempDept = userDept;
      }
        return tempDept;
    },
    searchDepts:function(){
        this.depts = this.unfiltered.filter(dept=>{
          var tempString = dept.DeptName + ' ' + dept.OrgName;
          var tempResult = false;
          if(this.orgName !== '')
          {
            tempResult = tempString.toLowerCase().indexOf(this.search.toLowerCase()) > -1 && this.orgName == dept.OrgName;
          }
          else
          {
            tempResult = tempString.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
          }
          return tempResult;            
        });
        this.searchSize = this.depts.length;
        if(this.searchSize >= this.maxAllowedSize){
          if(this.selectedID > 0){
            let userDept = this.depts.find(obj => obj.ID == this.selectedID);
            let indexLoc = this.depts.indexOf(userDept);
            this.depts = this.depts.splice(indexLoc - (this.maxAllowedSize/2),this.maxAllowedSize);
          }else{
            this.depts = this.depts.splice(0,this.maxAllowedSize);
          }
          this.depts.push({
            'DeptName':'ONLY ' + this.maxAllowedSize + ' RECORDS LISTED',
            'ID':0,
            'OrgName':'SEARCH FOR MORE OPTIONS'
          });
        }
    },
    changeDepts:function(){
      if(this.orgName == "LMS"){
        window.location.href = '/admin/EditLMS.php?ID=' + this.selectedID;
      }else{
        window.location.href = '/admin/Departments.php?ID=' + this.selectedID;
      }
    },
    getOrgName:function(){
      var tempOrg = '';
      if(typeof orgName !== 'undefined')
      {
        tempOrg = orgName;
      }
      return tempOrg;
    }

  },
    created: function() {
      $.getJSON('/ajax/getDepartments.php')
          .done(data => {
              this.loadingRouteData = false;
              if(this.deptID !== null)
              {
                this.selectedID = this.deptID;
              } 
              this.unfiltered = data
              this.searchDepts();
          })
    }
}
</script>
<style>
  .searchCount{
    color:blue;
    margin-left:.5em;    
  }
</style>
<style scoped>
  .departmentScrolldown{
    width:auto;
    max-width:315px;
    }
  .goButton{
    float:right;
  }
  .selectedDepartment{
    color:green;
  }
</style>