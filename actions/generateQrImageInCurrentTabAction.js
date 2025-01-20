export function generateQrImageInCurrentTabAction(url) {
  if (document.getElementById("qr-container")) {
    return;
  }

  const container = document.createElement("div");

  container.id = "qr-container";

  const canvas = document.createElement("canvas");

  canvas.id = "qr";

  container.appendChild(canvas);

  const closeButton = document.createElement("button");

  closeButton.id = "close-button";
  closeButton.innerHTML = "X";

  container.appendChild(closeButton);

  document.body.appendChild(container);

  closeButton.addEventListener("click", function () {
    document.body.removeChild(container);
  });

  new QRious({
    element: canvas,
    value: url,
    size: 300,
  });
}
