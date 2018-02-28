<template>
    <div id="top">
        <div class="headerTop">
            <div class="headerLeft">
                <img class="logo" :src="this.logo" width="185" height="31">
                <!-- <span class="brand">
                    <img src="../../assets/images/zhy.png" width="32" height="32">
                </span> -->
                <div class="components">
                    <seletctBrand></seletctBrand>
                    <Location></Location>
                </div>
            </div>
            <span class="email">
                <span class="icon-account_circle"></span>
            <a href="javascript:void(0)" @click="toLocation">demo@tendcloud.com</a>
            </span>
        </div>
    </div>
</template>
<script>
import seletctBrand from './seletctBrand';
import Location from './Location';

export default {
    name: 'smartHeader',
    data() {
        return {
            brand: '',
            logo: this.$utils.$static + '/logo_ts.png'
        }
    },

    components: {
        seletctBrand,
        Location
    },
    mounted() {

    },
    computed: {},
    methods: {
        toLocation() {
            this.$router.push('/login');
        }
    }
}

</script>
<style scoped>
@import './header/header.css';

</style>
