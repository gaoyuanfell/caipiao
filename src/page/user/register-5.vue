<template>
    <div class="content-modal">
        <y-header title="再次输入6位数支付密码" r_title="登录" :r_router="{name:'login'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="lose_password flex">
                    <template v-for="z in zfList">
                        <div class="paswd_box">
                            <i v-if="z >= 0"></i>
                        </div>
                    </template>
                </div>
                <div class="number_key flex" @click="selectKey($event)">
                    <div class="key key_num" data-num="1">1</div>
                    <div class="key key_num" data-num="2">2</div>
                    <div class="key key_num" data-num="3">3</div>
                    <div class="key key_num" data-num="4">4</div>
                    <div class="key key_num" data-num="5">5</div>
                    <div class="key key_num" data-num="6">6</div>
                    <div class="key key_num" data-num="7">7</div>
                    <div class="key key_num" data-num="8">8</div>
                    <div class="key key_num" data-num="9">9</div>
                    <div class="key gray no-border" @click="removeKey"> </div>
                    <div class="key key_num no-border" data-num="0">0</div>
                    <div class="key gray no-border" @click="deleteKey"> </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';
    import header from '../../components/header.vue';
    import { Toast } from 'mint-ui';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                zfList:[-1,-1,-1,-1,-1,-1]
            }
        },
        created: function () {
            
        },
        computed:{
            ...mapGetters({
                
            }),
            zIndex:function(){
                return this.$route.params.zIndex
            },
            ...mapState({
                userReg:state => state.$user.userReg
            })
        },
        methods:{
            ...mapMutations({
                setUserRegByKey:'setUserRegByKey',
                setUser:'setUser',
            }),
            ...mapActions([
                'register_'
            ]),
            selectKey(event){
                let $key = event.target;
                let classList = $key.classList;
                if($key.classList.contains('key_num')){
                    let num = $key.getAttribute('data-num');
                    let l = this.zfList.indexOf(-1);
                    l != -1 && this.zfList.splice(l,1,num);
                    l = this.zfList.indexOf(-1);
                    if(l == -1){
                        let ZF = this.zfList.join("");
                        let _ZF = this.userReg.ZF;
                        if( ZF == _ZF ){
                            this.register_(this.userReg).then(
                                (res) => {
                                    console.info(res);
                                    this.setUser(res);
                                    this._toast && (this._toast.close())
                                    this._toast = Toast('注册成功！');
                                    setTimeout( () => { this.$router.push({name:'user'}) }, 1000 )
                                }
                            )
                        }else{
                            this._toast && (this._toast.close())
                            this._toast = Toast('两次的支付密码不一致，请重新输入！');
                        }
                    }
                }
            },
            deleteKey(){
                let _l = this.zfList.length;
                let l = this.zfList.indexOf(-1);
                if(l != 0){
                    if(l == -1){
                        this.zfList.splice(_l - 1, 1, -1);
                    }else{
                        this.zfList.splice(l - 1, 1, -1);
                    }
                }
            },
            removeKey(){
                this.zfList = [-1,-1,-1,-1,-1,-1];
            }
        }
    }
</script>