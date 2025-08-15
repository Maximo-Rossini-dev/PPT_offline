const piedraUrl = new URL("../piedra.svg", import.meta.url);
const papelUrl = new URL("../papel.svg", import.meta.url);
const tijeraUrl = new URL("../tijera.svg", import.meta.url);

export function initStartComponent() {
  class StartComponent extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const containerEl = document.createElement("div");
      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
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
      `;
      const secondStyleEl = document.createElement("style");
      secondStyleEl.innerHTML = `
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
      `;
      containerEl.innerHTML = `
      <div class="before_play_container">
        <div class="first_text">
            <h1 class="first_title">Piedra <span>Papel ó</span>Tijera</h1>
            <div class="start_btn__container">
                <custom-button>Empezar</custom-button>
            </div>
        </div>
        <div class="second_text">
            <h3 class="second_title">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</h3>
            <div class="play_btn__container">
                    <custom-button>¡Jugar!</custom-button>
            </div>
        </div>
        <div class="plays_container">
            <img src="${piedraUrl}" />
            <img src="${papelUrl}" />
            <img src="${tijeraUrl}" />
        </div>   
      
      </div>
      `;
      const startBtnContainerEl = containerEl.querySelector(".first_text");
      const firstTextEl: any = containerEl.querySelector(".first_text");
      const secondtextEl: any = containerEl.querySelector(".second_text");
      const playBtnContainerEl = containerEl.querySelector(
        ".play_btn__container"
      );
      const beforePlayContainerEl: any = containerEl.querySelector(
        ".before_play_container"
      );
      startBtnContainerEl?.addEventListener("click", (e) => {
        e.stopPropagation();
        firstTextEl.style.display = "none";
        secondtextEl.style.display = "flex";
      });
      playBtnContainerEl?.addEventListener("click", (e) => {
        e.stopPropagation();
        beforePlayContainerEl.style.display = "none";
        const playContainerEl = document.createElement("div");
        playContainerEl.innerHTML = `  
          <play-component></play-component>
        `;
        shadow.appendChild(playContainerEl);
      });
      shadow.appendChild(styleEl);
      shadow.appendChild(secondStyleEl);
      shadow.appendChild(containerEl);
    }
  }
  customElements.define("start-component", StartComponent);
}

// Ya desaparecen las manos y el texto al tocar Empezar y al tocar Jugar
// Ahora hay que montar las manos en un mayor tamaño y el contador, ambos componentes son animados
