<template>
    <div id="FilerTools" class="filterTools">
        <FilterShop></FilterShop>
        <FilterBrand></FilterBrand>
        <FilterCustomers></FilterCustomers>
    </div>
</template>
<script>
import FilterShop from './FilterShop'
import FilterBrand from './FilterBrand'
import FilterCustomers from './FilterCustomers'

export default {
    name: 'FilerTools',
    data() {
        return {}
    },
    props: {},
    computed: {},
    components: {
        FilterShop,
        FilterBrand,
        FilterCustomers
    },
    mounted() {},
    updated() {},
    methods: {}
}

</script>
<style>
@import './map/filtertool.css'

</style>
