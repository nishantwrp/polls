(function(t){function e(e){for(var n,i,s=e[0],r=e[1],c=e[2],p=0,u=[];p<s.length;p++)i=s[p],a[i]&&u.push(a[i][0]),a[i]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);d&&d(e);while(u.length)u.shift()();return l.push.apply(l,c||[]),o()}function o(){for(var t,e=0;e<l.length;e++){for(var o=l[e],n=!0,i=1;i<o.length;i++){var s=o[i];0!==a[s]&&(n=!1)}n&&(l.splice(e--,1),t=r(r.s=o[0]))}return t}var n={},i={app:0},a={app:0},l=[];function s(t){return r.p+"js/"+({about:"about"}[t]||t)+"."+{about:"6e8abd1c","chunk-06416e63":"0174a985"}[t]+".js"}function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.e=function(t){var e=[],o={"chunk-06416e63":1};i[t]?e.push(i[t]):0!==i[t]&&o[t]&&e.push(i[t]=new Promise(function(e,o){for(var n="css/"+({about:"about"}[t]||t)+"."+{about:"31d6cfe0","chunk-06416e63":"f2c2f45c"}[t]+".css",a=r.p+n,l=document.getElementsByTagName("link"),s=0;s<l.length;s++){var c=l[s],p=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(p===n||p===a))return e()}var u=document.getElementsByTagName("style");for(s=0;s<u.length;s++){c=u[s],p=c.getAttribute("data-href");if(p===n||p===a)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var n=e&&e.target&&e.target.src||a,l=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");l.code="CSS_CHUNK_LOAD_FAILED",l.request=n,delete i[t],d.parentNode.removeChild(d),o(l)},d.href=a;var v=document.getElementsByTagName("head")[0];v.appendChild(d)}).then(function(){i[t]=0}));var n=a[t];if(0!==n)if(n)e.push(n[2]);else{var l=new Promise(function(e,o){n=a[t]=[e,o]});e.push(n[2]=l);var c,p=document.createElement("script");p.charset="utf-8",p.timeout=120,r.nc&&p.setAttribute("nonce",r.nc),p.src=s(t),c=function(e){p.onerror=p.onload=null,clearTimeout(u);var o=a[t];if(0!==o){if(o){var n=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,l=new Error("Loading chunk "+t+" failed.\n("+n+": "+i+")");l.type=n,l.request=i,o[1](l)}a[t]=void 0}};var u=setTimeout(function(){c({type:"timeout",target:p})},12e4);p.onerror=p.onload=c,document.head.appendChild(p)}return Promise.all(e)},r.m=t,r.c=n,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],p=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var d=p;l.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"232c":function(t,e,o){"use strict";var n=o("9a57"),i=o.n(n);e["default"]=i.a},"56d7":function(t,e,o){"use strict";o.r(e);o("cadf"),o("551c"),o("f751"),o("097d");var n=o("2b0e"),i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},a=[],l={components:{}},s=l,r=(o("7faf"),o("2877")),c=Object(r["a"])(s,i,a,!1,null,null,null),p=c.exports,u=o("8c4f"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("navbar",{attrs:{selected:"1"}}),n("center",[n("div",{class:t.$style.maincontainer},[n("div",{class:t.$style.centertext},[t._v("Polls")]),n("div",{class:[t.$style.questionheads,t.ifquestion]},t._l(t.polldata,function(e,o){return n("div",{class:t.$style.questionhead,on:{click:function(e){return t.clickedpoll(o)}}},[n("i",{staticClass:"fas fa-poll",staticStyle:{color:"black"}}),t._v("\n          "+t._s(e.ques)+"\n        ")])}),0),n("div",{class:[t.$style.loading,t.ifloading]},[n("img",{attrs:{src:o("65d2")}})]),n("div",{class:[t.$style.votesection,t.ifvotesection]},[n("div",{class:t.$style.backbtn,on:{click:function(e){return t.backpressed()}}},[n("i",{staticClass:"fas fa-chevron-left"}),t._v(" Back\n        ")]),n("div",{class:t.$style.questiontext},[t._v(t._s(t.clickedquestion))]),n("div",{class:t.$style.options},[n("span",{on:{click:function(e){return t.optionclicked(1)}}},[n("optioned",{attrs:{optionval:t.opt1txt,voted:!t.optionclickable,votval:t.opt1val,covered:t.opt1per}})],1),n("span",{on:{click:function(e){return t.optionclicked(2)}}},[n("optioned",{attrs:{optionval:t.opt2txt,voted:!t.optionclickable,votval:t.opt2val,covered:t.opt2per}})],1),n("span",{on:{click:function(e){return t.optionclicked(3)}}},[n("optioned",{attrs:{optionval:t.opt3txt,voted:!t.optionclickable,votval:t.opt3val,covered:t.opt3per}})],1),n("span",{on:{click:function(e){return t.optionclicked(4)}}},[n("optioned",{attrs:{optionval:t.opt4txt,voted:!t.optionclickable,votval:t.opt4val,covered:t.opt4per}})],1)])])])])],1)},v=[],h=o("9d8d"),f=o("bc3a"),b=o.n(f),m=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{class:[t.$style.option,t.ifhover],style:t.widthstyle},[o("div",{class:t.$style.optiontext},[t._v(t._s(t.optionval))]),o("div",{class:[t.$style.votestext,t.ifvoted]},[t._v(t._s(t.votval)+" votes")])])])},k=[],_=(o("c5f6"),{props:{optionval:String,voted:Boolean,votval:Number,covered:Number},computed:{ifvoted:function(){return!0===this.voted?"":this.$style.hideit},ifhover:function(){return!0===this.voted?this.$style.nohover:this.$style.hovereff},widthstyle:function(){return"background: linear-gradient(to right, #00FF7F 0%, #00FF7F "+this.covered+"%, white "+this.covered+"%, white 100%);"}}}),g=_,y=o("a7ab");function x(t){this["$style"]=y["default"].locals||y["default"]}var w=Object(r["a"])(g,m,k,!1,x,null,null),$=w.exports,q={name:"home",components:{navbar:h["a"],optioned:$},data:function(){return{polldata:[],votesectionshow:0,loadingsectionshow:0,questionsectionshow:0,clickpollindex:0,clickedquestion:"",opt1txt:"",opt2txt:"",opt3txt:"",opt4txt:"",opt1val:0,opt2val:0,opt3val:0,opt4val:0,opt1per:0,opt2per:0,opt3per:0,opt4per:0,optionclickable:!0}},mounted:function(){var t=this;this.loadingsectionshow=1,b.a.get("https://pollswrp.herokuapp.com/questions/").then(function(e){t.polldata=e.data,t.loadingsectionshow=0,t.questionsectionshow=1}).catch(function(t){console.log(t)})},computed:{ifquestion:function(){return this.questionsectionshow?"":this.$style.hideit},ifloading:function(){return this.loadingsectionshow?"":this.$style.hideit},ifvotesection:function(){return this.votesectionshow?"":this.$style.hideit}},methods:{clickedpoll:function(t){this.clickpollindex=t,this.clickedquestion=this.polldata[t].ques,this.opt1txt=this.polldata[t].opt1,this.opt2txt=this.polldata[t].opt2,this.opt3txt=this.polldata[t].opt3,this.opt4txt=this.polldata[t].opt4,this.questionsectionshow=0,this.votesectionshow=1,this.optionclickable=!0,this.opt1per=0,this.opt2per=0,this.opt3per=0,this.opt4per=0},backpressed:function(){this.questionsectionshow=1,this.votesectionshow=0},optionclicked:function(t){var e=this;if(this.optionclickable){1===t?this.polldata[this.clickpollindex].vot1+=1:2===t?this.polldata[this.clickpollindex].vot2+=1:3===t?this.polldata[this.clickpollindex].vot3+=1:4===t&&(this.polldata[this.clickpollindex].vot4+=1);var o="https://pollswrp.herokuapp.com/questions/"+this.polldata[this.clickpollindex].id+"/",n=this.polldata[this.clickpollindex];b.a.put(o,{ques:n.ques,opt1:n.opt1,opt2:n.opt2,opt3:n.opt3,opt4:n.opt4,vot1:n.vot1,vot2:n.vot2,vot3:n.vot3,vot4:n.vot4}).then(function(t){iziToast.show({title:"Success",message:"Vote Recorded",color:"green",position:"bottomCenter",icon:"fas fa-check"}),console.log("Vote Recorded"),e.opt1val=n.vot1,e.opt2val=n.vot2,e.opt3val=n.vot3,e.opt4val=n.vot4,e.optionclickable=!1;var o=n.vot1+n.vot2+n.vot3+n.vot4;e.opt1per=Math.ceil(n.vot1/o*100),e.opt2per=Math.ceil(n.vot2/o*100),e.opt3per=Math.ceil(n.vot3/o*100),e.opt4per=Math.ceil(n.vot4/o*100)}).catch(function(o){console.log(o),1===t?e.polldata[e.clickpollindex].vot1-=1:2===t?e.polldata[e.clickpollindex].vot2-=1:3===t?e.polldata[e.clickpollindex].vot3-=1:4===t&&(e.polldata[e.clickpollindex].vot4-=1),iziToast.show({title:"Error",message:"Could not register your vote",color:"red",position:"bottomCenter",icon:"fas fa-exclamation-circle"})})}else console.log("Already Voted"),iziToast.show({title:"Warning",message:"You have voted already",color:"yellow",position:"bottomCenter",icon:"fas fa-exclamation-triangle"})}}},C=q,S=o("232c");function j(t){this["$style"]=S["default"].locals||S["default"]}var O=Object(r["a"])(C,d,v,!1,j,null,null),E=O.exports;n["a"].use(u["a"]);var T=new u["a"]({routes:[{path:"/",name:"home",component:E},{path:"/about",name:"about",component:function(){return o.e("about").then(o.bind(null,"f820"))}},{path:"/create",name:"create",component:function(){return o.e("chunk-06416e63").then(o.bind(null,"d879"))}}]});n["a"].config.productionTip=!1,new n["a"]({router:T,render:function(t){return t(p)}}).$mount("#app")},"65d2":function(t,e,o){t.exports=o.p+"img/infinity.cddd43e4.svg"},"78d9":function(t,e,o){"use strict";var n=o("b696"),i=o.n(n);e["default"]=i.a},"7faf":function(t,e,o){"use strict";var n=o("8fba"),i=o.n(n);i.a},"8fba":function(t,e,o){},"97c8":function(t,e,o){t.exports={option:"option_option_1FX6O",optiontext:"option_optiontext_kFHA3",votestext:"option_votestext_3Nzgm",nohover:"option_nohover_3AdFn",hovereff:"option_hovereff_2dfTF",hideit:"option_hideit_1TUKs"}},"9a57":function(t,e,o){t.exports={maincontainer:"Home_maincontainer_24dSW",centertext:"Home_centertext_376Ag",backbtn:"Home_backbtn_1p0BC",questionheads:"Home_questionheads_ji7T1",questionhead:"Home_questionhead_3wWW1",questiontext:"Home_questiontext_2ogER",hideit:"Home_hideit_N7tGd"}},"9d8d":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"hello"},[o("center",[o("table",{attrs:{cellpadding:"5px"}},[o("tr",[o("td",["1"===t.selected?o("navbarblock",{attrs:{name:"Polls",link:"/",isselected:"true"}}):o("navbarblock",{attrs:{name:"Polls",link:"/"}})],1),o("td",["2"===t.selected?o("navbarblock",{attrs:{name:"Create",link:"/create/",isselected:"true"}}):o("navbarblock",{attrs:{name:"Create",link:"/create/"}})],1),o("td",["3"===t.selected?o("navbarblock",{attrs:{name:"About",link:"/about/",isselected:"true"}}):o("navbarblock",{attrs:{name:"About",link:"/about/"}})],1)])])])],1)},i=[],a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{class:t.$style.navbartext},["true"===t.isselected?o("router-link",{class:[t.$style.container,t.$style.active],attrs:{to:t.link}},[t._v(t._s(t.name))]):o("router-link",{class:t.$style.container,attrs:{to:t.link}},[t._v(t._s(t.name))])],1)])},l=[],s={name:"navbar",props:{name:String,link:String,isselected:String}},r=s,c=o("78d9"),p=o("2877");function u(t){this["$style"]=c["default"].locals||c["default"]}var d=Object(p["a"])(r,a,l,!1,u,null,null),v=d.exports,h={name:"navbar",components:{navbarblock:v},props:{selected:String}},f=h,b=Object(p["a"])(f,n,i,!1,null,"60659c01",null);e["a"]=b.exports},a7ab:function(t,e,o){"use strict";var n=o("97c8"),i=o.n(n);e["default"]=i.a},b696:function(t,e,o){t.exports={navbartext:"navbar-block_navbartext_2oStx",container:"navbar-block_container_2nNcC",active:"navbar-block_active_2Yks0"}}});
//# sourceMappingURL=app.390ae6fe.js.map