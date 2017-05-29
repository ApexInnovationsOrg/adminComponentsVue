<template>

		
	  <!-- <div class="lead correct">'</div> -->

	  <div>
	  	<h4>Lead Options</h4>
	  	<div>
	  		<div>Selected leads: {{picked}}</div> 

	  		<div v-for="leadOption in leadOptions" v-model="picked" >
	  			<input type="checkbox" :value="leadOption"> {{ leadOption }} </input>
	  		</div>
	  	</div>

	  </div>

	
</template>

<script>
    export default {
        name: 'single-lead',
        data:{
        	picked:['V1']
        },
        props: ['leadOptions','title']
    };
</script>

<style scoped>
	.lead{
		height:10px;
		width:10px;
		position:absolute;

		border-radius:100%;

	}
	.correct{
		background:rgba(0,107,0,0.6);
	}
</style>
 