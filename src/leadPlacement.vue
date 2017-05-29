<template>
      <div>

       <div class="backgroundSquare">
          {{ message }} - Question #{{selectedQuestion}}
          <div class="optionHolder">
            <select v-on:change="changeQuestion" v-model="selectedQuestion">
                    <option v-for="option in questionOptions" :value="option">{{option}}</option>
                      <!-- <organization-option v-for="(org, i) in orgs" :org="org" :key="org.ID"></organization-option> -->
                   </select>

                    <!-- <options-box :leadOptions="leadOptions" :selectedLeads="selectedLeads"></options-box> -->
                    <div v-for="leadOption in leadOptions" v-model="leadOptions">
                      <input type="checkbox"  v-model="selectedLeadOption" :value="leadOption"> {{ leadOption }} </input>
                    </div>
          </div>
          <img class="mrMcMann" src="https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/Adam.png" />
          <div class="leadHolder">
              <single-lead v-for="(lead, key) in placements" v-on:selectLead="filterUser" :title="lead.title" class="lead" :lead="lead"></single-lead>
          </div>  
       </div>
       
      </div>
</template>

<script>
import singleLead from './singleLead.vue';
import optionsBox from './optionsBox.vue';

export default {
  name: 'leadComponentVue',
  data () {
    return {
      answers:[],
      placements:[],
      message:'Lead Placement',
      leadOptions:[],
      selectedLeads:[],
      questionOptions:[],
      selectedLeadOption:[],
      selectedQuestion:0
    }
  },
  watch:{
    placements:function(){
      console.log('doot');
    },
    selectedQuestion:function(){
      this.placements = [];
       for(var i in this.answers)
        {
          for(var j in this.answers[i].Placements)
          {
            if(this.answers[i].QuestionID == this.selectedQuestion)
            {
              this.answers[i].Placements[j].title = j;
              this.placements.push(this.answers[i].Placements[j]);
              
            }
          }
        }
        this.filterLeads();
    },
    selectedLeadOption:function(){
      this.placements = [];
       for(var i in this.answers)
        {
          for(var j in this.answers[i].Placements)
          {
            // console.log(j)
            if(this.answers[i].QuestionID == this.selectedQuestion && this.selectedLeadOption.indexOf(j) !== -1)
            {
              this.answers[i].Placements[j].title = j;
              this.placements.push(this.answers[i].Placements[j]);
              
            }
          }
        }
    }
  },
  components:{
      'single-lead':singleLead,
      'options-box':optionsBox
  },
  methods:{
    filterUser:function(dootdoot)
    {
      console.log('filter user');
      console.log(dootdoot);
    },
    filterLeads:function()
    {
      var tempLeads = [];
      for(var i in this.answers)
      {
        for(let j in this.answers[i].Placements)
        {
          if(this.answers[i].QuestionID == this.selectedQuestion && tempLeads.indexOf(j) == -1)
          {
            tempLeads.push(j);
          }
        }
      }

      this.selectedLeadOption = tempLeads;
      this.leadOptions = tempLeads;
    },
    getLeads:function()
    {
      var tempLeads = [];
      for(var i in this.answers)
      {
        for(let j in this.answers[i].Placements)
        {
          if(tempLeads.indexOf(j) == -1)
          {
            tempLeads.push(j);
          }
        }
      }

      this.leadOptions = tempLeads;
    },
    getQuestions:function()
    {
      var tempQuestions = [];
      for(var i in this.answers)
      {
        if(tempQuestions.indexOf(this.answers[i].QuestionID) == -1)
        {
          tempQuestions.push(this.answers[i].QuestionID);
        }
      }

      this.questionOptions = tempQuestions.sort();      
    }
  },
    created: function() {
        $.getJSON('https://devbox2.apexinnovations.com/ajax/getLeads.php')
            .done(data => {

                var dammitJohn = [{
                  FirstName:"Amy",
                    ID:"1",
                    LastName:"Connell",
                    Passed:"N",
                    Placements:'{"LL":{"x":516,"y":375.5},"LA":{"x":655,"y":553.5},"RA":{"x":371.95,"y":552.45}}',
                    QuestionID:"2410",
                    TestResultID:"2159163"
                }]


                // this.answers = dammitJohn.map(function(question){
                //   question.Placements = JSON.parse(question.Placements);
                //   return question;
                // })

                this.answers = data.map(function(question){
                  try {
                    question.Placements = JSON.parse(question.Placements);
                    return question;
                  }
                  catch(e){
                    return false
                  }
                })     
                for(var i in this.answers)
                {
                  for(var j in this.answers[i].Placements)
                  {
                    this.answers[i].Placements[j].title = j;
                    this.placements.push(this.answers[i].Placements[j]);
                    
                  }
                }
    
                this.getLeads();
                this.getQuestions();

            })
    }
}
</script>
<style scoped>
  .backgroundSquare{
    background:rgba(218,218,218,.5);
    height:2156px;
    width:1032px;
    position:relative;
  }
  .leadHolder{
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
  }
  .mrMcMann{
    position:absolute;
   height:2156px;
      width:1032px;
      top:0;
      left:0;
  }
  .optionHolder{

    position:absolute;
    z-index:999;

  }
</style>