const victoryURL = new URL("../winner.svg", import.meta.url);
const loserURL = new URL("../loser.svg", import.meta.url);
import { state } from "../state";

export function initScoreComponent() {
  class PlayerScore extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const currentState = state.getState();
      const containerEl = document.createElement("div");
      containerEl.classList.add("container");
      containerEl.innerHTML = `
        <img class="img" src="${
          currentState.game.roundWinner == "player" ? victoryURL : loserURL
        }"  />
        <div class="scoreboard">
            <h4>Score</h4>
            <div class="scoreboard_players">
                <p>Vos : ${currentState.game.playerVictories}</p>
                <p>Máquina : ${currentState.game.computerVictories}</p>
            </div>
        </div>
        <div class="btn_container">
                <custom-button>Volver a jugar</custom-button>
        </div>
      `;
      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
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
    `;
      const btnContainerEl = containerEl.querySelector(".btn_container");
      btnContainerEl?.addEventListener("click", (e) => {
        currentState.game.retry = true;
        currentState.game.roundWinner = "";
        currentState.game.computerMove = "";
        currentState.game.playerMove = "";
        state.setState(currentState);
      });
      shadow.appendChild(styleEl);
      shadow.appendChild(containerEl);
    }
  }
  customElements.define("score-board", PlayerScore);
}
