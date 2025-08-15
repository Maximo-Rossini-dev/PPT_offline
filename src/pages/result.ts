import { state } from "../state";

export function initResultPage(params) {
  const containerEl = document.createElement("div");
  const currentState = state.getState();
  state.suscribe(() => {
    if (currentState.game.retry) {
      currentState.game.retry = false;
      state.setState(currentState);
      params.goTo("/home");
    }
  });
  containerEl.innerHTML = `
        <score-board></score-board>
    `;
  return containerEl;
}
