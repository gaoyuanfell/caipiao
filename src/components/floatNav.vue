<template>
    <div class="box_mask" :style="display" ref="nav" @click="$visibility">
        <div class="float_nav flex animated" :class="{'slideInDown_':visibility,'slideOutUp_':!visibility}">
            <span v-for="(n, index) in navs" class="nav_btn" @click.stop="$method(n)">{{n.name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'float-nav',
    data() {
        return {
            visibility: false,
            display: {
                display: 'none'
            }
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
        }
    }
}
</script>