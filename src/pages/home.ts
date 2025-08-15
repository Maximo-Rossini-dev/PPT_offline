import { state } from "../state";

export function initHomePage(params) {
  const currentState = state.getState();
  state.suscribe(() => {
    if (
      currentState.game.roundWinner != "draw" &&
      currentState.game.roundWinner.length > 0
    ) {
      params.goTo("/result");
    } else if (currentState.game.roundWinner == "draw") {
      params.goTo("/home");
      currentState.game.retry = false;
      currentState.game.roundWinner = "";
      while (containerEl.firstChild) {
        containerEl.removeChild(containerEl.firstChild);
      }
      const div = document.createElement("div");
      div.innerHTML = `
      <start-component></start-component>
      `;
      containerEl.appendChild(div);
      state.setState(currentState);
    }
  });

  const containerEl = document.createElement("div");
  containerEl.classList.add("container");
  containerEl.innerHTML = `
  <start-component></start-component>
  `;
  return containerEl;
}
