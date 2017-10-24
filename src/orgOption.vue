<template>

    <option v-if="org.HasActive == 'false'" class="noActive" :value="org.ID">{{org.Name}}</option>
    <option v-else :value="org.ID">{{org.Name}}</option>
</template>

<script>
    export default {
        name: 'organization-option',
        props: ['org']
    };
</script>

<style scoped>
.noActive{
    color:#bf0000;
}
</style>
 