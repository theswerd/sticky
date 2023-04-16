import Overlay from "../components/Overlay.svelte";

// Some global styles on the page

// Some svelte component on the page
// new Overlay({ target: document.body });

const addHoldListener = (
  element: HTMLElement,
  f: (event: MouseEvent) => void
) => {
  element.addEventListener("dblclick", (e) => {
    // alert("EVENT");
    f(e as MouseEvent);
  });
};

function handle(event) {
  const element = event.target as HTMLImageElement;
  const width = element.clientWidth;
  const height = element.clientHeight;

  // create parent
  const parent = document.createElement("div");
  parent.style.position = "relative";
  parent.style.display = "contents";
  // put copy of element in parent
  const copy = element.cloneNode(true) as HTMLImageElement;
  const imageContainer = document.createElement("div");
  imageContainer.style.position = "relative";
  imageContainer.appendChild(copy);

  parent.appendChild(imageContainer);
  // replace element with parent
  element.parentNode.replaceChild(parent, element);
  console.log("OFFSET", event.offsetX, event.offsetY);
  console.log("CLIENT", event.clientX, event.clientY);
  console.log("PAGE", event.pageX, event.pageY);
  const x = event.clientX / width,
    y = event.clientY / height;
  console.log("POS", x, y);
  const overlay = new Overlay({
    target: imageContainer,
    props: {
      img: element,
      destruction: () => {
        overlay.$destroy();
        addHoldListener(imageContainer, handle);
      },
      pos: {
        x,
        y,
      },
    },
  });
}

document.querySelectorAll("img").forEach((img) => {
  addHoldListener(img, handle);
});
