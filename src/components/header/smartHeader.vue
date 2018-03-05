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
            <div class="email">
                <span class="icon-account_circle"></span>
                <span class="com">demo@tendcloud.com</span>
                <Dropdown placement="bottom-end">
                    <Button type="primary" class="wl">
                        <span class="icon-fence"></span>
                        <Icon type="chevron-down"></Icon>
                    </Button>
                    <Dropdown-menu slot="list">
                        <Dropdown-item>
                            <div class="quit" @click="quit">
                                <Icon type="android-exit"></Icon>退出登录
                            </div>
                        </Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
            </div>
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
        quit() {
            this.$router.push('/login');
        }
    }
}

</script>
<style scoped>
@import './header/header.css';

</style>
