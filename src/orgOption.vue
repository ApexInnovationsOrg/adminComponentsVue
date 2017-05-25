<template>

    <option v-if="org.HasActiveSeats == 'false'" class="noActiveSeats" :value="org.ID">{{org.Name}}</option>
    <option v-else :value="org.ID">{{org.Name}}</option>
</template>

<script>
    export default {
        name: 'organization-option',
        props: ['org']
    };
</script>

<style scoped>
.noActiveSeats{
    color:#bf0000;
}
</style>
 