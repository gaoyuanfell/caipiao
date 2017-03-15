<template>
    <div class="contener" :style="{'zIndex':$route.params.zIndex}">
        <y-header title="我的彩票" router="/user"></y-header>
        <div class="scroll-content" style="margin-bottom:0">
            <div class="personal_management">
                <div class="item flex" @click=" sheetVisible = !sheetVisible ">
                    <div class="personal_lef">我的头像</div>
                    <div class="personal_rig noheight">
                        <img ref="img" :src="imgUrl || '/static/img/morentoux.png'" alt="">
                    </div>
                    <span href="javascript:;" class="information_bg">
                        <i class="icon">&#xe608;</i>
                    </span>
                </div>
                <div class="item flex" @click="nickName">
                    <div class="personal_lef">昵称</div>
                    <div class="personal_rig">{{nickName | confusePhone}}</div>
                    <span href="javascript:;" class="information_bg">
                        <i class="icon">&#xe608;</i>
                    </span>
                </div>
                <div class="item flex">
                    <div class="personal_lef">登录手机号</div>
                    <div class="personal_rig">123****5678</div>
                    <span href="javascript:;" class="information_bg">
                        <i class="icon">&#xe608;</i>
                    </span>
                </div>
            </div>

            <div hide>
                <input @change="photoCapture" ref="capture" type="file" accept="image/*" capture/>
                <input @change="photoAlbum" ref="album" type="file" accept="image/*"/>
            </div>

            <div class="position-btn"><button class="btn">退出登录</button></div>
        </div>

        <mt-actionsheet :actions="actions" v-model="sheetVisible"> </mt-actionsheet>

        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Vue from 'vue';
    import header from '../../components/header.vue';
    import { Actionsheet, MessageBox } from 'mint-ui';
    Vue.component(Actionsheet.name, Actionsheet);
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                sheetVisible:false,
                imgUrl:null,
                nickName:13870814666
            }
        },
        created: function () {
            
        },
        computed:{
            ...mapGetters({
                
            }),
            actions(){
                let that = this;
                return [
                    {
                        name:'拍照',
                        method:function(){
                            that.$refs.capture.click();
                            console.info('拍照');
                        }
                    },
                    {
                        name:'从相册上传',
                        method:function(){
                            that.$refs.album.click();
                            console.info('从相册上传');
                        }
                    }
                ]
            }
        },
        methods:{
            nickName(){
                MessageBox.prompt('请输入昵称').then(
                    ({ value, action }) => {
                        console.info(value)
                        console.info(action)
                    },
                    (e) => {
                        console.info(e)
                    }
                );
            },
            photoCapture(){
                let capture = this.$refs.capture
                let img = this.$refs.img
                let file = capture.files[0];
                var reader = new FileReader();
                reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
                reader.readAsDataURL(file);

                console.info(this.$refs);
            },
            photoAlbum(){
                let album = this.$refs.album;
                let img = this.$refs.img
                let file = album.files[0];
                var reader = new FileReader();
                reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
                reader.readAsDataURL(file);
                console.info(this.$refs);
            }
        }
    }
</script>