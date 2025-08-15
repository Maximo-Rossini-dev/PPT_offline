export function initButtonComponent() {
  class CustomButton extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const buttonEl = document.createElement("button");
      buttonEl.classList.add("button");
      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
        .button{
          font-size : 20px;
        }
        @media(min-width:960px){
          .button{
            font-size:42px;
            padding :20px;
          }
        }
      `;
      buttonEl.textContent = this.textContent;
      buttonEl.style.border = "10px solid #001997";
      buttonEl.style.borderRadius = "10px";
      buttonEl.style.textAlign = "center";
      buttonEl.style.backgroundColor = "#006CFC";
      buttonEl.style.padding = "12px";
      buttonEl.style.color = "#FAFAFA";
      buttonEl.style.width = "100%";
      buttonEl.style.cursor = "pointer";
      shadow.appendChild(styleEl);
      shadow.appendChild(buttonEl);
    }
  }
  customElements.define("custom-button", CustomButton);
}
