import Overlay from "../components/Overlay.svelte";
import { storage } from "../storage";

// Some global styles on the page
import "./styles.css";

// Some JS on the page
storage.get().then(console.log);

// Some svelte component on the page
// new Overlay({ target: document.body });

const addHoldListener = (
  element: HTMLElement,
  f: (event: MouseEvent) => void,
  timeout: number
) => {
  let down = 0;

  let isDown = false;

  const upListener = (event: MouseEvent) => {
    isDown = false;

    element.removeEventListener("mouseup", upListener);
  };

  const downListener = (event: MouseEvent) => {
    down = Date.now();
    isDown = true;
    setTimeout(() => {
      if (isDown) {
        f(event);
      }
    }, timeout);
  };

  element.addEventListener("mousedown", downListener);
};

document.querySelectorAll("img").forEach((img) => {
  addHoldListener(
    img,
    (event) => {
      const element = event.target as HTMLElement;
      // create parent
      const parent = document.createElement("div");
      parent.style.position = "relative";
      parent.style.display = "contents";
      // put copy of element in parent
      const copy = element.cloneNode(true) as HTMLElement;
      const imageContainer = document.createElement("div");
      imageContainer.style.position = "relative";
      imageContainer.appendChild(copy);

      parent.appendChild(imageContainer);
      // replace element with parent
      element.parentNode.replaceChild(parent, element);

      new Overlay({ target: imageContainer });
    },
    800
  );
});
