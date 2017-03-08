<template>
    <div class="heading cont_padding flex">
        <div class="back"> 
            <router-link v-if="router" :to="router"></router-link>
        </div>
        <div class="title" v-if="title" v-text="title"></div>
        <div class="title_right size_14" v-if="r_router">
            <router-link v-if="r_router" :to="r_router" v-text="r_title"></router-link>
        </div>
        <div class="title_right size_14" v-else>
            {{r_title}}
        </div>
    </div>   
</template>

<script>
export default {
    name:'y-header',
    props:['title','r_title','router','r_router']
}
</script>
