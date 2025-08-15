import { initHomePage } from "./pages/home";
import { initStartComponent } from "./components/start";
import { initPlayComponent } from "./components/play";
import { initButtonComponent } from "./components/button";
import { initDecisionComponent } from "./components/decision";
import { initScoreComponent } from "./components/score";
import { initRouter } from "./router";
import { state } from "./state";

(function () {
  state.initStorage();
  initStartComponent();
  initButtonComponent();
  initPlayComponent();
  initDecisionComponent();
  initScoreComponent();
  const rootEl = document.querySelector(".root");
  initRouter(rootEl);
})();
