(this["webpackJsonpdevice-map"]=this["webpackJsonpdevice-map"]||[]).push([[0],{69:function(e,n,t){e.exports=t(81)},74:function(e,n,t){},81:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),o=t(8),r=t.n(o),c=(t(74),t(21)),l=t(115),u=t(126),m=t(131),s=t(121),v=t(118),f=t(123),h=t(128),p=t(125),d=[{type:"wind",items:[{name:"Device 1",position:[32.08,34.77]},{name:"Device 2"},{name:"Device 3",position:[32.07,34.78]},{name:"Device 4"},{name:"Device 10"},{name:"Device 11"},{name:"Device 12"},{name:"Device 13"},{name:"Device 14"},{name:"Device 15"},{name:"Device 16"},{name:"Device 17"},{name:"Device 18"},{name:"Device 19"},{name:"Device 20"},{name:"Device 21"},{name:"Device 22"},{name:"Device 23"},{name:"Device 24"},{name:"Device 25"},{name:"Device 26"},{name:"Device 27"},{name:"Device 28"},{name:"Device 29"},{name:"Device 30"},{name:"Device 31"},{name:"Device 32"},{name:"Device 33"},{name:"Device 34"},{name:"Device 35"},{name:"Device 36"},{name:"Device 37"},{name:"Device 38"},{name:"Device 39"},{name:"Device 40"},{name:"Device 41"},{name:"Device 42"},{name:"Device 43"},{name:"Device 44"},{name:"Device 45"},{name:"Device 46"},{name:"Device 47"},{name:"Device 48"},{name:"Device 49"},{name:"Device 51"},{name:"Device 52"},{name:"Device 53"},{name:"Device 54"},{name:"Device 55"},{name:"Device 56"},{name:"Device 57"}]},{type:"water",items:[{name:"Device 5"},{name:"Device 6",position:[32.080320121040344,34.78262901306153]},{name:"Device 7"},{name:"Device 8",position:[32.0678106134499,34.768552780151374]}]}],g=t(110),y=t(130),D=t(15),b=t(57),E=function(e){var n=e.device,t=e.isSelected,a=e.isTypeSelected;return i.a.createElement(g.a,{key:n.name,position:n.position,title:n.name,icon:Object(D.divIcon)({iconSize:[20,20],html:Object(b.renderToStaticMarkup)(i.a.createElement("i",{className:" fa fa-map-marker-alt fa-2x",style:{color:a?t?"#297A31":"#1B2C6F":"#888888"}}))})},i.a.createElement(y.a,null,n.name+" at ("+n.position+")"))},w=t(82),S=t(132),k=t(114),O=t(59),C=t.n(O),j=function(e){var n=e.dev,t=e.isSelected,a=e.onClick,o=e.onDisableLocation;return i.a.createElement(w.a,{key:n.name,button:!0,selected:t,onClick:a},i.a.createElement(S.a,{primary:n.name}),n.position?i.a.createElement(k.a,{"aria-label":"Disable location",size:"small",onClick:o},i.a.createElement(C.a,null)):null)},M=t(124),P=function(e){var n=e.json,t=e.onChange;return i.a.createElement(l.a,{style:{position:"absolute",maxHeight:"10%",overflow:"auto",height:"10%",width:"30%",right:50,bottom:50,justifyContent:"center",alignItems:"center",zIndex:1e3}},i.a.createElement(M.a,{id:"outlined-multiline-static",multiline:!0,style:{position:"absolute",overflow:"scroll",top:10,bottom:10,right:10,left:10},inputProps:{style:{fontSize:10,lineHeight:1}},value:JSON.stringify(n,null,2),onChange:function(e){return t(JSON.parse(e.target.value))}}))},x=t(133),A=t(119),z=function(e){var n=e.shape,t=e.onChange,a=e.shapeOptions;return i.a.createElement(x.a,{style:{margin:5},size:"small",value:n,exclusive:!0,onChange:function(e,n){return t(n)}},a.map((function(e){return i.a.createElement(A.a,{value:e.name,key:e.name,disabled:e.disabled},e.name)})))},L=t(127),I=t(122),T=t(120),R=function(e){var n=e.selectedType,t=e.onChange,a=e.showAll,o=e.setShowAll,r=e.typeOptions;return i.a.createElement("div",{style:{width:"100%"}},i.a.createElement("div",{style:{display:"inline-block",verticalAlign:"text-top",margin:5}},i.a.createElement(u.a,{id:"show-all-types",style:{fontSize:10}},"Show all"),i.a.createElement(L.a,{id:"show-all-types",color:"primary",inputProps:{"aria-label":"primary checkbox"},value:a,onChange:function(e){return o(e.target.checked)}})),i.a.createElement("div",{style:{display:"inline-block",verticalAlign:"text-top",margin:5}},i.a.createElement(u.a,{id:"select-type",style:{fontSize:10}},"Device Type"),i.a.createElement(I.a,{id:"select-type",value:n,onChange:function(e){return t(e.target.value)}},r.map((function(e){return i.a.createElement(T.a,{key:e.name,value:e.name},e.name)})))))},J=function(e,n,t){return e*(1-t)+n*t},N=function(e,n,t){return function(e,n,t,a){return[J(e[0],n[0],t),J(e[1],n[1],a)]}(e,n,t,t)},B=function(e,n){var t=e[0]-n[0],a=e[1]-n[1];return Math.sqrt(t*t+a*a)},H=function(e,n){for(var t=0,a=0;a<e.length-1;++a){var i=B(e[a],e[a+1]),o=t+i;if(!(o<=n)){var r=(n-t)/i;return N(e[a],e[a+1],r)}t=o}return e[e.length-1]},W=function(e,n){for(var t=function(e){for(var n=0,t=0;t<e.length-1;++t)n+=B(e[t],e[t+1]);return n}(e),a=new Array(n),i=0;i<n;++i)a[i]=H(e,i/(n-1)*t);return a},q=function(e,n,t,a,i){var o=.5*(a-n),r=.5*(i-t),c=e*e;return(2*t-2*a+o+r)*(e*c)+(-3*t+3*a-2*o-r)*c+o*e+t},F=function(e,n){var t=(e.length-1)*n,a=Math.floor(t),i=t-a,o=e[0===a?a:a-1],r=e[a],c=e[a>e.length-2?e.length-1:a+1],l=e[a>e.length-3?e.length-1:a+2];return[q(i,o[0],r[0],c[0],l[0]),q(i,o[1],r[1],c[1],l[1])]},K=function(e,n){for(var t=new Array(n),a=0;a<n;++a)t[a]=F(e,a/n);return t},V=function(e,n){var t=e[0],a=e[1],i=e[e.length-1],o=Math.atan2(a[1]-t[1],a[0]-t[0]),r=Math.atan2(i[1]-t[1],i[0]-t[0]);return function(e,n,t,a,i){a>t&&(a-=2*Math.PI);for(var o=new Array(i),r=0;r<i;++r){var c=r/(i-1),l=t*(1-c)+a*c;o[r]=[e[0]+n*Math.cos(l),e[1]+n*Math.sin(l)]}return o}(t,B(t,a),o,r,n)};console.log(new Date);var $,G,Q=[32.081128,34.779729];Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement((function(){var e=Object(a.useRef)(null),n=Object(a.useRef)(null),t=i.a.useState([]),o=Object(c.a)(t,2),r=o[0],g=o[1],y=i.a.useState(d[0].type),D=Object(c.a)(y,2),b=D[0],w=D[1],S=i.a.useState(d),k=Object(c.a)(S,2),O=k[0],C=k[1],M=i.a.useState(!1),x=Object(c.a)(M,2),A=x[0],L=x[1],I=i.a.useState("Point"),T=Object(c.a)(I,2),J=T[0],B=T[1],H=i.a.useState(void 0),q=Object(c.a)(H,2),F=q[0],U=q[1],X=i.a.useState(0),Y=Object(c.a)(X,2),Z=(Y[0],Y[1],i.a.useState(3)),_=Object(c.a)(Z,2),ee=_[0],ne=_[1],te=function(e,n,t){for(var a=O.slice(),i=a.find((function(n){return n.type===e})).items,o=0;o<n.length;++o)i[n[o]].position=t[Math.min(o,t.length-1)];return a},ae=function(e,n){return e.concat([e[0],e[0],e[0],e[0]])},ie=[{name:"Point",toLine:function(e){return[]},toPositions:function(e){return[e[0]]}},{name:"Poly",toLine:function(e){return e},toPositions:function(e){return W(e,r.length)}},{name:"Curve",toLine:function(e){return K(e,100)},toPositions:function(e){return W(K(e,100),r.length)}},{name:"Arc",toLine:function(e){return 2===e.length?e:[e[0]].concat(V(e,400))},toPositions:function(e){return W(V(e,400),r.length)}},{name:"Rect",toLine:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];var n=ae(e),t=Object(c.a)(n,4),a=t[0],i=t[1],o=t[2],r=t[3];return[a,i,o,r,a]},toPositions:function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ee,t=(arguments.length>2&&void 0!==arguments[2]&&arguments[2],ae(e)),a=Object(c.a)(t,4),i=a[0],o=a[1],l=a[2],u=a[3],m=[],s=Math.ceil(r.length/n),v=0;v<n;++v)for(var f=N(i,u,v/(n-1)),h=N(o,l,v/(n-1)),p=0;p<s;++p)m.push(N(f,h,p/(s-1)));return m}}],oe=function(){return ie.find((function(e){return e.name===J}))},re=function(e){if(F){var t=[F].concat(G);e&&t.push(e),n.current.leafletElement.setLatLngs(oe().toLine(t))}};return i.a.createElement("div",{className:"App"},i.a.createElement(f.a,{center:Q,zoom:14,ref:e,style:{width:"100%",height:"100vh"},onClick:function(e){"Point"===J?(te(b,r,[[e.latlng.lat,e.latlng.lng]]),g([])):F?G.push([e.latlng.lat,e.latlng.lng]):(U([e.latlng.lat,e.latlng.lng]),G=[])},onMouseMove:function(e){re([e.latlng.lat,e.latlng.lng])},onMouseOut:function(){re()}},i.a.createElement(h.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),O.map((function(e){return A||e.type===b?e.items.map((function(n,t){return n.position?i.a.createElement(E,{key:n.name,device:n,isSelected:r.includes(t),isTypeSelected:e.type===b}):null})):null})),F?i.a.createElement(p.a,{positions:[F,F],ref:n}):null),i.a.createElement(l.a,{style:{position:"absolute",height:"80%",maxHeight:"75%",overflow:"auto",top:50,width:"30%",right:50,bottom:50,justifyContent:"center",alignItems:"center",zIndex:1e3}},i.a.createElement("div",{style:{margin:10}},i.a.createElement(z,{shape:J,onChange:function(e){return B(e)},shapeOptions:ie}),"Rect"!==J?null:i.a.createElement("div",{style:{display:"block"}},i.a.createElement("div",{style:{display:"inline-block",margin:5,width:"40%"}},i.a.createElement(u.a,{id:"rect-rows",style:{fontSize:10}},"Rect rows"),i.a.createElement(m.a,{onChange:function(e,n){return ne(n)},value:ee,defaultValue:3,id:"rect-rows",valueLabelDisplay:"auto",min:2,max:20}))),i.a.createElement(s.a,{variant:"contained",color:"primary",disabled:"Point"===J,style:{margin:5},onClick:function(){var e=[F].concat(G);e=oe().toPositions(e),C(te(b,r,e)),U(void 0),g([])}},"Put devices"),i.a.createElement(R,{selectedType:b,onChange:function(e){g([]),w(e)},showAll:A,setShowAll:function(e){return L(e)},typeOptions:O.map((function(e){return{name:e.type}}))}),i.a.createElement("div",{style:{overflow:"scroll",height:"inherit",display:"block"}},i.a.createElement(v.a,null,O.find((function(e){return e.type===b})).items.map((function(e,n){return i.a.createElement(j,{key:e.name,dev:e,isSelected:r.includes(n),onClick:function(e){return function(e,n){var t=[];if(n){if(void 0!==$){var a=Math.min(e,$),i=Math.max(e,$);t=r.filter((function(e){return e<a}));for(var o=a;o<=i;++o)t.push(o);t.concat(r.filter((function(e){return e>i})))}}else t=r.includes(e)?r.filter((function(n){return n!==e})):r.concat([e]);g(t.sort()),$=e}(n,e.shiftKey)},onDisableLocation:function(e){return te(b,[n],[void 0])}})})))))),i.a.createElement(P,{json:O,onChange:function(e){return C(e)}}))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[69,1,2]]]);
//# sourceMappingURL=main.6749ffdf.chunk.js.map