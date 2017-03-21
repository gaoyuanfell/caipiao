<template>
	<div class="content-modal">
		<y-header title="修改密码" :router="{name:'user'}"></y-header>
		<div class="contener">
			<div class="scroll-content" margin-header>
				<div class="form-group">
					<label class="control-label">
						<span>原密码</span>
						<input type="text" v-model="model.OPWD" placeholder="请输入原密码"/>
					</label>
					<label class="control-label">
						<span>新密码</span>
						<input type="text" v-model="model.PWD" placeholder="密码由6-20位字母、数字组成"/>
					</label>
					<label class="control-label">
						<span>确认密码</span>
						<input type="text" v-model="model.PWD1" placeholder="请重复输入密码"/>
					</label>
				</div>
				<div class="default-btn">
					<button @click="submit" class="btn">确认修改</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters,mapActions, mapState } from 'vuex';
	import Vue from 'vue'
	import header from '../../components/header.vue';
	import { Toast } from 'mint-ui';
	export default {
		components: {
			'y-header': header,
		},
		data() {
			return {
				model: {}
			}
		},
		created: function () {

		},
		mounted:function(){

		},
		computed: {
			...mapGetters({
				user:'getUser'
			})
		},
		methods:{
			...mapActions([
				'userpwd_'
			]),
			submit() {
				let reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
				let OPWD = this.model.OPWD;
				let PWD = this.model.PWD;
				let PWD1 = this.model.PWD1;
				if(OPWD && PWD && PWD1){
					if(reg.test(PWD) && PWD == PWD1){
						this.userpwd_({ PWD:PWD, OPWD:OPWD, UID:this.user.UserId }).then(
							(res) => {
								this._toast && (this._toast.close())
								this._toast = Toast('修改成功！');
								setTimeout( ()=> { this.$router.push({name:'user'}) }, 1000 )
							}
						)
					}else{
						this._toast && (this._toast.close())
						this._toast = Toast('两次密码不一致，请重新输入！')
					}
				}else{
					this._toast && (this._toast.close())
					this._toast = Toast('请填写内容')
				}
			}
		}
	}

</script>