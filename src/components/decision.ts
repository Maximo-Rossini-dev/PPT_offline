import { state } from "../state";

const piedraUrl = new URL("../piedra.svg", import.meta.url);
const papelUrl = new URL("../papel.svg", import.meta.url);
const tijeraUrl = new URL("../tijera.svg", import.meta.url);

export function initDecisionComponent() {
  class PlayerDecision extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const currentState = state.getState();
      let playerMove;
      switch (currentState.game.playerMove) {
        case "piedra":
          playerMove = piedraUrl;
          break;
        case "papel":
          playerMove = papelUrl;
          break;
        case "tijera":
          playerMove = tijeraUrl;
          break;
      }
      let computerMove;
      switch (currentState.game.computerMove) {
        case "piedra":
          computerMove = piedraUrl;
          break;
        case "papel":
          computerMove = papelUrl;
          break;
        case "tijera":
          computerMove = tijeraUrl;
          break;
      }
      const shadow = this.attachShadow({ mode: "open" });
      const containerEl = document.createElement("div");
      containerEl.classList.add("container");
      containerEl.innerHTML = `
         <img  class="computer_move"  src="${computerMove}" />
         <img  class="player_move" src="${playerMove || ""}" />
      `;
      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
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
            .player_move{
                height : 300px;
                width: 200px;
                display:block;
                margin : 0 auto;
                margin-bottom:-10px;
            }
            @media(min-width:960px){
              .player_move{
                height : 500px;
                width:250px;
              }
              .computer_move{
                 height : 500px;
                 width:250px;
              }
            }
      `;
      setTimeout(() => {
        state.result();
        if (currentState.game.roundWinner == "draw") {
          currentState.game.retry = true;
          state.setState(currentState);
        }
      }, 4000);
      shadow.appendChild(styleEl);
      shadow.appendChild(containerEl);
    }
  }
  customElements.define("players-decision", PlayerDecision);
}
