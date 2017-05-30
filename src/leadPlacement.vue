<template>
      <div>

       <div class="backgroundSquare">
          {{ message }} - Question #{{selectedQuestion}}
          <div class="optionHolder">
            <select v-on:change="changeQuestion" v-model="selectedQuestion">
                    <option v-for="(option,key) in questionOptions" :value="key">{{key}} - {{ option.referral }}</option>
                      <!-- <organization-option v-for="(org, i) in orgs" :org="org" :key="org.ID"></organization-option> -->
                   </select>

                    <!-- <options-box :leadOptions="leadOptions" :selectedLeads="selectedLeads"></options-box> -->
                    <div v-for="leadOption in leadOptions" v-model="leadOptions">
                      <input type="checkbox"  v-model="selectedLeadOption" :value="leadOption"> {{ leadOption }} </input>
                    </div>
          </div>
          <img class="mrMcMann" v-for="source in backgroundSource" :src="source" />
          <div class="leadHolder">
              <single-lead v-for="(lead, key) in placements" v-on:selectLead="filterUser" :title="lead.title" class="lead" :lead="lead"></single-lead>
          </div>  
              <img class="hitAreas" v-for="area in hitAreas" :src="area" />
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
      backgroundSource:['https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/bedside/Front_Body.png'],
      hitAreas:[],
      answers:[],
      placements:[],
      message:'Lead Placement',
      leadOptions:[],
      selectedLeads:[],
      questionOptions:{},
      selectedLeadOption:[],
      selectedQuestion:0,
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
              this.answers[i].Placements[j].user = this.answers[i];
              this.placements.push(this.answers[i].Placements[j]);
              
            }
          }
        }
        this.filterLeads();
        this.highlightHitAreas();
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
              this.answers[i].Placements[j].user = this.answers[i];
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
    highlightHitAreas:function()
    {
      switch(this.selectedQuestion) {
          case '2410':
                this.backgroundSource = [
                  'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/Front_Body.png',
                  'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/Front_Ribs.png'
                ]

                this.hitAreas = [
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/LA.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/LL.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/RA.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/RL.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/V1.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/V2.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/V3.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/V4.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/V5.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/12Lead/V6.png'
              ]

              break;
          case '2411':
                this.backgroundSource = [
                  'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/Front_Body.png',
                  'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/Front_Ribs.png'
                ]
                this.hitAreas = [
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/LA.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/LL.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/RA.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/RL.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/V1R.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/V2R.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/V3R.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/V4R.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/V5R.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/diagnostic/18Lead/V6R.png'
                ]
              break;
          case '2412':
              this.backgroundSource = ['https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/bedside/Front_Body.png'];
              this.hitAreas = [
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/bedside/3Lead/LA.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/bedside/3Lead/LL.png',
                'https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/bedside/3Lead/RA.png'
              ]
              break;
          default:
              this.backgroundSource = ['https://d9de626265c75f8c35a5-ef69c638836b68114e46e3b19717493d.ssl.cf2.rackcdn.com/bedside/Front_Body.png'];
              this.hitAreas = [];
              break;
      }

      console.log(this.selectedQuestion);
    },
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
      var tempQuestions ={};
      for(var i in this.answers)
      {
        if(typeof tempQuestions[this.answers[i].QuestionID] == 'undefined')
        {
          /*let tempChoice = {
            questionID: this.answers[i].QuestionID,
            referral: this.answers[i].referral
          }

          tempQuestions.push(tempChoice);*/

          tempQuestions[this.answers[i].QuestionID] = {referral:this.answers[i].Referral};
        }
      }

      this.questionOptions = tempQuestions;      
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
  .mrMcMann, .hitAreas{
    position:absolute;
   height:2156px;
      width:1032px;
      top:0;
      left:0;
  }
  .hitAreas{
    opacity:0.4;
  }
  .optionHolder{

    position:absolute;
    z-index:999;

  }
</style>