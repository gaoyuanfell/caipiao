<template>
    <div class="box_mask" :style="display" ref="nav" @click="$visibility">
        <div class="float_nav animated" :class="{'slideInDown_':visibility,'slideOutUp_':!visibility}">
            <div class="navs" v-for="nav in navsList">
                <span v-for="(n, index) in nav" class="nav_btn" @click.stop="$method(n)">{{n.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { arrayslice } from '../util';
export default {
    name: 'float-nav',
    data() {
        return {
            visibility: false,
            display: {
                display: 'none'
            },
            navsList:[],
            $navs:this.navs
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        navs: {
            type: Array,
            default: () => []
        }
    },
    mounted(){
        console.info(this.navs)
        this.navsList = arrayslice(this.navs,3);
        console.info(this.navsList)
    },
    methods: {
        $visibility() {
            this.visibility = false;
            setTimeout(() => { this.display.display = 'none'; }, 200)
        },
        $method(m) {
            if (m.method && typeof m.method == 'function') {
                m.method();
            }
            this.visibility = false;
        }
    },
    watch: {
        visibility(val) {
            console.info(val)
            this.$emit('input', val);
        },
        value(val) {
            this.visibility = val;
            let $nav = this.$refs.nav;
            let i = $nav.style.zIndex;
            if (!i) {
                let finalStyle = $nav.currentStyle ? $nav.currentStyle : document.defaultView.getComputedStyle($nav, null);
                i = finalStyle.zIndex
            }
            if (val) {
                this.display.display = 'block';
                $nav.style.zIndex = 9;
                setTimeout(() => { $nav.style.zIndex = i; }, 200)
            } else {
                $nav.style.zIndex = 9;
                setTimeout(() => { this.display.display = 'none'; $nav.style.zIndex = ''; }, 200)
            }
        },
    }
}
</script>