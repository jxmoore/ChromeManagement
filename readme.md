# Device Info Collector

A compact Chrome extension designed for managed Chrome devices. It responds to predefined messages, akin to commands, by providing device-specific information upon receiving each message.

To retrieve information about a chrome kiosk simply send a message to the extension, by its Id, and utilize the response.

Basic example usage :

```
	const extId = "mefaccjckdjlgllohohajhbbmfmpdpio"; // the id for the extension. This should be static and is based off of the PEM.
	const command = "getSerialNumber"; // the message body which will act as a command when by the extension.
	chrome.runtime.sendMessage(extId, command, (response) => { console.log("This devices serial number is ", response); }
```

The chrome extension API's used are asynchronous. Because of this, its advisable to wrap the function that actually posts the message in a promise that can then be awaited for example :

```
  const doSomething = ()=> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage("mefaccjckdjlgllohohajhbbmfmpdpio", command, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message as string);
        } else {
          resolve(response);
        }
      });
    });
  }


// other code, just doing javascript things

 let result="";
 try {
 	result = await doSomething();
 	console.log('we did a thing : ', result);
 } catch (error) {
 	console.error('An error occured doing that thing ', result);
 }
```

Clients should always be able to use the ExtensionId `TODO`.

The following are the current messages (commands) the extension listens for:

- `GetSerialNumber` - Gets the device serial number
- `GetLocation` - Gets the devices annotated location as it configured in the Enterprise Chrome Admin portal.
- `GetAssetId` - Gets the annotated location as it is in the Enterprise Chrome Admin portal.
- `GetHostname` - Gets the devices hostname
- `GetDeviceId` - Gets the UUID that uniquely identifies the device in the Enterprise Chrome Admin portal
- `GetNetworkInfo` - Gets the network information.
  <sup>These are not case sensitive</sup>

With the exception of the _GetNetowrkInfo_, all of the responses will be `{data: x}`, where _x_ is the string value returned by the Chrome API. All of the above map to Chrome extension api's, to learn more about the apis being used [see the device attributes documentation here](https://developer.chrome.com/docs/extensions/reference/api/enterprise/deviceAttributes) and the [networking attributes here](https://developer.chrome.com/docs/extensions/reference/api/enterprise/networkingAttributes).

## Troubleshooting

- If you receive `"You said "`, along with the original message, this is an indication that the message text/command was not found and its just being echoed back. For a list of commands refer to the switch statement in [listen.ts](src/listen.ts)
- `Cannot read properties of undefined (reading 'sendMessage')` Generally occurs when the website is not in the externally_connectable list found in the [manifest.json](manifest.json)
- `Could not establish connection. Receiving end does not exist` This can be due to the above, or because the extension Id is incorrect.

## Local Development

WIP

#### Building

The code can be built with NPM using `npm run build`. This will run babel and tsc, copying the contents to the dist directory. This does not in turn make an extension (CRX) though, for that you can use the [NPM CRX package](https://www.npmjs.com/package/crx?activeTab=readme) or chrome.

#### Testing

WIP

## Distribution

TODO
