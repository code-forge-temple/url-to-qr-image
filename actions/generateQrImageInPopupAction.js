export function generateQrImageInPopupAction() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    const qrContainer = document.getElementById("qr");

    new QRious({
      element: qrContainer,
      value: url,
      size: 300,
    });

    qrContainer.style.display = "block";
  });
}
