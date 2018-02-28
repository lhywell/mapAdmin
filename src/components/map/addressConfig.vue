<template>
    <div id="addressConfig" class="addressConfig">
        <Button type="ghost" icon="android-settings" @click="configOpen">选址配置</Button>
    </div>
</template>
<script>
export default {
    name: 'addressConfig',
    data() {
        return {}
    },
    props: {},
    computed: {},
    components: {},
    mounted() {},
    updated() {},
    methods: {
        configOpen() {
            this.$store.dispatch('swtichBrandDetailModal', { 'modalState': true })
        }
    }
}

</script>
<style scoped>
@import './map/addressConfig.css'

</style>
<style>
.addressConfig {
    .ivu-icon-android-settings {
        color: var(--color-icon);
        font-size: var(--font-icon);
        margin-right: 2px;
    }
}

</style>
