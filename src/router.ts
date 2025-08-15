import { initResultPage } from "./pages/result";
import { initHomePage } from "./pages/home";

export function initRouter(parentEl) {
  const routes = [
    {
      path: /\/home/,
      handler: initHomePage,
    },
    {
      path: /\/result/,
      handler: initResultPage,
    },
  ];
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }
  function handleRoute(route) {
    for (let r of routes) {
      if (r.path.test(route)) {
        const el = r.handler({ goTo });
        if (parentEl.firstChild) {
          parentEl.firstChild.remove();
        }
        parentEl.appendChild(el);
      }
    }
  }
  window.addEventListener("load", () => {
    goTo("/home");
  });
  if (location.pathname == "/") {
    goTo("/home");
  } else {
    handleRoute(location.pathname);
  }
}
