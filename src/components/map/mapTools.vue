<template>
    <div class="tools" id="tools">
        <Search></Search>
        <DropTools></DropTools>
        <FilerTools></FilerTools>
        <addressConfig></addressConfig>
    </div>
</template>
<script>
import Search from './Search'
import DropTools from './DropTools'
import FilerTools from './FilerTools'
import addressConfig from './addressConfig'

export default {
    name: 'tools',
    data() {
        return {
            list: null
        }
    },
    props: {},
    components: {
        Search,
        DropTools,
        FilerTools,
        addressConfig
    },
    mounted() {

    },
    methods: {

    },
    watch: {}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './map/tools.css'

</style>
