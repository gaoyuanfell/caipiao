<template>
    <div class="box_mask" :style="display" ref="menu" @click="$visibility">
        <div class="float_menu animated" :class="{'zoomIn_t_r':visibility,'zoomOut_t_r':!visibility}">
            <span class="triangle_menu"></span>
            <p class="menu_item" v-for="(m, index) in menus" @click.stop="$method(m)">
                <i class="icon" v-html="m.icon"></i>
                {{m.name}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'float-menu',
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
        menus: {
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
            let $menu = this.$refs.menu;
            if (val) {
                this.display.display = 'block';
            } else {
                setTimeout(() => { this.display.display = 'none'; }, 200)
            }
        }
    }
}
</script>