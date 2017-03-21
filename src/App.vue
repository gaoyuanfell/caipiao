<template>
    <mian>
        <div class="tabs">
            <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <keep-alive>
                    <router-view name="node"></router-view>
                </keep-alive>
            </transition>
            <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <keep-alive>
                    <router-view name="footer"></router-view>
                </keep-alive>
            </transition>
        </div>
        <!-- 通过路由 push进来的页面渲染view -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </mian>
</template>

<script>
    export default {
        
    }
</script>