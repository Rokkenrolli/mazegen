(this.webpackJsonpmazegen=this.webpackJsonpmazegen||[]).push([[0],{11:function(t,e,n){"use strict";n.r(e);var o,r=n(0),a=n(1),i=n(5),l=n.n(i),c=(n(4),n(2)),s=function(t,e,n,o){var r=function(e,r,a){var i=a||0;t.fillStyle=r,t.fillRect(e.pos.x,e.pos.y,n-i,o-i)};e.forEach((function(e){return e.forEach((function(e){e.start||e.end?r(e,"orange"):e.next?r(e,"blue"):e.onPath?r(e,"#85bbb6"):e.solved?r(e,"#8abb85"):e.visited?r(e,"white"):r(e,"#b678bd"),function(e){var r={x:e.pos.x,y:e.pos.y},a={x:e.pos.x,y:e.pos.y+o},i={x:e.pos.x+n,y:e.pos.y},l={x:e.pos.x+n,y:e.pos.y+o},c=function(e,n){t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(n.x,n.y),t.strokeStyle="black",t.stroke()};e.bottomWall&&c(a,l),e.leftWall&&c(r,a),e.rightWall&&c(i,l),e.topWall&&c(r,i)}(e),b&&function(e){var r={x:e.pos.x+n/2,y:e.pos.y+o/2};if(e.pred){var a={x:e.pred.pos.x+n/2,y:e.pred.pos.y+o/2};t.beginPath(),t.strokeStyle="green",t.moveTo(r.x,r.y),t.lineTo(a.x,a.y),t.stroke()}}(e)}))}))};!function(t){t[t.Up=1]="Up",t[t.Down=2]="Down",t[t.Left=3]="Left",t[t.Right=4]="Right"}(o||(o={}));var u=function(t,e,n,o,r){var a=e.row,i=e.col,l=[];return a>0&&l.push(t[i][a-1]),i>0&&l.push(t[i-1][a]),a<o-1&&l.push(t[i][a+1]),i<n-1&&l.push(t[i+1][a]),0===l.length?[]:l.filter((function(t){return r?!t.solved:!t.visited}))},f=function(t,e){var n=t.row-e.row,r=t.col-e.col;return n<0?o.Down:n>0?o.Up:r<0?o.Right:r>0?o.Left:void 0},d=function(t,e,n,r,a,i){var l=[e[0][0]],c=e[0][0],d=void 0;window.requestAnimationFrame((function h(){if(l.length){if(window.requestAnimationFrame(h),!c)return;c.next=!1,c.visited=!0;var b=u(e,c,n,r);b.length?((d=b[Math.floor(Math.random()*b.length)]).pred=c,d.next=!0,function(t,e){var n=f(t,e);n===o.Up&&(t.topWall=!1,e.bottomWall=!1),n===o.Down&&(t.bottomWall=!1,e.topWall=!1),n===o.Left&&(t.leftWall=!1,e.rightWall=!1),n===o.Right&&(t.rightWall=!1,e.leftWall=!1)}(c,d),l.push(c=d)):c=l.pop()}t.clearRect(0,0,p,v),s(t,e,a,i)}))},h=function(t,e,n,r,a,i,l){var c=[e[0][0]],d=!1;window.requestAnimationFrame((function h(){if(c.length){d||window.requestAnimationFrame(h);var b=c.shift();if(console.log(b),!b)return!1;if(b.solved=!0,b.end)return d=!0,function(t,e,n,o,r,a,i){n=[];var l=e[o-1][r-1];n.push(e[0][0]),e[0][0].onPath=!0,window.requestAnimationFrame((function o(){l.pred&&(window.requestAnimationFrame(o),n.push(l),l.onPath=!0,l=l.pred),s(t,e,a,i)}))}(t,e,n,r,a,i,l),e.forEach((function(t){return t.forEach((function(t){return t.solved=!1}))})),b;console.log(e);var j=u(e,b,r,a,!0);console.log(j);var m=function(t,e){return e.filter((function(e){switch(f(t,e)){case o.Up:return!(t.topWall&&e.bottomWall);case o.Down:return!(t.bottomWall&&e.topWall);case o.Left:return!(t.leftWall&&e.rightWall);case o.Right:return!(t.rightWall&&e.leftWall)}return!1}))}(b,j);console.log(m),m.forEach((function(t){t.solved||c.push(t)}))}t.clearRect(0,0,p,v),s(t,e,i,l)}))},p=.8*window.innerWidth,v=.8*window.innerHeight,b=!1,j=function(){var t=Object(a.useRef)(null),e=Object(a.useState)(20),n=Object(c.a)(e,2),o=n[0],i=n[1],l=Object(a.useState)(40),u=Object(c.a)(l,2),f=u[0],j=u[1],m=Object(a.useState)(p/f),x=Object(c.a)(m,2),g=x[0],w=x[1],O=Object(a.useState)(v/o),W=Object(c.a)(O,2),y=W[0],S=W[1],N=[],k=[],C=function(t){k=[],t.clearRect(0,0,p,v);for(var e=0;e<f;e++){for(var n=[],r=0;r<o;r++)n.push({leftWall:!0,topWall:!0,rightWall:!0,bottomWall:!0,pos:{x:e*g,y:r*y},visited:!1,row:r,col:e,next:!1,pred:void 0,start:!1,end:!1,solved:!1,onPath:!1});k.push(n)}var a=k[0][0];a.start=!0,a.topWall=!1,a.visited=!0,k[f-1][o-1].end=!0,k[f-1][o-1].bottomWall=!1,s(t,k,g,y)};return Object(a.useEffect)((function(){if(t.current){var e=t.current.getContext("2d");e&&C(e)}})),Object(r.jsxs)("div",{className:"canvasContainer",children:[Object(r.jsxs)("div",{className:"buttons",children:[Object(r.jsx)("button",{className:"generator",onClick:function(){return function(){if(t.current){var e=t.current.getContext("2d");e&&(C(e),d(e,k,f,o,g,y))}}()},children:"Generate Maze"}),Object(r.jsx)("button",{className:"solver",onClick:function(){return function(){if(t.current){var e=t.current.getContext("2d");e&&h(e,k,N,f,o,g,y)}}()},children:"Solve maze"}),Object(r.jsx)("button",{className:"lines",onClick:function(){return function(){if(t.current){var e=t.current.getContext("2d");e&&(b=!b,s(e,k,g,y))}}()},children:"Show lines"})]}),Object(r.jsxs)("div",{className:"sliders",children:[Object(r.jsx)("input",{id:"colSlider",type:"range",min:1,onChange:function(t){j(Number(t.target.value)),S(v/o),w(p/f)},value:f,step:1}),Object(r.jsx)("label",{htmlFor:"colSlider",children:"columns: ".concat(f)}),Object(r.jsx)("input",{id:"rowSlider",type:"range",min:1,onChange:function(t){i(Number(t.target.value)),S(v/o),w(p/f)},value:o,step:1}),Object(r.jsx)("label",{htmlFor:"rowSlider",children:"rows: ".concat(o)})]}),Object(r.jsx)("div",{children:Object(r.jsx)("canvas",{ref:t,className:"canvas",width:p,height:v})})]})},m=function(){return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("div",{children:Object(r.jsx)("h1",{className:"header",children:"Maze Generator"})}),Object(r.jsx)(j,{})]})};l.a.render(Object(r.jsx)(m,{}),document.getElementById("root"))},4:function(t,e,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.1e5e9595.chunk.js.map