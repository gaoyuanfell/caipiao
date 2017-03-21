<template>
	<div class="content-modal">
		<y-header title="账户明细" :router="{name:'user'}"></y-header>
		<div class="content">
			<div class="scroll-content" margin-header>
				<ul class="detailed_menu flex">
					<li class="item">
						<p>可用余额</p>
						<p> {{ usermoney.Money | number('元') }} </p>
					</li>
					<li class="item">
						<p>冻结金额</p>
						<p> {{ usermoney.FreezeMoney | number('元') }} </p>
					</li>
					<li class="item">
						<p>账户余额</p>
						<p> {{ usermoney.UserBalance | number('元') }} </p>
					</li>
				</ul>
				<ul class="notice_menu flex">
					<template v-for="(t,index) in tabs">
						<li :class="{active:activeIndex == index}" class="item" @click="tab(index)">
							<a href="JavaScript:;">{{t.title}}</a>
						</li>
					</template>
				</ul>
				<!--以上是tab菜单-->
				<div class="account-detail" v-if="activeIndex == 0">
					<template v-for="(c,index) in usercostList">
						<div class="detail_item">
							<p class="size_14 typecolor flex">
								<span>{{c.Remark}}</span>
								<span>{{c.Money | number('元')}}</span>
							</p>
							<p class="typehot">{{c.CreateTime | date}}</p>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapState } from 'vuex';
	import header from '../../components/header.vue';
	export default {
		components: {
			'y-header': header,
		},
		data() {
			return {
				activeIndex: 0,
				tabs: [{
					title: '数字彩',
				}, {
					title: '竞技彩'
				}, {
					title: '快频彩'
				}],
			}
		},
		created: function () {
			
		},
		mounted: function () {
			this.usermoney_({ PN: 13000000000 });
			this.usercost_({ PN: 13000000000 });
		},
		computed: {
			...mapGetters({
				
			}),
			...mapState({
				usermoney: state => state.$user.usermoney,
				usercostList: state => state.$user.usercostList,
			})
		},
		methods: {
			...mapActions([
				'usermoney_',
				'usercost_',
			]),
			tab: function (i) {
				this.activeIndex = i;
			}
		}
	}

</script>