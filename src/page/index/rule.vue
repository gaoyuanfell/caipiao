<template>
    <div class="content-modal">
        <y-header title="玩法介绍" router="-1"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <svg>
                    <rect x="0" y="0" width="100" height="100" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    import header from '../../components/header.vue';
    export default {
        components: {
            'y-header': header,
        },
    }
</script>