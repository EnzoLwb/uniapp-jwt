export default [
	{
			"id": 52,
			"first_recharge": false,//是否是首充活动
			"title": "满0.02送10元",
			"tips": "充值即送不限次数",//描述
			"type": 1,// 0 无活动 1 返现 2 给券
			"baseline": 1.00,//'底线 最低充多少'
			"limit_number": 3,//限制次数
			"grant_fee": 10,//返现金额
			"coupons": "3|11",
			"enable": true,
			"not_before":"2020-12-08",
			"not_after":"2020-12-18",
	 },

	{
			"id": 53,
			"first_recharge": true,//是否是首充活动
			"title": "满20元送券",
			"tips": "充值即送不限次数",//描述
			"type": 2,// 0 无活动 1 返现 2 给券
			"baseline": 20.00,//'底线 最低充多少'
			"limit_number": 3,//限制次数
			"grant_fee": null,//返现金额
			"coupons": [31,32],
			"enable": false,
			"not_before":null,
			"not_after":null,
	 },
	{
			"id": 54,
			"first_recharge": true,//是否是首充活动
			"title": "充值 30元",
			"tips": "",//描述
			"type": 0,// 0 无活动 1 返现 2 给券
			"baseline": 30.00,//'底线 最低充多少'
			"limit_number": 0,//限制次数
			"grant_fee": null,//返现金额
			"coupons": [],
			"enable": true,
			"not_before":"2021-12-08",
			"not_after":"2022-12-08",
	 },
]
