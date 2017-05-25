<template>
    <option :value="dept.ID">{{dept.OrgName}} : {{dept.DeptName}}</option>
</template>

<script>
    export default {
        name: 'department-option',
        props: ['dept']
    };
</script>

