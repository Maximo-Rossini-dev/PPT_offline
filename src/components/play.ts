const piedraUrl = new URL("../piedra.svg", import.meta.url);
const papelUrl = new URL("../papel.svg", import.meta.url);
const tijeraUrl = new URL("../tijera.svg", import.meta.url);

import { state } from "../state";

export function initPlayComponent() {}
class PlayComponent extends HTMLElement {
  private _timer: number;
  private counterEl: HTMLElement; // Guarda referencia al elemento del contador

  constructor() {
    super();
    this._timer = 3;
    const shadow = this.attachShadow({ mode: "open" });
    const containerEl = document.createElement("div");
    containerEl.classList.add("container");
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
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
      `;

    containerEl.innerHTML = `
      <div class="counter_container">
          <p class="counter">${this._timer}</p>
      </div>
      <div class="hands_container">
          <img class="piedra" src="${piedraUrl}" />
          <img class="papel" src="${papelUrl}" />
          <img class="tijera" src="${tijeraUrl}" />
      </div>
    `;

    const piedraImg = containerEl.querySelector(".piedra");
    const papelImg = containerEl.querySelector(".papel");
    const tijeraImg = containerEl.querySelector(".tijera");
    this.addHoverEffect(piedraImg);
    this.addHoverEffect(papelImg);
    this.addHoverEffect(tijeraImg);
    shadow.appendChild(styleEl);
    shadow.appendChild(containerEl);

    this.counterEl = containerEl.querySelector(".counter") as HTMLElement; // Guardar referencia
    this._timer = 0; // Inicializar el timer
    this.startCountdown(containerEl); // Iniciar el conteo
    const currentState = state.getState();
    currentState.game.retry = false;
    state.setState(currentState);
    state.computerMove();

    piedraImg?.addEventListener("click", (e) => {
      currentState.game.playerMove = "piedra";
      state.setState(currentState);
    });
    papelImg?.addEventListener("click", (e) => {
      currentState.game.retry = false;
      currentState.game.playerMove = "papel";
      state.setState(currentState);
    });
    tijeraImg?.addEventListener("click", (e) => {
      currentState.game.retry = false;
      currentState.game.playerMove = "tijera";
      console.log("currentState.game.retry :", currentState);
      state.setState(currentState);
    });
  }

  addHoverEffect(img) {
    img.addEventListener("mouseover", () => {
      img.style.transform = "scale(1.20)"; // Aumentar tamaño
      img.style.transition = "transform 0.3s"; // Transición suave
      this.shrinkOtherImages(img);
    });

    img.addEventListener("mouseout", () => {
      img.style.transform = "scale(1)"; // Volver al tamaño original
      this.resetOtherImages(img); // Vuelvo las demas imagenes a su tamaño original
    });
  }
  shrinkOtherImages(activeImg) {
    const images: any = this.shadowRoot?.querySelectorAll("img");
    images.forEach((img) => {
      if (img !== activeImg) {
        img.style.transform = "scale(0.9)"; // Disminuir tamaño
        img.style.transition = "transform 0.3s"; // Transición suave
      }
    });
  }

  resetOtherImages(activeImg) {
    const images: any = this.shadowRoot?.querySelectorAll("img");
    images.forEach((img) => {
      if (img !== activeImg) {
        img.style.transform = "scale(1)"; // Volver al tamaño original
      }
    });
  }

  set counter(value) {
    this._timer = value;
    this.updateCounter(); // Actualizar solo el contador
  }

  updateCounter() {
    this.counterEl.textContent = this._timer.toString(); // Actualizar el texto del contador
  }

  async startCountdown(rootEl) {
    let count = 3;
    const interval = setInterval(() => {
      this.counter = count; // Le paso el numero de segundos al setter asi setea el valor de _timer y al mismo tiempo actualiza el elemento
      // gráfico montado en el DOM utilizando el método updateCounter.
      count -= 1;
      if (count < 0) {
        clearInterval(interval); // Detener el conteo
      }
    }, 1000);
    setTimeout(() => {
      const newElementsContainer = document.createElement("div");
      newElementsContainer.classList.add("decision_container");
      newElementsContainer.innerHTML = `
        <players-decision></players-decision>
      `;
      while (rootEl.firstChild) {
        rootEl.removeChild(rootEl.firstChild);
      }
      rootEl.appendChild(newElementsContainer);
    }, 5000);
  }
}

customElements.define("play-component", PlayComponent);
