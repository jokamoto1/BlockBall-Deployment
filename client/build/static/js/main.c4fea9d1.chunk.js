(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{53:function(e,t,i){},90:function(e,t,i){"use strict";i.r(t);var s=i(1),c=i(44),n=i.n(c),r=(i(53),i(12)),a=i(16),o=i(2),d=i(0),l=function(e){var t=Object(o.f)(),i=(e.setUserName,e.setAccessCode),s=(e.userName,e.accesscode);return Object(d.jsxs)("div",{className:"bg-dark p-3 pb-2 d-flex flex-column w-25 m-auto mt-4 rounded",children:[Object(d.jsxs)("h1",{className:"text-center align-middle",children:[Object(d.jsx)("span",{className:"text-warning",children:"Block"}),Object(d.jsx)("span",{className:"text-danger",children:"Ball"}),Object(d.jsx)("span",{className:"text-info",children:".js"})]}),Object(d.jsxs)("div",{className:"text-center align-middle m-auto",children:[Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault(),0===s.length?(t.push("/"),alert("Must give room code!")):t.push("/game/".concat(s))},children:[Object(d.jsxs)("div",{className:"form-group text-danger ",children:[Object(d.jsx)("label",{className:"display-5",children:"Room Code:"}),Object(d.jsx)("input",{type:"text",className:"form-control",onChange:function(e){return i(e.target.value)}})]}),Object(d.jsx)("button",{type:"submit",className:"mt-3 btn btn-success",children:"Enter Game!"})]}),Object(d.jsxs)("div",{className:"text-warning mt-3",children:[Object(d.jsx)("p",{children:"Created by: Jeremy Okamoto"}),Object(d.jsxs)("p",{children:["Github: ",Object(d.jsx)("a",{href:"https://github.com/jokamoto1",children:"Link"})," "]})]})]})]})},h=i(48),x=i(47),j=i.n(x),u=(i(89),function(e){var t,i=Object(s.useState)(!1),c=Object(r.a)(i,2),n=c[0],l=c[1],x=Object(s.useState)(),u=Object(r.a)(x,2),b=u[0],y=u[1],m=Object(s.useState)(!1),p=Object(r.a)(m,2),O=p[0],f=p[1],g=Object(s.useState)((function(){return j()(":8000")})),v=Object(r.a)(g,1)[0],k=Object(o.g)("accesscode").accesscode,w=Object(o.f)(),N=Object(s.useState)([]),M=Object(r.a)(N,2),S=M[0],F=M[1];Object(s.useEffect)((function(){return console.log(k),v.on("startGameFromServer",(function(){C()})),v.on("leave",(function(){w.push("/"),alert("Room Full!")})),v.emit("roomFromClient",k),v.emit("connectionFromClient",k),v.on("socketArrFromServer",(function(e){t=e.sort(),console.log(t),F(e.sort())})),v.on("leaverFromServer",(function(e){console.log("leaver");for(var i=0;i<2;i++)if(console.log(e),console.log(t[i]),t[i]===e){console.log("HERE");var s=S.indexOf(S[i]),c=S.splice(s,1);F(c),t=c,alert("Other player left!")}})),function(){v.disconnect(!0)}}),[]);var _=Object(s.useRef)(null),C=function(){f(!1);var e,i=_.current.getContext("2d");i.canvas.height=400,i.canvas.width=800;var s={height:32,jumping:!0,width:32,x:50,x_velocity:0,y:350,y_velocity:0},c={height:32,jumping:!0,width:32,x:750,x_velocity:0,y:350,y_velocity:0},n=300,r=30,a=385,o=245,d=30,h=800,x=0,j=390,u=function(e,t){this.color="white",this.direction=5,this.radius=20,this.speed=3,this.x=e,this.y=t};u.prototype={updatePosition:function(e,t){this.x+=Math.cos(this.direction)*this.speed,this.y+=Math.sin(this.direction)*this.speed,this.x-this.radius<0?(this.x=this.radius,this.direction=Math.atan2(Math.sin(this.direction),-1*Math.cos(this.direction))):this.x+this.radius>e&&(this.x=e-this.radius,this.direction=Math.atan2(Math.sin(this.direction),-1*Math.cos(this.direction))),this.y-this.radius<0?(this.y=this.radius,this.direction=Math.atan2(-1*Math.sin(this.direction),Math.cos(this.direction))):this.y+this.radius>t&&(this.y=t-this.radius,this.direction=Math.atan2(-1*Math.sin(this.direction),Math.cos(this.direction)))}};var b=new u(0,0),m={left:!1,right:!1,up:!1,keyListener:function(e){var t="keydown"==e.type;switch(e.keyCode){case 65:m.left=t;break;case 87:m.up=t;break;case 68:m.right=t}}},p={left:!1,right:!1,up:!1,keyListener:function(e){var t="keydown"==e.type;switch(e.keyCode){case 65:p.left=t;break;case 87:p.up=t;break;case 68:p.right=t}}};e=function(){v.on("spectatorFromServer",(function(e){v.id!=t[0]&&v.id!=t[1]&&(s.x=e[0],s.y=e[1],c.x=e[2],c.y=e[3],b.x=e[4],b.y=e[5],b.speed=e[6],b.direction=e[7])})),v.on("positionFromServer",(function(e){v.id===t[0]&&(c.x=e[0],c.y=e[1]),v.id===t[1]&&(s.x=e[0],s.y=e[1],b.x=e[2],b.y=e[3],b.speed=e[4],b.direction=e[5])})),v.id===t[0]&&(m.up&&0==s.jumping&&(s.y_velocity-=30,s.jumping=!0),m.left&&(s.x_velocity-=.5),m.right&&(s.x_velocity+=.5),s.y_velocity+=1,s.x+=s.x_velocity,s.y+=s.y_velocity,s.x_velocity*=.9,s.y_velocity*=.9,s.y>358&&(s.jumping=!1,s.y=358,s.y_velocity=0),s.x<0?s.x=0:s.x>350&&(s.x=350)),v.id===t[1]&&(p.up&&0==c.jumping&&(c.y_velocity-=30,c.jumping=!0),p.left&&(c.x_velocity-=.5),p.right&&(c.x_velocity+=.5),c.y_velocity+=1,c.x+=c.x_velocity,c.y+=c.y_velocity,c.x_velocity*=.9,c.y_velocity*=.9,c.y>358&&(c.jumping=!1,c.y=358,c.y_velocity=0),c.x<418?c.x=418:c.x>770&&(c.x=770)),s.x<b.x+b.radius&&s.x+s.width>b.x-b.radius&&s.y<b.y+b.radius&&s.y+s.height>b.y&&(b.direction=Math.atan2(-1*Math.random()-1,1),b.speed+=.1),c.x<b.x+b.radius&&c.x+c.width>b.x-b.radius&&c.y<b.y+b.radius&&c.y+c.height>b.y&&(b.direction=Math.atan2(-1*Math.random()-1,-1),b.speed+=.1),a<b.x+2*b.radius&&a+r>b.x&&o<b.y+2*b.radius&&o+n>b.y&&(b.direction=Math.atan2(Math.sin(b.direction),-1*Math.cos(b.direction))),x<b.x+2*b.radius&&x+h>b.x&&j+17<b.y+2*b.radius&&j+17+d>b.y&&(b.speed=0),b.y+=1,i.fillStyle="#03acc3",i.fillRect(0,0,800,400),i.fillStyle="#0000FF",i.beginPath(),i.rect(s.x,s.y,s.width,s.height),i.fill(),i.fillStyle="#00FF00",i.beginPath(),i.rect(c.x,c.y,s.width,s.height),i.fill(),i.fillStyle="#f4a460",i.beginPath(),i.rect(x,j,h,d),i.fill(),i.fillStyle="#808080",i.beginPath(),i.rect(a,o,r,n),i.fill(),i.strokeStyle="#f9d71c",i.lineWidth=1e3,i.beginPath(),i.moveTo(800,0),i.lineTo(750,50),i.stroke(),i.fillStyle=b.color,i.beginPath(),i.arc(b.x,b.y,b.radius,0,2*Math.PI),i.fill();if(b.updatePosition(800,400),0===b.speed)return b.x<400?y(t[1]):y(t[0]),f(!0),void l(!1);if(v.id==t[0]){var u=[s.x,s.y,b.x,b.y,b.speed,b.direction,k];v.emit("positionFromClient",u)}if(v.id===t[1]){var O=[c.x,c.y,"x","y","speed","direction",k];v.emit("positionFromClient",O)}v.emit("spectatorFromClient",[s.x,s.y,c.x,c.y,b.x,b.y,b.speed,b.direction,k]),window.requestAnimationFrame(e)},window.requestAnimationFrame(e),window.addEventListener("keydown",m.keyListener),window.addEventListener("keydown",p.keyListener),window.addEventListener("keyup",m.keyListener),window.addEventListener("keyup",p.keyListener),l(!0)};return Object(d.jsxs)("div",{className:"bg-primary d-flex flex-column w-50 m-auto",children:[Object(d.jsxs)("h1",{className:"text-center align-middle bg-dark rounded p-2 mt-3",children:[Object(d.jsx)("span",{className:"text-warning",children:"Block"}),Object(d.jsx)("span",{className:"text-danger",children:"Ball"}),Object(d.jsx)("span",{className:"text-info",children:".js"})]}),Object(d.jsx)("canvas",Object(h.a)({className:"border border-dark border-3",ref:_},e)),S&&O?b===S[0]?Object(d.jsxs)("div",{className:"text-primary bg-dark text-center rounded p-2 mt-3",children:[Object(d.jsxs)("p",{children:[b," "]}),Object(d.jsx)("h3",{children:"Scored!"})]}):Object(d.jsxs)("div",{className:"text-success bg-dark text-center rounded p-2 mt-3",children:[Object(d.jsxs)("p",{children:[b," "]}),Object(d.jsx)("h3",{children:"Scored!"})]}):"",n||v.id!==S[0]&&v.id!==S[1]||2!==S.length?"":Object(d.jsx)("button",{id:"start",onClick:function(e){return v.emit("startGameFromClient",k)},className:"btn btn-success mt-3",children:"Play"}),Object(d.jsxs)("div",{className:"bg-dark text-warning rounded text-center pt-2 pb-2 mt-3 mb-3",children:[Object(d.jsx)("h1",{children:"Your Name:"}),S&&v.id===S[0]?Object(d.jsx)("p",{className:"text-primary",children:v.id}):"",S&&v.id===S[1]?Object(d.jsx)("p",{className:"text-success",children:v.id}):"",S&&v.id!=S[1]&&v.id!=S[0]?Object(d.jsx)("p",{className:"text-danger",children:v.id}):"",Object(d.jsx)("h1",{children:"Players:"}),S?S.map((function(e){return e===S[0]?Object(d.jsx)("p",{className:"text-primary",children:e}):e===S[1]?Object(d.jsx)("p",{className:"text-success",children:e}):Object(d.jsx)("p",{className:"text-danger",children:e})})):"",Object(d.jsx)("h1",{children:"Controls:"}),Object(d.jsxs)("p",{children:["Jump: ",Object(d.jsx)("kbd",{children:"W"})]}),Object(d.jsxs)("p",{children:["Left: ",Object(d.jsx)("kbd",{children:"A"})]}),Object(d.jsxs)("p",{children:["Right: ",Object(d.jsx)("kbd",{children:"D"})]}),Object(d.jsx)("h1",{children:"Rules:"}),Object(d.jsx)("p",{className:"w-50 m-auto",children:"The ball cannot touch the sand on your side of the court!"}),Object(d.jsx)(a.b,{to:"/",children:Object(d.jsx)("button",{className:"btn btn-danger  w-50 m-auto",children:"Exit Game Room"})})]})]})});var b=function(){var e=Object(s.useState)(""),t=Object(r.a)(e,2),i=t[0],c=t[1],n=Object(s.useState)(""),h=Object(r.a)(n,2),x=h[0],j=h[1];return Object(d.jsx)(a.a,{children:Object(d.jsxs)(o.c,{children:[Object(d.jsx)(o.a,{exact:!0,path:"/",children:Object(d.jsx)(l,{setAccessCode:j,setUserName:c,username:i,accesscode:x})}),Object(d.jsx)(o.a,{exact:!0,path:"/game/:accesscode",children:Object(d.jsx)(u,{})})]})})},y=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,91)).then((function(t){var i=t.getCLS,s=t.getFID,c=t.getFCP,n=t.getLCP,r=t.getTTFB;i(e),s(e),c(e),n(e),r(e)}))};n.a.render(Object(d.jsx)(b,{}),document.getElementById("root")),y()}},[[90,1,2]]]);
//# sourceMappingURL=main.c4fea9d1.chunk.js.map