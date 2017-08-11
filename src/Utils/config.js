// 检查登录状态
const loginState = {
  getUser: (name) => {
    return JSON.parse(sessionStorage.getItem(name));
  },
  setUser: (name, data) => {
      // localStorage.setItem(name, data);
    sessionStorage.setItem(name, JSON.stringify(data));
  },
  removeUser: (name) => {
    sessionStorage.removeItem(name);
  },
};


module.exports = {
  name: '',
  prefix: '',
  footerText: '',
  count: 10,
  //apiUrl:"http://172.16.1.81:8060/",
  apiUrl: apiUrl,
  ws: 'ws://42.159.117.106:8060',
  logo: './logo.png',
  loginState,
  openPages: ['/login', '/special/bricsmapinfo', '/special/bricsdispatch'],
};
