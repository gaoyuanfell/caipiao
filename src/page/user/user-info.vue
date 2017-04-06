<template>
    <div class="content-modal">
        <y-header title="我的彩票" :router="{name:'manage'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="personal_management">
                    <div class="item flex" @click=" sheetVisible = !sheetVisible ">
                        <div class="personal_lef">我的头像</div>
                        <div class="personal_rig noheight">
                            <img ref="img" :src="user.LogoUrl || '/static/img/morentoux.png'" alt="">
                        </div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </div>
                    <div class="item flex" @click="nickNameModify">
                        <div class="personal_lef">昵称</div>
                        <div class="personal_rig">{{user.NickName || user.MobilePhone | confusePhone}}</div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </div>
                    <div class="item flex">
                        <div class="personal_lef">登录手机号</div>
                        <div class="personal_rig">{{user.MobilePhone | confusePhone}}</div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </div>
                </div>

                <div hide>
                    <input @change="photoCapture" ref="capture" type="file" accept="image/*" capture="camera"/>
                    <input @change="photoAlbum" ref="album" type="file" accept="image/*" />
                </div>

                <div class="default-btn"><button class="btn" @click="loginout">退出登录</button></div>
            </div>

            <mt-actionsheet :actions="actions" v-model="sheetVisible"> </mt-actionsheet>

        </div>
        <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
    import Vue from 'vue';
    import header from '../../components/header.vue';
    import compressImg from '../../compress-img.js';
    import canDeactivate from '../../canDeactivate';
    import { Actionsheet, Toast } from 'mint-ui';
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
        mounted:function(){
            
        },
        computed:{
            ...mapGetters({
                
            }),
            ...mapState({
                user:state => state.user
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
            ...mapMutations({
                // clearUser:'clearUser'
            }),
            ...mapActions([
                'doupload_',
                'loginout_',
                'userunn_',
            ]),
            loginout(){
                this.loginout_({UID:this.user.UserId}).then(
                    (res) => {
                        window.localStorage.clear();
                        // this.clearUser();
                        this.$router.replace({name:'login'})
                    }
                )
            },
            nickNameModify(){
                let name = this.user.NickName || this.user.MobilePhone || '';
                this.$router.push({name:'userInfoName',query:{NickName:name}})
            },
            photoCapture(){
                let capture = this.$refs.capture
                let img = this.$refs.img
                let file = capture.files[0];
                var formData = new FormData();
                formData.append('userId', this.user.UserId);
                formData.append('typeId', 1);
                compressImg(file).then(
                    (result) => {
                        formData.append('file', result, file.name);
                        this.doupload_(formData).then(
                            (res) => {
                                console.info(res)
                                img.src = res.file;
                                this.user.LogoUrl = res.file;
                                this._toast && (this._toast.close())
                                this._toast = Toast('修改成功')
                                // this._toast = Toast('修改成功')
                            },
                            () => {
                                this._toast && (this._toast.close())
                                this._toast = Toast('修改失败')
                            }
                        )
                    }
                )
                // var reader = new FileReader();
                // reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
                // reader.readAsDataURL(file);
            },
            photoAlbum(){
                let album = this.$refs.album;
                let img = this.$refs.img
                let file = album.files[0];
                var formData = new FormData();
                formData.append('userId', this.user.UserId);
                formData.append('typeId', 1);
                compressImg(file).then(
                    (result) => {
                        formData.append('file', result, file.name);
                        this.doupload_(formData).then(
                            (res) => {
                                console.info(res)
                                img.src = res.file;
                                this.user.LogoUrl = res.file;
                                this._toast && (this._toast.close())
                                this._toast = Toast('修改成功')
                            },
                            () => {
                                this._toast && (this._toast.close())
                                this._toast = Toast('修改失败')
                            }
                        )
                    }
                )
                
                // var reader = new FileReader();
                // reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
                // reader.readAsDataURL(file);
                // console.info(this.$refs);
            }
        },
        beforeRouteEnter(to, from, next){
            if(canDeactivate()){
                next();
            }
        }
    }
</script>