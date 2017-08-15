module.exports = [
  {
    key:'scene',
    name:'场景管理',
    icon: 'control_board'
  },
  {
    key:'robot',
    name:'机器人管理',
    icon: 'robot'
  },
  {
    key:'map',
    name:'地图管理',
    icon: 'map',
    clickable: false,
    child: [
      {
        key: 'map',
        name: '地图',
      },
      {
        key: 'point',
        name: '导航点',
      }
    ],
  },
  {
    key:'log',
    name:'日志管理',
    icon: 'ticket',
    clickable: false,
    child: [
      {
        key: 'map',
        name: '地图包',
      },
      // {
      //   key: 'warning',
      //   name: '故障',
      // },
    ],
  }
];
