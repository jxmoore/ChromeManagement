chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    if (typeof message !== "string") {
      sendResponse({ data: "Thats odd, i cant read that." });
    }

    const messageType = (message as string).toLocaleLowerCase();
    switch (messageType) {
      case "getserialnumber": {
        chrome.enterprise.deviceAttributes.getDeviceSerialNumber((x: any) => {
          sendResponse({ data: x });
        });
        return true; // ensure that the message sender is kept alive until the response is ready to be sent in the serial number callback
      }
      case "getlocation": {
        chrome.enterprise.deviceAttributes.getDeviceAnnotatedLocation(
          (x: any) => {
            sendResponse({ data: x });
          }
        );
        return true;
      }
      case "getassetid": {
        chrome.enterprise.deviceAttributes.getDeviceAssetId((x: any) => {
          sendResponse({ data: x });
        });
        return true;
      }
      case "gethostname": {
        chrome.enterprise.deviceAttributes.getDeviceHostname((x: any) => {
          sendResponse({ data: x });
        });
        return true;
      }
      case "getdeviceid": {
        chrome.enterprise.deviceAttributes.getDirectoryDeviceId((x: any) => {
          sendResponse({ data: x });
        });
        return true;
      }
      case "getnetwork": {
        chrome.enterprise.networkingAttributes.getNetworkDetails((x: any) => {
          sendResponse({ data: x });
        });
        return true;
      }
      default:
        sendResponse({ data: "you said " + messageType });
    }
  }
);
