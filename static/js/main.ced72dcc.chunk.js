(this.webpackJsonpmazegen=this.webpackJsonpmazegen||[]).push([[0],[,,function(e,t,n){},,function(e,t,n){e.exports=n(10)},,,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o,a=n(0),r=n.n(a),l=n(3),i=n.n(l),c=(n(9),n(2),function(e,t){var n=u/v,o=f/p;t.forEach((function(t){return t.forEach((function(t){var a;a=t,e.fillRect(a.pos.x,a.pos.y,n,o),a.start?e.fillStyle="orange":a.end?e.fillStyle="orange":a.next?e.fillStyle="blue":a.visited?e.fillStyle="white":e.fillStyle="#b678bd",function(t){var a={x:t.pos.x,y:t.pos.y},r={x:t.pos.x,y:t.pos.y+o},l={x:t.pos.x+n,y:t.pos.y},i={x:t.pos.x+n,y:t.pos.y+o},c=function(t,n){e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(n.x,n.y),e.strokeStyle="black",e.stroke()};t.bottomWall&&c(r,i),t.leftWall&&c(a,r),t.rightWall&&c(l,i),t.topWall&&c(a,l)}(t),d&&function(t){var a={x:t.pos.x+n/2,y:t.pos.y+o/2};if(t.pred){var r={x:t.pred.pos.x+n/2,y:t.pred.pos.y+o/2};e.beginPath(),e.strokeStyle="black",e.moveTo(a.x,a.y),e.lineTo(r.x,r.y),e.stroke()}}(t)}))}))});!function(e){e[e.Up=1]="Up",e[e.Down=2]="Down",e[e.Left=3]="Left",e[e.Right=4]="Right"}(o||(o={}));var s=function(e,t){var n=t[0][0],a=[n];n.topWall=!1,n.visited=!0,n.start=!0;var r=function(e,t){var n=function(e,t){var n=e.row-t.row,a=e.col-t.col;return n<0?o.Down:n>0?o.Up:a<0?o.Right:a>0?o.Left:void 0}(e,t);n===o.Up&&(e.topWall=!1,t.bottomWall=!1),n===o.Down&&(e.bottomWall=!1,t.topWall=!1),n===o.Left&&(e.leftWall=!1,t.rightWall=!1),n===o.Right&&(e.rightWall=!1,t.leftWall=!1)},l=n,i=void 0;window.requestAnimationFrame((function n(){if(a.length){if(window.requestAnimationFrame(n),!l)return;console.log(l.row+" "+l.col),l.next=!1,l.visited=!0;var o=function(e){var n=e.row,o=e.col,a=[];if(n>0&&a.push(t[o][n-1]),o>0&&a.push(t[o-1][n]),n<p-1&&a.push(t[o][n+1]),o<v-1&&a.push(t[o+1][n]),0===a.length)return[];var r=a.filter((function(e){return!e.visited}));return console.log(r),r}(l);o.length?((i=o[Math.floor(Math.random()*o.length)]).pred=l,i.next=!0,r(l,i),a.push(l=i)):l=a.pop()}e.clearRect(0,0,u,f),c(e,t)}))},u=.8*window.innerWidth,f=.8*window.innerHeight,p=20,v=40,h=u/v,m=f/p,d=!1,g=function(){var e=Object(a.useRef)(null),t=[],n=function(e){t=[],e.clearRect(0,0,u,f);for(var n=0;n<v;n++){for(var o=[],a=0;a<p;a++)o.push({leftWall:!0,topWall:!0,rightWall:!0,bottomWall:!0,pos:{x:n*h,y:a*m},visited:!1,row:a,col:n,next:!1,pred:void 0,start:!1,end:!1});t.push(o)}console.log(t),c(e,t)};return Object(a.useEffect)((function(){if(e.current){var t=e.current.getContext("2d");t&&n(t)}})),r.a.createElement("div",{className:"canvasContainer"},r.a.createElement("div",{className:"buttons"},r.a.createElement("button",{className:"generator",onClick:function(){return function(){if(e.current){var o=e.current.getContext("2d");o&&(n(o),s(o,t))}}()}},"Generate Maze"),r.a.createElement("button",{className:"solver",onClick:function(){alert("not implemented")}},"Solve maze"),r.a.createElement("button",{className:"lines",onClick:function(){return function(){if(e.current){var n=e.current.getContext("2d");n&&(d=!d,c(n,t))}}()}},"show lines")),r.a.createElement("div",null,r.a.createElement("canvas",{ref:e,className:"canvas",width:u,height:f})))},w=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",null,r.a.createElement("h1",{className:"header"},"Maze")),r.a.createElement(g,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[4,1,2]]]);
//# sourceMappingURL=main.ced72dcc.chunk.js.map