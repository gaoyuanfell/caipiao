<template>
	<div class="contener" :style="{'zIndex':zIndex}">
		<y-header title="账户明细" router="/user"></y-header>
		<div class="tabs">
			<ul class="detailed_menu flex">
				<li class="size_16 border_right">
					<p class="typecolor">可用余额</p>
					<p class="numberred"> {{ usermoney.Money | number('元') }} </p>
				</li>
				<li class="size_16 border_right">
					<p class="typecolor">冻结金额</p>
					<p class="numberred"> {{ usermoney.FreezeMoney | number('元') }} </p>
				</li>
				<li class="size_16">
					<p class="typecolor">账户余额</p>
					<p class="numberred"> {{ usermoney.UserBalance | number('元') }} </p>
				</li>
			</ul>
			<ul class="notice_menu flex">
				<template v-for="(t,index) in tabs">
					<li :class="{active:activeIndex == index}" class="typehot size_16" @click="tab(index)">
						<a href="JavaScript:;">{{t.title}}</a>
					</li>
				</template>
			</ul>
			<!--以上是tab菜单-->
			<div class="detail_list scroll-tab cont_padding" style="top: 1.52rem;bottom: 0;" v-if="activeIndex == 0">
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

			<div class="detail_list scroll-tab cont_padding" style="top: 1.52rem;bottom: 0;" v-if="activeIndex == 1">
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

			<div class="detail_list scroll-tab cont_padding" style="top: 1.52rem;bottom: 0;" v-if="activeIndex == 2">
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
			this.usermoney_({ PN: 13000000000 });
			this.usercost_({ PN: 13000000000 });
		},
		mounted: function () {

		},
		computed: {
			...mapGetters({
				zIndex: 'getZindex'
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