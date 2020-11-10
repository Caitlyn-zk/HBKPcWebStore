// 资金范围
const fundRang = [{
        value: 0,
        label: '不限'
    }, {
        value: 10,
        label: '5万以下'
    }, {
        value: 20,
        label: '5-10万'
    }, {
        value: 30,
        label: '10-20万'
    }, {
        value: 40,
        label: '20-50万'
    }, {
        value: 50,
        label: '50-100万'
    }, {
        value: 60,
        label: '100-500万'
    }, {
        value: 70,
        label: '500-1000万'
    }, {
        value: 80,
        label: '1000万以上'
    }]
    // 金额
const salary = [{
        value: 0,
        label: '不限'
    },
    {
        value: 1,
        label: '1k-3k'
    }, {
        value: 2,
        label: '3k-4k'
    }, {
        value: 3,
        label: '4k-5k'
    }, {
        value: 4,
        label: '5k-6k'
    }, {
        value: 5,
        label: '6k-7k'
    }, {
        value: 6,
        label: '8k-10k'
    }, {
        value: 7,
        label: '10k-12k'
    }, {
        value: 8,
        label: '12k-20k'
    }, {
        value: 9,
        label: '20k以上'
    }
]
// 金额
const mainSalary = [{
    value: 0,
    label: '1k'
  },
  {
      value: 1,
      label: '2k'
  }, {
      value: 2,
      label: '3k'
  }, {
      value: 3,
      label: '4k'
  }, {
      value: 4,
      label: '5k'
  }, {
      value: 5,
      label: '6k'
  }, {
      value: 6,
      label: '7k'
  }, {
      value: 7,
      label: '8k'
  }, {
      value: 8,
      label: '9k'
  }, {
      value: 9,
      label: '10k'
  }, {
      value: 10,
      label: '11k'
  }, {
      value: 11,
      label: '12k'
  }, {
      value: 12,
      label: '13k'
  }, {
      value: 13,
      label: '14k'
  }, {
      value: 14,
      label: '15k'
  }, {
      value: 15,
      label: '16k'
  }, {
      value: 16,
      label: '17k'
  }, {
    value: 17,
    label: '18k'
  }, {
    value: 18,
    label: '19k'
  }, {
    value: 19,
    label: '20k'
  }, {
    value: 20,
    label: '21k'
  }, {
    value: 21,
    label: '22k'
  }, {
    value: 22,
    label: '23k'
  }, {
    value: 23,
    label: '24k'
  }, {
    value: 24,
    label: '25k'
  }, {
    value: 25,
    label: '26k'
  }, {
    value: 26,
    label: '27k'
  }, {
    value: 27,
    label: '28k'
  }, {
    value: 28,
    label: '29k'
  }, {
    value: 30,
    label: '31k'
  }, {
    value: 31,
    label: '32k'
  }, {
    value: 33,
    label: '33k'
  }, {
    value: 34,
    label: '25k'
  }, {
    value: 35,
    label: '36k'
  }, {
    value: 36,
    label: '27k'
  }, {
    value: 37,
    label: '38k'
  }, {
    value: 38,
    label: '39k'
  }, {
    value: 39,
    label: '40k'
  }, {
    value: 40,
    label: '41k'
  }, {
    value: 41,
    label: '42k'
  }, {
    value: 42,
    label: '43k'
  }, {
    value: 43,
    label: '44k'
  }, {
    value: 44,
    label: '45k'
  }, {
    value: 46,
    label: '47k'
  }, {
    value: 47,
    label: '48k'
  }, {
    value: 48,
    label: '49k'
  }, {
    value: 49,
    label: '50k'
  }, {
    value: 50,
    label: '51k'
  }
]
const salaryNumber = [
    {value:1000,label:"1k"},
    {value:2000,label:"2k"},
    {value:3000,label:"3k"},
    {value:4000,label:"4k"},
    {value:5000,label:"5k"},
    {value:6000,label:"6k"},
    {value:7000,label:"7k"},
    {value:8000,label:"8k"},
    {value:9000,label:"9k"},
    {value:10000,label:"10k"},
    {value:11000,label:"11k"},
    {value:12000,label:"12k"},
    {value:13000,label:"13k"},
    {value:14000,label:"14k"},
    {value:15000,label:"15k"},
    {value:16000,label:"16k"},
    {value:17000,label:"17k"},
    {value:18000,label:"18k"},
    {value:19000,label:"19k"},
    {value:20000,label:"20k"},
    {value:21000,label:"21k"},
    {value:22000,label:"22k"},
    {value:23000,label:"23k"},
    {value:24000,label:"24k"},
    {value:25000,label:"25k"},
    {value:26000,label:"26k"},
    {value:27000,label:"27k"},
    {value:28000,label:"28k"},
    {value:29000,label:"29k"},
    {value:30000,label:"30k"},
    {value:31000,label:"31k"},
    {value:32000,label:"32k"},
    {value:33000,label:"33k"},
    {value:34000,label:"34k"},
    {value:35000,label:"35k"},
    {value:36000,label:"36k"},
    {value:37000,label:"37k"},
    {value:38000,label:"38k"},
    {value:39000,label:"39k"},
    {value:40000,label:"40k"},
    {value:41000,label:"41k"},
    {value:42000,label:"42k"},
    {value:43000,label:"43k"},
    {value:44000,label:"44k"},
    {value:45000,label:"45k"},
    {value:46000,label:"46k"},
    {value:47000,label:"47k"},
    {value:48000,label:"48k"},
    {value:49000,label:"49k"},
    {value:50000,label:"50k"},
    {value:51000,label:"51k"},
    {value:52000,label:"52k"},
    {value:53000,label:"53k"},
    {value:54000,label:"54k"},
    {value:55000,label:"55k"},
    {value:56000,label:"56k"},
    {value:57000,label:"57k"},
    {value:58000,label:"58k"},
    {value:59000,label:"59k"},
    {value:60000,label:"60k"},
    {value:61000,label:"61k"},
    {value:62000,label:"62k"},
    {value:63000,label:"63k"},
    {value:64000,label:"64k"},
    {value:65000,label:"65k"},
    {value:66000,label:"66k"},
    {value:67000,label:"67k"},
    {value:68000,label:"68k"},
    {value:69000,label:"69k"},
    {value:70000,label:"70k"},
    {value:71000,label:"71k"},
    {value:72000,label:"72k"},
    {value:73000,label:"73k"},
    {value:74000,label:"74k"},
    {value:75000,label:"75k"},
    {value:76000,label:"76k"},
    {value:77000,label:"77k"},
    {value:78000,label:"78k"},
    {value:79000,label:"79k"},
    {value:80000,label:"80k"},
    {value:81000,label:"81k"},
    {value:82000,label:"82k"},
    {value:83000,label:"83k"},
    {value:84000,label:"84k"},
    {value:85000,label:"85k"},
    {value:86000,label:"86k"},
    {value:87000,label:"87k"},
    {value:88000,label:"88k"},
    {value:89000,label:"89k"},
    {value:90000,label:"90k"},
    {value:91000,label:"91k"},
    {value:92000,label:"92k"},
    {value:93000,label:"93k"},
    {value:94000,label:"94k"},
    {value:95000,label:"95k"},
    {value:96000,label:"96k"},
    {value:97000,label:"97k"},
    {value:98000,label:"98k"},
    {value:99000,label:"99k"},
    {value:100000,label:"100k以上"}
]
    // 工作年限
const workLife = [
    {
        value: 0,
        label: '不限'
    }, {
        value: 1,
        label: '1年以下'
    }, {
        value: 2,
        label: '1-3年'
    }, {
        value: 3,
        label: '3-5年'
    }, {
        value: 4,
        label: '5-8年'
    }, {
        value: 5,
        label: '8-10年'
    },{
        value: 6,
        label: '10年以上'
    }]
    // 学历
const minEdu = [{
        value: 0,
        label: '不限'
    }, {
        value: 10,
        label: '大专'
    }, {
        value: 20,
        label: '本科'
    }, {
        value: 30,
        label: '硕士'
    }, {
        value: 40,
        label: '博士'
    }]
    // 年龄
const age = [
    {
        value: 0,
        label:'不限'
    },
    {
        value: 1,
        label:'22岁及以下'
    },
    {
        value: 2,
        label:'22-26岁'
    },
    {
        value: 3,
        label:'26-30岁'
    },
    {
        value: 4,
        label:'30-35岁'
    },
    {
        value: 5,
        label:'35以上'
    }
]
    // 职位类型
const workType = [{
        value: 0,
        label: '不限'
    },{
        value: 10,
        label: '全职'
    }, {
        value: 20,
        label: '兼职'
    }, {
        value: 30,
        label: '实习'
    }]
    //  有效期
const validDay = [{
        value: 10,
        label: '10天内'
    }, {
        value: 20,
        label: '20天内'
    }, {
        value: 30,
        label: '1个月'
    }]
    // 是否统招
const tzList = [{
        value: 0,
        label: '统招'
      }, {
        value: 1,
        label: '非统招'
      }]
    // 状态
const postState = [{
        value: 10,
        label: '上线'
    }, {
        value: 20,
        label: '手动上线'
    }, {
        value: 21,
        label: '自动下线'
    }, {
        value: 28,
        label: '违规下线'
    }]
    // 公示类型判断
const publicityTypeJudge = [{
    value: 1,
    label: '环评公示'
}, {
    value: 2,
    label: '验收公示'
}]
const compayScale = [
    // {
    //   label:'不限',
    //   value: 0
    // },
    {
      label:'少于15人',
      value: 1
    },
    {
      label:'15-50人',
      value: 2
    },
    {
      label:'50-150人',
      value: 3
    },
    {
      label:'150-500人',
      value: 4
    },
    {
      label:'500-2000人',
      value: 5
    },
    {
      label:'2000以上',
      value: 6
    }
  ]
const industryNeighborhood =  [
    {
      label:'不限',
      value: 0
    },
    {
      label:'移动互联网',
      value: 1
    },
    {
      label:'电商',
      value: 2
    },
    {
      label:'金融',
      value: 3
    },
    {
      label:'企业服务',
      value: 4
    },
    {
      label:'教育',
      value: 5
    },
    {
      label:'文娱 | 内容',
      value: 6
    },
    {
      label:'游戏',
      value: 7
    },
    {
      label:'消费生活',
      value: 8
    },
    {
      label:'硬件',
      value: 9
    },
    {
      label:'社交',
      value: 10
    },
    {
      label:'旅游',
      value: 11
    },
    {
      label:'体育工具',
      value: 12
    },
    {
      label:'汽车 | 出行',
      value: 13
    },
    {
      label:'物流 | 运输',
      value: 14
    },
      {
      label:'医疗 | 健康',
      value: 15
    },
    {
      label:'广告营销',
      value: 16
    },
    {
      label:'数据服务',
      value: 17
    },
    {
      label:'信息安全',
      value: 18
    },
    {
      label:'人工智能',
      value: 19
    },  {
      label:'区块链',
      value: 20
    },
    {
      label:'物联网',
      value: 21
    },
    {
      label:'VR | AR',
      value: 22
    },
    {
      label:'软件开发',
      value: 23
    },
    {
      label:'通信电子',
      value: 24
    },
    {
      label:'房产家居',
      value: 25
    },
    {
      label:'其他',
      value: 26
    }
  ]
const delivery_status = [
    {
      value: 0,
      label:'不限'
    },
    {
      value: 10,
      label:'未查询'
    },
    {
      value: 20,
      label:'已查询'
    },
    {
      value: 30,
      label:'感兴趣'
    },
    {
      value: 40,
      label:'邀面试'
    },
    {
      value: 50,
      label:'不合适'
    }
  ]
const inTime = [
    {
      value: 10,
      label:'随时到岗'
    },
    {
      value: 20,
      label:'1星期内到岗'
    },
    {
      value: 30,
      label:'1个月内到岗'
    },
    {
      value: 40,
      label:'3个月内到岗'
    }
  ]
const privacyState = [
    {
      value: 10,
      label:'完全公开'
    },
    {
      value: 20,
      label:'完全保密'
    }
  ]
  const proCate = [
    {
      id: 20,
      cate_name: "工程",
      children: [
        {
          id: 2003,
          cate_name: "饮用水工程"
        },
        {
          id: 2001,
          cate_name: "生态环境工程"
        }
      ]
    },
    {
      id: 10,
      cate_name: "咨询",
      children: [
        {
          id: 1006,
          cate_name: "项目环评"
        },
        {
          id: 1005,
          cate_name: "项目竣工验收"
        },
        {
          id: 1004,
          cate_name: "环保应急预案"
        },
        {
          id: 1002,
          cate_name: "环境监测"
        },
        {
          id: 1001,
          cate_name: "咨询"
        }
      ]
    }
  ];
  const timeList = [{
    value: 1,
    label: '一天内'
  }, {
    value: 2,
    label: '三天内'
  }, {
    value: 3,
    label: '一周前'
  }, {
    value: 4,
    label: '一个月前'
  }, {
    value: 5,
    label: '三个月内'
  }]
export {
    fundRang,
    salary,
    workLife,
    minEdu,
    workType,
    validDay,
    postState,
    publicityTypeJudge,
    salaryNumber,
    mainSalary,
    tzList,
    // 公司规模
    compayScale,
    // 行业邻域
    industryNeighborhood,
    delivery_status,
    age,
    inTime,
    privacyState,
    proCate,
    timeList
}