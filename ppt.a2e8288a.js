var e={};const t=new URL(e=import.meta.resolve("jwRx5"));var r={};const i=new URL(r=import.meta.resolve("jZyf0"));var n={};const a=new URL(n=import.meta.resolve("kVl1L")),o={data:{game:{playerMove:"",computerMove:"",playerVictories:0,computerVictories:0,draws:0,roundWinner:"",retry:!1}},listeners:[],getState(){return this.data},setState(e){let t=this.getState();for(let t of(this.data=e,this.listeners))t();localStorage.setItem("player_victories",JSON.stringify(t.game.playerVictories)),localStorage.setItem("computer_victories",JSON.stringify(t.game.computerVictories))},suscribe(e){this.listeners.push(e)},computerMove(){let e=Math.floor(3*Math.random()),t=this.getState();t.game.computerMove=["piedra","papel","tijera"][e],this.setState(t)},result(){let e=this.getState();"piedra"==e.game.playerMove&&"tijera"==e.game.computerMove||"papel"==e.game.playerMove&&"piedra"==e.game.computerMove||"tijera"==e.game.playerMove&&"papel"==e.game.computerMove?(e.game.playerVictories+=1,e.game.roundWinner="player"):"piedra"==e.game.playerMove&&"papel"==e.game.computerMove||"papel"==e.game.playerMove&&"tijera"==e.game.computerMove||"tijera"==e.game.playerMove&&"piedra"==e.game.computerMove||""==e.game.playerMove?(e.game.computerVictories+=1,e.game.roundWinner="computer"):(e.game.draws+=1,e.game.roundWinner="draw"),o.setState(e)},initStorage(){let e=this.getState(),t=JSON.parse(localStorage.getItem("player_victories"))||0,r=JSON.parse(localStorage.getItem("computer_victories"))||0;e.game.playerVictories=t,e.game.computerVictories=r,this.setState(e)}},s=new URL(e),d=new URL(r),l=new URL(n);class c extends HTMLElement{constructor(){super(),this._timer=3;let e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.classList.add("container");let r=document.createElement("style");r.innerHTML=`
        .container{
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            justify-content: space-between;
        }
        .counter_container{
            margin-top : 100px;
            font-size : 82px;
        }
        .hands_container{
            display : flex;
            gap : 20px;
            margin: -20px;
        }
        @media(min-width:960px){
            .hands_container{
                gap : 100px;
            }
        }
        .hands_container > img{
            display : block;
            height: 220px;
        }
        @media(min-width:960px){
            .hands_container > img{
                height: 420px;
            }
        }
        .decision_container{
          height:100%
        }
      `,t.innerHTML=`
      <div class="counter_container">
          <p class="counter">${this._timer}</p>
      </div>
      <div class="hands_container">
          <img class="piedra" src="${s}" />
          <img class="papel" src="${d}" />
          <img class="tijera" src="${l}" />
      </div>
    `;let i=t.querySelector(".piedra"),n=t.querySelector(".papel"),a=t.querySelector(".tijera");this.addHoverEffect(i),this.addHoverEffect(n),this.addHoverEffect(a),e.appendChild(r),e.appendChild(t),this.counterEl=t.querySelector(".counter"),this._timer=0,this.startCountdown(t);let c=o.getState();c.game.retry=!1,o.setState(c),o.computerMove(),i?.addEventListener("click",e=>{c.game.playerMove="piedra",o.setState(c)}),n?.addEventListener("click",e=>{c.game.retry=!1,c.game.playerMove="papel",o.setState(c)}),a?.addEventListener("click",e=>{c.game.retry=!1,c.game.playerMove="tijera",console.log("currentState.game.retry :",c),o.setState(c)})}addHoverEffect(e){e.addEventListener("mouseover",()=>{e.style.transform="scale(1.20)",e.style.transition="transform 0.3s",this.shrinkOtherImages(e)}),e.addEventListener("mouseout",()=>{e.style.transform="scale(1)",this.resetOtherImages(e)})}shrinkOtherImages(e){(this.shadowRoot?.querySelectorAll("img")).forEach(t=>{t!==e&&(t.style.transform="scale(0.9)",t.style.transition="transform 0.3s")})}resetOtherImages(e){(this.shadowRoot?.querySelectorAll("img")).forEach(t=>{t!==e&&(t.style.transform="scale(1)")})}set counter(e){this._timer=e,this.updateCounter()}updateCounter(){this.counterEl.textContent=this._timer.toString()}async startCountdown(e){let t=3,r=setInterval(()=>{this.counter=t,(t-=1)<0&&clearInterval(r)},1e3);setTimeout(()=>{let t=document.createElement("div");for(t.classList.add("decision_container"),t.innerHTML=`
        <players-decision></players-decision>
      `;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(t)},5e3)}}customElements.define("play-component",c);const p=new URL(e),m=new URL(r),h=new URL(n),u=new URL(import.meta.resolve("ltQ3h")),g=new URL(import.meta.resolve("hyfKo"));function y(e){let t=document.createElement("div"),r=o.getState();return o.suscribe(()=>{r.game.retry&&(r.game.retry=!1,o.setState(r),e.goTo("/home"))}),t.innerHTML=`
        <score-board></score-board>
    `,t}function x(e){let t=o.getState();o.suscribe(()=>{if("draw"!=t.game.roundWinner&&t.game.roundWinner.length>0)e.goTo("/result");else if("draw"==t.game.roundWinner){for(e.goTo("/home"),t.game.retry=!1,t.game.roundWinner="";r.firstChild;)r.removeChild(r.firstChild);let i=document.createElement("div");i.innerHTML=`
      <start-component></start-component>
      `,r.appendChild(i),o.setState(t)}});let r=document.createElement("div");return r.classList.add("container"),r.innerHTML=`
  <start-component></start-component>
  `,r}!function(){o.initStorage();class e extends HTMLElement{constructor(){super(),this.render()}render(){let e=this.attachShadow({mode:"open"}),r=document.createElement("div"),n=document.createElement("style");n.innerHTML=`
      .before_play_container{
        display: flex;
        flex-direction: column;
       align-items: center;
       justify-content: flex-end;
       height: 100vh;
       text-align :center;
        }
      .first_text{
        font-size : 42px;
        color :#009048;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
      }
      @media(min-width:960px){
         .first_text{
            justify-content: center;
          }
        }
       @media(min-width:960px){
            .first_title{
                width:300px;
                font-size: 120px;
            }
            .first_title > span{
                display:inline-block;
            }
       }
    
    .plays_container{
        display:flex;
        gap:40px;
        margin : -20px;
    }
    @media(min-width:960px){
      .plays_container{
        height : 400px
      }
    }
    .plays_container > img {
        display : block;
    }
    .start_btn__container{
        padding:20px;
    }
      `;let o=document.createElement("style");o.innerHTML=`
        .second_text{
            font-size : 40px;
            display:none;
            flex-direction: column;
            height: 100%;
            justify-content: space-evenly;
        }
        .second_title{

        }
        @media(min-width:960px){
            .second_title{
                width:600px;
                font-size:80px;
            }
        }

        .play_btn__container{
            padding : 20px;
        }
      `,r.innerHTML=`
      <div class="before_play_container">
        <div class="first_text">
            <h1 class="first_title">Piedra <span>Papel \xf3</span>Tijera</h1>
            <div class="start_btn__container">
                <custom-button>Empezar</custom-button>
            </div>
        </div>
        <div class="second_text">
            <h3 class="second_title">Presion\xe1 jugar y eleg\xed: piedra, papel o tijera antes de que pasen los 3 segundos.</h3>
            <div class="play_btn__container">
                    <custom-button>\xa1Jugar!</custom-button>
            </div>
        </div>
        <div class="plays_container">
            <img src="${t}" />
            <img src="${i}" />
            <img src="${a}" />
        </div>   
      
      </div>
      `;let s=r.querySelector(".first_text"),d=r.querySelector(".first_text"),l=r.querySelector(".second_text"),c=r.querySelector(".play_btn__container"),p=r.querySelector(".before_play_container");s?.addEventListener("click",e=>{e.stopPropagation(),d.style.display="none",l.style.display="flex"}),c?.addEventListener("click",t=>{t.stopPropagation(),p.style.display="none";let r=document.createElement("div");r.innerHTML=`  
          <play-component></play-component>
        `,e.appendChild(r)}),e.appendChild(n),e.appendChild(o),e.appendChild(r)}}customElements.define("start-component",e);class r extends HTMLElement{constructor(){super(),this.render()}render(){let e=this.attachShadow({mode:"open"}),t=document.createElement("button");t.classList.add("button");let r=document.createElement("style");r.innerHTML=`
        .button{
          font-size : 20px;
        }
        @media(min-width:960px){
          .button{
            font-size:42px;
            padding :20px;
          }
        }
      `,t.textContent=this.textContent,t.style.border="10px solid #001997",t.style.borderRadius="10px",t.style.textAlign="center",t.style.backgroundColor="#006CFC",t.style.padding="12px",t.style.color="#FAFAFA",t.style.width="100%",t.style.cursor="pointer",e.appendChild(r),e.appendChild(t)}}customElements.define("custom-button",r);class n extends HTMLElement{constructor(){super(),this.render()}render(){let e,t,r=o.getState();switch(r.game.playerMove){case"piedra":e=p;break;case"papel":e=m;break;case"tijera":e=h}switch(r.game.computerMove){case"piedra":t=p;break;case"papel":t=m;break;case"tijera":t=h}let i=this.attachShadow({mode:"open"}),n=document.createElement("div");n.classList.add("container"),n.innerHTML=`
         <img  class="computer_move"  src="${t}" />
         <img  class="player_move" src="${e||""}" />
      `;let a=document.createElement("style");a.innerHTML=`
            .container{
                height:100%;
                display:flex;
                flex-direction : column;
                justify-content : space-between;
            }
            .computer_move{
                height :300px;
                width: 200px;
                transform: rotate(180deg);
                display:block;
                margin : 0 auto;
                margin-top:-20px;
            }
            @media(min-width:960px){
              .computer_move{
                height : 600px;
                width : 400px;
              }
            }
            .player_move{
                height : 300px;
                width: 200px;
                display:block;
                margin : 0 auto;
                margin-bottom:-10px;
            }
            @media(min-width:960px){
              .player_move{
                height : 600px;
                width:400px;
              }
            }
             
           
      `,setTimeout(()=>{o.result(),"draw"==r.game.roundWinner&&(r.game.retry=!0,o.setState(r))},4e3),i.appendChild(a),i.appendChild(n)}}customElements.define("players-decision",n);class s extends HTMLElement{constructor(){super(),this.render()}render(){let e=this.attachShadow({mode:"open"}),t=o.getState(),r=document.createElement("div");r.classList.add("container"),r.innerHTML=`
        <img class="img" src="${"player"==t.game.roundWinner?u:g}"  />
        <div class="scoreboard">
            <h4>Score</h4>
            <div class="scoreboard_players">
                <p>Vos : ${t.game.playerVictories}</p>
                <p>M\xe1quina : ${t.game.computerVictories}</p>
            </div>
        </div>
        <div class="btn_container">
                <custom-button>Volver a jugar</custom-button>
        </div>
      `;let i=document.createElement("style");i.innerHTML=`
        .container{
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
                margin: 20px;
              
        }
        @media(min-width:960px){
            .container > img{
                width :400px;
            }   
        }
        .container > div >  h4 {
            font-size : 52px;
            text-align:center;
        }
        @media(min-width:960px){
            .container > div > h4 {
                font-size : 74px;
            }
        }
        .container .scoreboard {
            border: solid 10px;
            border-radius:10px;
            background-color : #fafafa;
            padding : 10px;
        }
        @media(min-width:960px){
            .scoreboard{
                width:600px;
            }
        }
        .container > div > div > p{
            text-align : right;
            font-size : 32px;
        }
        @media(min-width:960px){
            .container > div > div > p {
                text-align : center;
                font-size:52px;
            }
        }   
        .scoreboard_players{
            width:300px
        }
        @media(min-width:960px){
            .scoreboard_players{
                width :100%;
            }
        }   
        .btn_container{
            width:340px;
            padding:10px;
        }
        @media(min-width:960px){
            .btn_container{
                width:640px;
                margin-top:10px;
            }
        }
    `;let n=r.querySelector(".btn_container");n?.addEventListener("click",e=>{t.game.retry=!0,t.game.roundWinner="",t.game.computerMove="",t.game.playerMove="",o.setState(t)}),e.appendChild(i),e.appendChild(r)}}customElements.define("score-board",s);var d=document.querySelector(".root");let l=[{path:/\/home/,handler:x},{path:/\/result/,handler:y}];function c(e){history.pushState({},"",e),v(e)}function v(e){for(let t of l)if(t.path.test(e)){let e=t.handler({goTo:c});d.firstChild&&d.firstChild.remove(),d.appendChild(e)}}window.addEventListener("load",()=>{c("/home")}),"/"==location.pathname?c("/home"):v(location.pathname)}();
//# sourceMappingURL=ppt.a2e8288a.js.map
