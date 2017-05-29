<template>

		
	  <!-- <div class="lead correct">'</div> -->

	  <div v-bind:class="{correct: lead.correct == true, incorrect: lead.correct == false}" v-on:click="testClick" :title="title" v-bind:style="{ 'transform': 'translate(' + lead.x + 'px,' + lead.y + 'px)' }"></div>

	
</template>

<script>
    export default {
        name: 'single-lead',
        props: ['lead','title'],
        methods:{
        	testClick:function(){
        		// console.log(leadModel);
        		console.log(this.lead);
        		this.$emit('selectLead','parameter');
        	},
        	filterUser:function(){
        		console.log('uhhh');
        	}
        }
    };
</script>

<style scoped>
	.lead{
		height:10px;
		width:10px;
		position:absolute;
		border-radius:100%;
		cursor:pointer;
	}
	.correct{
		background:rgba(0,107,0,0.6);
	}
	.incorrect{
		background:rgba(255,0,0,0.7);
	}
</style>
 