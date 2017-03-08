<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="实名认证" router="/user"></y-header>
        <div class="center_content body_overflow">
            <div class="revisions_content">
                <label class="cont_padding">
						<span class="typecolor size_14">真实姓名</span>
						<input type="text" v-model="model.name" placeholder="需与真实姓名一致，提交后不可修改"/>
					</label>
                <label class="cont_padding">
						<span class="typecolor size_14">身份证号</span>
						<input type="text" v-model="model.sfz" placeholder="需与身份证一致，提交后不可修改"/>
					</label>
                <label class="cont_padding">
						<span class="typecolor size_14">确认号码</span>
						<input type="text" v-model="model.repe" placeholder="请重复输入身份证号码"/>
					</label>
                <div class="revision cont_padding">
                    <a href="javascript:;" @click="submit" class="continue_bet size_18">提交认证</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import header from '../../components/header.vue';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                model:{}
            }
        },
        methods: {
            submit(){
				if(!this.model.name || !this.model.sfz || !this.model) {
                    alert('每一项都必须填写')
				}
            }
        },
        created: function () {
            
        },
        computed:{
            ...mapGetters({
                zIndex: 'getZindex'
            })
        }
    }
</script>