<template>
    <div>
        <div class="error_prompt size_16" v-if="mask.maskState">
            <img v-if="mask.maskLoding" class="loding-img" src="./assets/images/loding.gif">
            <span v-text="mask.maskContent"></span>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <router-view></router-view>
        </transition>
        <y-footer></y-footer>
    </div>
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
            ...mapState({
                mask:state => state.mask
            })
        },
        methods:{

        }
    }

</script>