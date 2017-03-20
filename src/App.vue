<template>
    <main>
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <keep-alive>
                <router-view name="node"></router-view>
            </keep-alive>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
        <y-footer></y-footer>
    </main>
</template>

<script>
    import { mapState } from 'vuex';
    import header from './components/header.vue';
    import footer from './components/footer.vue';
    export default {
        components: {
            'y-footer': footer,
            'y-header': header,
        },
        data() {
            return {

            }
        },
        created: function () {
            
        },
        mounted: function () {

        },
        computed:{
            
        },
        methods:{

        }
    }

</script>