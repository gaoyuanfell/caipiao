<template>
    <div class="content-modal">
        <y-header title="双色球走势图" router="-1"></y-header>
        <div class="content" margin-header>
            <trend-chart>
                
            </trend-chart>
        </div>
    </div>
</template>

<script>
    import trendChart from '../../components/trendChart.vue';
    import header from '../../components/header.vue';
    export default {
        components: {
            'y-header': header,
            'trend-chart': trendChart,
        },
    }
</script>