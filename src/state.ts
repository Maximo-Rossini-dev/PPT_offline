export const state = {
  data: {
    game: {
      playerMove: "",
      computerMove: "",
      playerVictories: 0,
      computerVictories: 0,
      draws: 0,
      roundWinner: "",
      retry: false,
    },
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setState(newState) {
    const currentState = this.getState();
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem(
      "player_victories",
      JSON.stringify(currentState.game.playerVictories)
    );
    localStorage.setItem(
      "computer_victories",
      JSON.stringify(currentState.game.computerVictories)
    );
  },
  suscribe(cb: (any) => any) {
    this.listeners.push(cb);
  },
  computerMove() {
    const moves = ["piedra", "papel", "tijera"];
    let index = Math.floor(Math.random() * 3);
    const currentState = this.getState();
    currentState.game.computerMove = moves[index];
    this.setState(currentState);
  },
  result() {
    const currentState = this.getState();

    if (
      currentState.game.playerMove == "piedra" &&
      currentState.game.computerMove == "tijera"
    ) {
      currentState.game.playerVictories += 1;
      currentState.game.roundWinner = "player";
      state.setState(currentState);
    } else if (
      currentState.game.playerMove == "papel" &&
      currentState.game.computerMove == "piedra"
    ) {
      currentState.game.playerVictories += 1;
      currentState.game.roundWinner = "player";
      state.setState(currentState);
    } else if (
      currentState.game.playerMove == "tijera" &&
      currentState.game.computerMove == "papel"
    ) {
      currentState.game.playerVictories += 1;
      currentState.game.roundWinner = "player";
      state.setState(currentState);
    } else if (
      currentState.game.playerMove == "piedra" &&
      currentState.game.computerMove == "papel"
    ) {
      currentState.game.computerVictories += 1;
      currentState.game.roundWinner = "computer";
      state.setState(currentState);
    } else if (
      currentState.game.playerMove == "papel" &&
      currentState.game.computerMove == "tijera"
    ) {
      currentState.game.computerVictories += 1;
      currentState.game.roundWinner = "computer";
      state.setState(currentState);
    } else if (
      currentState.game.playerMove == "tijera" &&
      currentState.game.computerMove == "piedra"
    ) {
      currentState.game.computerVictories += 1;
      currentState.game.roundWinner = "computer";
      state.setState(currentState);
    } else if (currentState.game.playerMove == "") {
      currentState.game.computerVictories += 1;
      currentState.game.roundWinner = "computer";
      state.setState(currentState);
    } else {
      currentState.game.draws += +1;
      currentState.game.roundWinner = "draw";
      state.setState(currentState);
    }
  },
  initStorage() {
    const currentState = this.getState();
    const playerVic =
      JSON.parse(localStorage.getItem("player_victories") as any) || 0;
    const computerVic =
      JSON.parse(localStorage.getItem("computer_victories") as any) || 0;
    currentState.game.playerVictories = playerVic;
    currentState.game.computerVictories = computerVic;
    this.setState(currentState);
  },
};
