<template>
    <div id="allmap" style="width:100%;height:100%"></div>
</template>
<script>
import mapData from '@/assets/json/data.json'
import testData from '@/assets/json/test.json'

export default {
    name: 'test',
    data() {
        return {

        }
    },
    components: {

    },
    mounted() {
        this.createMap();
    },
    methods: {
        createMap() {
            var inmap = new inMap.Map({
                id: "allmap",
                skin: "WhiteLover",
                // skin: 'Blueness',
                center: ["114.215408", "22.654411"],
                // center: ["117.211624", "40.341439"],
                zoom: {
                    value: 11,
                    show: true,
                    max: 22
                }
            });

            this.drawLayer(inmap)
        },
        drawLayer(inmap) {

            var overlay = new inMap.BoundaryOverlay({
                tooltip: {
                    show: true,
                    formatter: function(params) {
                        return (
                            "<div>" +
                            " <div>" +
                            " <span>count : </span><span>" +
                            params.count +
                            "</span>" +
                            " </div>" +
                            " <div>" +
                            " <span>name : </span><span>" +
                            params.name +
                            "</span>" +
                            " </div></div>"
                        );
                    },
                    offsets: {
                        top: 15,
                        left: 15
                    },
                    customClass: "auto"
                },
                legend: {
                    show: false,
                    title: "板块去重设备数 "
                },
                style: {
                    normal: {
                        borderWidth: 1.5,
                        backgroundColor: "rgba(0,184,255,0.80)",
                        label: {
                            show: true, // 是否显示
                            font: "13px bold ",
                            color: "#fff",
                        }
                    },
                    mouseOver: {
                        shadowColor: "rgba(0, 0, 0, 1)",
                        shadowBlur: 10,
                        borderWidth: 1.5,
                        label: {
                            color: "rgba(0, 0, 0, 1)"
                        }
                    },
                    selected: {
                        backgroundColor: "rgba(184,0,0,1)",
                        borderColor: "rgba(255,255,255,1)",
                        label: {
                            color: "rgba(255,255,255,1)"
                        }
                    },
                    // colors: [
                    //     "rgba(156,200,249,0.4)",
                    //     "rgba(93,158,247,0.4)",
                    //     "rgba(134,207,55,0.4)",
                    //     "rgba(252,198,10,0.4)",
                    //     "rgba(255,144,0,0.4)"
                    // ]
                },
                multiSelect: false
            });
            inmap.add(overlay);
            overlay.setPoints(mapData);
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './dashboard/dashboard.css';
</style>

<style>
    .auto{
        background-color: white;
        color:black;
    }

</style>

