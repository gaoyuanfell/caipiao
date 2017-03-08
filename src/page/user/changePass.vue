<template>
	<div class="contener" :style="{'zIndex':zIndex}">
		<y-header title="修改密码" router="/user"></y-header>
		<div class="center_content body_overflow">
			<div class="revisions_content">
				<label class="cont_padding">
						<span class="typecolor size_14">原密码</span>
						<input type="text" v-model="model.oldpass" placeholder="请输入原密码"/>
					</label>
				<label class="cont_padding">
						<span class="typecolor size_14">新密码</span>
						<input type="text" v-model="model.newpass" placeholder="密码由6-20位字母、数字组成"/>
					</label>
				<label class="cont_padding">
						<span class="typecolor size_14">确认密码</span>
						<input type="text" v-model="model.repe" placeholder="请重复输入密码"  />
					</label>
				<div class="revision cont_padding">
					<a href="javascript:;" @click="submit" class="continue_bet size_18">确认修改</a>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Vue from 'vue'
	import header from '../../components/header.vue';
	import {
		Toast
	} from 'mint-ui';
	Vue.component(Toast);
	export default {
		components: {
			'y-header': header,
		},
		data() {
			return {
				model: {}
			}
		},
		methods: {
			submit() {
				if (!this.model.newpass || !this.model.oldpass || !this.model) {
					alert('每一项都必须填写')
				}
			}
		},
		created: function () {

		},
		computed: {
			...mapGetters({
				zIndex: 'getZindex'
			})
		}
	}

</script>