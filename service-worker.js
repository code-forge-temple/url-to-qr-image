import { generateQrImageInCurrentTabAction } from "./actions/generateQrImageInCurrentTabAction.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    async function (tabs) {
      const tabId = tabs[0].id;
      const url = tabs[0].url;

      if (request.message === "generateQrImageInCurrentTabAction") {
        // If we need to inject some js files in the current tab (in this case we need the "qrious" library), we define it as below
        if (!(await isQriousLoaded(tabId))) {
          await chrome.scripting.executeScript({
            target: { tabId },
            files: ["libs/qrious/dist/qrious.min.js"],
          });
        }

        // if we need to inject some css in the current tab (in this case for our qr image display window), we define it as below
        await chrome.scripting.insertCSS({
          target: { tabId },
          files: ["style.css"],
        });

        // If we want to execute a function in the current tab, we define it as below
        chrome.scripting.executeScript({
          target: { tabId },
          args: [url],
          function: generateQrImageInCurrentTabAction,
        });
      }
    }
  );
});

async function isQriousLoaded(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    function: () => typeof QRious !== "undefined",
  });

  return result;
}
