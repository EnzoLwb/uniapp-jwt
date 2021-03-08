export default 
{
			"常用":[
					{
						title: '会员管理',
						name: '用户信息查看、修改',
						color: 'cyan',
						cuIcon: 'peoplelist',
						url:'/pages/admin/members/index'
					},
					{
						title: '买单记录',
						name: '查看用户买单记录',
						color: 'blue',
						cuIcon: 'barcode',
						url:'/pages/admin/finance/check'
					},
					{
						title: '充值记录',
						name: '查看用户充值记录',
						color: 'purple',
						cuIcon: 'recharge',
						url:'/pages/admin/finance/deposit'
					},
					{
						title: '剧本管理',
						name: '专业剧本总库，无需上传，点点即可',
						color: 'mauve',
						cuIcon: 'form',
						url:'/pages/admin/dramas/list'
					},
					{
						title: '预约管理',
						name: '联系玩家，发起收款，发送成局通知',
						color: 'pink',
						cuIcon: 'calendar',
						url:'/pages/admin/groups/reserve'	
					},
					{
						title: '开本历史',
						name: '查看主持人开本信息，审核信息',
						color: 'brown',
						cuIcon: 'group_fill',
						url:'/pages/admin/dramas/opening-group'
					},
			],
			"剧本":[
				{
					title: '上传剧本',
					name: '手动添加新本',
					color: 'orange',
					cuIcon: 'roundadd',
					url:'/pages/admin/dramas/add'
				},
				{
					title: '剧本管理',
					name: '专业剧本总库，无需上传，点点即可',
					color: 'red',
					cuIcon: 'form',
					url:'/pages/admin/dramas/list'
				},
			],
			"设置":[
				{
					title: '店铺设置',
					name: '门店基本信息，默认价格等配置',
					color: 'olive',
					cuIcon: 'shop',
					url:'/pages/admin/store/index'
				},
				{
					title: '分店设置',
					name: '分店基本信息，剧本、DM等配置',
					color: 'cyan',
					cuIcon: 'taoxaiopu',
					url:'/pages/admin/store/branch'
				},
				{
					title: '其他设置',
					name: '各种配置在此设置',
					color: 'green',
					cuIcon: 'settings',
					url:'/pages/admin/store/setting'
				},
			],
			"人员":[
				{
					title: '会员管理',
					name: '用户信息查看、修改',
					color: 'pink',
					cuIcon: 'peoplelist',
					url:'/pages/admin/members/index'
				},
				{
					title: 'DM管理',
					name: '主持人整体配置，评分，辞退等',
					color: 'mauve',
					cuIcon: 'service',
					url:'/pages/admin/members/dm'
				},
				{
					title: '开本历史',
					name: '查看主持人开本信息，审核信息',
					color: 'purple',
					cuIcon: 'group_fill',
					url:'/pages/admin/dramas/opening-group'
				},
			],
			"推广":[
				{
					title: '优惠券管理',
					name: '优惠券设置、管理',
					color: 'cyan',
					cuIcon: 'ticket',
					url:'/pages/admin/extend/coupons'
				},
				{
					title: '充值管理',
					name: '管理充值活动',
					color: 'brown',
					cuIcon: 'ticket',
					url:'/pages/admin/extend/recharge'
				},
				{
					title: '预约管理',
					name: '联系玩家，发起收款，发送成局通知',
					color: 'blue',
					cuIcon: 'calendar',
					url:'/pages/admin/groups/reserve'
				},
			],
			"财务":[
				{
					title: '交易数据',
					name: '店铺涉及金钱的数据都在这',
					color: 'orange',
					cuIcon: 'rank',
					url:'/pages/admin/finance/index'
				},
				{
					title: '买单记录',
					name: '查看用户买单记录',
					color: 'cyan',
					cuIcon: 'barcode',
					url:'/pages/admin/finance/check'
				},
				{
					title: '充值记录',
					name: '查看用户充值记录',
					color: 'mauve',
					cuIcon: 'recharge',
					url:'/pages/admin/finance/deposit'
				}
			],
}
