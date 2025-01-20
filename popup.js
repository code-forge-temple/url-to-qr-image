import { generateQrImageInPopupAction } from "./actions/generateQrImageInPopupAction.js";

document
  .getElementById("generateQrImageInPopupAction")
  .addEventListener("click", generateQrImageInPopupAction);

document
  .getElementById("generateQrImageInCurrentTabAction")
  .addEventListener("click", () => {
    chrome.runtime.sendMessage({
      message: "generateQrImageInCurrentTabAction",
    });
  });
