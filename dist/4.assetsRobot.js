webpackJsonp([4],{113:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(2),n=o(r),l=a(9),i=o(l),d=a(3),c=o(d),s=a(7),f=o(s),u=a(6),p=o(u),b=a(5),g=o(b),m=a(1),y=o(m),h=a(10),k=o(h),v=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&(a[o[r]]=e[o[r]]);return a},E=function(e){function t(){(0,c.default)(this,t);var e=(0,p.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.handleClick=function(){var t=e.props,a=t.checked,o=t.onChange;o&&o(!a)},e}return(0,g.default)(t,e),(0,f.default)(t,[{key:"render",value:function(){var e,t=this.props,a=t.prefixCls,o=void 0===a?"ant-tag":a,r=t.className,l=t.checked,d=v(t,["prefixCls","className","checked"]),c=(0,k.default)(o,(e={},(0,i.default)(e,o+"-checkable",!0),(0,i.default)(e,o+"-checkable-checked",l),e),r);return delete d.onChange,y.default.createElement("div",(0,n.default)({},d,{className:c,onClick:this.handleClick}))}}]),t}(y.default.Component);t.default=E,e.exports=t.default},114:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(2),n=o(r),l=a(9),i=o(l),d=a(3),c=o(d),s=a(7),f=o(s),u=a(6),p=o(u),b=a(5),g=o(b),m=a(1),y=o(m),h=a(15),k=o(h),v=a(51),E=o(v),x=a(10),w=o(x),P=a(61),T=o(P),C=a(13),O=o(C),_=a(113),M=o(_),j=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&(a[o[r]]=e[o[r]]);return a},N=function(e){function t(e){(0,c.default)(this,t);var a=(0,p.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.close=function(e){var t=a.props.onClose;if(t&&t(e),!e.defaultPrevented){var o=k.default.findDOMNode(a);o.style.width=o.getBoundingClientRect().width+"px",o.style.width=o.getBoundingClientRect().width+"px",a.setState({closing:!0})}},a.animationEnd=function(e,t){if(!t&&!a.state.closed){a.setState({closed:!0,closing:!1});var o=a.props.afterClose;o&&o()}},a.state={closing:!1,closed:!1},a}return(0,g.default)(t,e),(0,f.default)(t,[{key:"isPresetColor",value:function(e){return/^(pink|red|yellow|orange|cyan|green|blue|purple)(-inverse)?$/.test(e)}},{key:"render",value:function(){var e,t=this.props,a=t.prefixCls,o=t.closable,r=t.color,l=t.className,d=t.children,c=t.style,s=j(t,["prefixCls","closable","color","className","children","style"]),f=o?y.default.createElement(O.default,{type:"cross",onClick:this.close}):"",u=this.isPresetColor(r),p=(0,w.default)(a,(e={},(0,i.default)(e,a+"-"+r,u),(0,i.default)(e,a+"-has-color",r&&!u),(0,i.default)(e,a+"-close",this.state.closing),e),l),b=(0,T.default)(s,["onClose","afterClose"]),g=(0,n.default)({backgroundColor:r&&!u?r:null},c),m=this.state.closed?null:y.default.createElement("div",(0,n.default)({"data-show":!this.state.closing},b,{className:p,style:g}),y.default.createElement("span",{className:a+"-text"},d),f);return y.default.createElement(E.default,{component:"",showProp:"data-show",transitionName:a+"-zoom",transitionAppear:!0,onEnd:this.animationEnd},m)}}]),t}(y.default.Component);t.default=N,N.CheckableTag=M.default,N.defaultProps={prefixCls:"ant-tag",closable:!1},e.exports=t.default},115:[1061,123],121:function(e,t,a){t=e.exports=a(59)(),t.push([e.id,".ant-tag{display:inline-block;line-height:20px;height:22px;padding:0 8px;border-radius:3px;border:1px solid #f4f4f4;background:#f3f3f3;font-size:14px;transition:all .3s cubic-bezier(.78,.14,.15,.86);opacity:1;margin-right:8px;cursor:pointer;white-space:nowrap}.ant-tag:hover{opacity:.85}.ant-tag,.ant-tag a,.ant-tag a:hover{color:#666}.ant-tag-text a:first-child:last-child{display:inline-block;margin:0 -8px;padding:0 8px}.ant-tag .anticon-cross{display:inline-block;font-size:14px;font-size:10px\\9;-webkit-transform:scale(.83333333) rotate(0deg);-ms-transform:scale(.83333333) rotate(0deg);transform:scale(.83333333) rotate(0deg);-ms-filter:\"progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=1, M12=0, M21=0, M22=1)\";zoom:1;cursor:pointer;font-weight:700;margin-left:3px;transition:all .3s ease;opacity:.66}:root .ant-tag .anticon-cross{-webkit-filter:none;filter:none;font-size:14px}.ant-tag .anticon-cross:hover{opacity:1}.ant-tag-has-color{border-color:transparent}.ant-tag-has-color,.ant-tag-has-color .anticon-cross,.ant-tag-has-color .anticon-cross:hover,.ant-tag-has-color a,.ant-tag-has-color a:hover{color:#fff}.ant-tag-checkable{background-color:transparent;border-color:transparent}.ant-tag-checkable-checked,.ant-tag-checkable:active,.ant-tag-checkable:hover{color:#fff}.ant-tag-checkable:hover{background-color:#49a9ee}.ant-tag-checkable-checked{background-color:#108ee9}.ant-tag-checkable:active{background-color:#0e77ca}.ant-tag-close{width:0!important;padding:0;margin:0}.ant-tag-zoom-appear,.ant-tag-zoom-enter{-webkit-animation:antFadeIn .2s cubic-bezier(.78,.14,.15,.86);animation:antFadeIn .2s cubic-bezier(.78,.14,.15,.86);-webkit-animation-fill-mode:both;animation-fill-mode:both}.ant-tag-zoom-leave{-webkit-animation:antZoomOut .3s cubic-bezier(.78,.14,.15,.86);animation:antZoomOut .3s cubic-bezier(.78,.14,.15,.86);-webkit-animation-fill-mode:both;animation-fill-mode:both}.ant-tag-pink{color:#f5317f;background:#fdd8e7;border-color:#fdd8e7}.ant-tag-pink-inverse{background:#f5317f;border-color:#f5317f;color:#fff}.ant-tag-red{color:#f04134;background:#fcdbd9;border-color:#fcdbd9}.ant-tag-red-inverse{background:#f04134;border-color:#f04134;color:#fff}.ant-tag-orange{color:#f56a00;background:#fde3cf;border-color:#fde3cf}.ant-tag-orange-inverse{background:#f56a00;border-color:#f56a00;color:#fff}.ant-tag-yellow{color:#ffbf00;background:#fff3cf;border-color:#fff3cf}.ant-tag-yellow-inverse{background:#ffbf00;border-color:#ffbf00;color:#fff}.ant-tag-cyan{color:#00a2ae;background:#cfedf0;border-color:#cfedf0}.ant-tag-cyan-inverse{background:#00a2ae;border-color:#00a2ae;color:#fff}.ant-tag-green{color:#00a854;background:#cfefdf;border-color:#cfefdf}.ant-tag-green-inverse{background:#00a854;border-color:#00a854;color:#fff}.ant-tag-blue{color:#108ee9;background:#d2eafb;border-color:#d2eafb}.ant-tag-blue-inverse{background:#108ee9;border-color:#108ee9;color:#fff}.ant-tag-purple{color:#7265e6;background:#e4e2fa;border-color:#e4e2fa}.ant-tag-purple-inverse{background:#7265e6;border-color:#7265e6;color:#fff}",""])},123:function(e,t,a){var o=a(121);"string"==typeof o&&(o=[[e.id,o,""]]);a(63)(o,{});o.locals&&(e.exports=o.locals)},598:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){function t(){f(function(e){if(!e){var t=p();t.chargerMapPointList=[{id:t.chargerMapPointList}],o((0,b.default)({},t,{id:a.id||""}))}})}var a=e.item,o=e.onOk,r=e.onCancel,n=(e.robotType,e.pointCharger),i=e.form,c=i.getFieldDecorator,f=i.validateFields,p=i.getFieldsValue,g={title:""+(a.id?"修改机器人":"添加机器人"),visible:!0,onOk:t,onCancel:r,width:640,wrapClassName:"vertical-center-modal"};return v.default.createElement(l.default,g,v.default.createElement(h.default,{layout:"horizontal",onSubmit:t},v.default.createElement(E,(0,b.default)({label:"机器编号"},w),a.code),a.sceneName&&v.default.createElement(E,(0,b.default)({label:"场景名称"},w),a.sceneName),v.default.createElement(E,(0,b.default)({label:"机器名称"},w),c("name",{initialValue:a.name,rules:[{required:!0,message:"机机器名称未填写"}]})(v.default.createElement(u.default,null))),v.default.createElement(E,(0,b.default)({label:"低电量阈值(%)"},w),c("lowBatteryThreshold",{initialValue:a.lowBatteryThreshold||50,rules:[{required:!0,message:"低电量阈值未填写"}]})(v.default.createElement(s.default,{min:0,max:100}))),v.default.createElement(E,(0,b.default)({label:"足电量阈值(%)"},w),c("sufficientBatteryThreshold",{initialValue:a.sufficientBatteryThreshold||50,rules:[{required:!0,message:"足电量阈值未填写"}]})(v.default.createElement(s.default,{min:0,max:100}))),v.default.createElement(E,(0,b.default)({label:"充电桩设置"},w),c("chargerMapPointList",{initialValue:a.chargerMapPointList.length>0?a.chargerMapPointList[0].id:"",rules:[{required:!0,message:"充电桩设置未填写"}]})(v.default.createElement(x,null,v.default.createElement(d.default,null,n.map(function(e,t){return v.default.createElement(m.default,{key:t,value:e.id},e.point_alias||e.point_name)}))))),v.default.createElement(E,(0,b.default)({label:"备注"},w),c("description",{initialValue:a.description||""})(v.default.createElement(u.default,{type:"textarea",rows:6})))))}Object.defineProperty(t,"__esModule",{value:!0});var n=(a(21),a(20)),l=o(n),i=(a(57),a(56)),d=o(i),c=(a(167),a(166)),s=o(c),f=(a(35),a(46)),u=o(f),p=a(2),b=o(p),g=(a(112),a(90)),m=o(g),y=(a(45),a(44)),h=o(y),k=a(1),v=o(k),E=h.default.Item,x=m.default.Group,w={labelCol:{span:6},wrapperCol:{span:16}};r.propTypes={form:k.PropTypes.object.isRequired,robotType:k.PropTypes.array.isRequired,pointCharger:k.PropTypes.array.isRequired,item:k.PropTypes.object,onOk:k.PropTypes.func,onCancel:k.PropTypes.func},t.default=h.default.create()(r),e.exports=t.default},599:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=e.data,a=e.loading,o=e.onEdit,r=e.onDetail,n=(e.robotType,function(e,t){var a;return(a={},(0,u.default)(a,m.UPDATE,o),(0,u.default)(a,m.DETAIL,r),a)[e](t)}),i=[{title:"机器编号",dataIndex:"code"},{title:"场景名称",dataIndex:"sceneName"},{title:"机器名称",dataIndex:"name"},{title:"低电量阈值",dataIndex:"lowBatteryThreshold",render:function(e,t){return b.default.createElement("span",null,e?e+"%":"")}},{title:"足电量阈值",dataIndex:"sufficientBatteryThreshold",render:function(e,t){return b.default.createElement("span",null,e?e+"%":"")}},{title:"充电桩",dataIndex:"chargerMapPointList",render:function(e,t){return b.default.createElement("div",null,e.map(function(e,t){return b.default.createElement(s.default,{color:"#ADB7D4",key:e.id},e.point_alias)}))}},{title:"备注",dataIndex:"description"},{title:"操作",key:"operation",width:100,className:"textAlign",render:function(e,t){return b.default.createElement("ul",null,b.default.createElement("li",null,b.default.createElement(l.default,{placement:"top",title:"编辑",onClick:function(){return n(m.UPDATE,t)}},b.default.createElement(d.default,{type:"edit"}))))}}];return b.default.createElement(g.DataTable,{columns:i,data:t,loading:a})}Object.defineProperty(t,"__esModule",{value:!0});var n=(a(39),a(38)),l=o(n),i=(a(24),a(13)),d=o(i),c=(a(115),a(114)),s=o(c),f=a(9),u=o(f),p=a(1),b=o(p),g=a(18),m=a(48);r.propTypes={data:p.PropTypes.object.isRequired,onEdit:p.PropTypes.func.isRequired,onDetail:p.PropTypes.func.isRequired,robotType:p.PropTypes.array},t.default=r,e.exports=t.default},600:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){function t(){f(function(e){e||o((0,s.default)({},p()))})}var a=e.item,o=e.onOk,r=e.onCancel,n=e.robotType,i=e.form,c=i.getFieldDecorator,f=i.validateFields,p=i.getFieldsValue,y={title:"修改密码-"+a.name+"-"+n[a.typeId-1].name,visible:!0,onOk:t,onCancel:r,wrapClassName:"vertical-center-modal"};return b.default.createElement(l.default,y,b.default.createElement(u.default,{layout:"inline",onSubmit:t},a.passwords&&a.passwords.map(function(e,t){e.id;return b.default.createElement(g,(0,s.default)({label:e.boxNum,key:t},m),c(""+e.id,{initialValue:e.password,rules:[{required:!0,pattern:/^\d{4}$/,message:"请输入4位密码"}]})(b.default.createElement(d.default,null)))})))}Object.defineProperty(t,"__esModule",{value:!0});var n=(a(21),a(20)),l=o(n),i=(a(35),a(46)),d=o(i),c=a(2),s=o(c),f=(a(45),a(44)),u=o(f),p=a(1),b=o(p),g=u.default.Item,m={labelCol:{span:8},wrapperCol:{span:14}};r.propTypes={form:p.PropTypes.object.isRequired,item:p.PropTypes.object,onOk:p.PropTypes.func,onCancel:p.PropTypes.func,robotType:p.PropTypes.array},t.default=u.default.create()(r),e.exports=t.default},601:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=e.datas,a=e.loading,o=e.dispatch,r=t.data,n=t.item,l=t.robotType,d=t.Visible,c=t.pointCharger,f={data:r,loading:a,robotType:l,onEdit:function(e){0===c.length&&o({type:"AssetsRobot/pointCharger"}),o({type:"AssetsRobot/VisibleEdit",payload:{Visible:"edit",item:e}})},onDetail:function(e){o({type:"AssetsRobot/VisibleEdit",payload:{Visible:"password",item:e}})}},p={item:n,robotType:l,pointCharger:c,onOk:function(e){o({type:"AssetsRobot/post",payload:e})},onCancel:function(){o({type:"AssetsRobot/VisibleEdit",payload:{Visible:"list"}})}},g={item:n,robotType:l,onOk:function(e){var t=[];for(var a in e)t.push({id:a,password:e[a]});o({type:"AssetsRobot/password",payload:{passwords:t}})},onCancel:function(){o({type:"AssetsRobot/VisibleEdit",payload:{Visible:"list"}})}};return i.default.createElement("div",{className:"modelMain"},i.default.createElement("div",{className:"connect"},i.default.createElement(s.default,f),"edit"===d&&i.default.createElement(u.default,p),"password"===d&&i.default.createElement(b.default,g)))}function n(e,t){return{loading:e.loading.models.AssetsRobot,datas:e.AssetsRobot}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(1),i=o(l),d=a(23),c=(a(18),a(599)),s=o(c),f=a(598),u=o(f),p=a(600),b=o(p);r.propTypes={dispatch:l.PropTypes.func,loading:l.PropTypes.bool,datas:l.PropTypes.object},t.default=(0,d.connect)(n)(r),e.exports=t.default}});