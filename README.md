# JavaScript - Test

Hello! Welcome to my JavaScript Test. In index.html you can find a simple Input and a text used for displaying some info about the URL inputted.

The **script.js** file:

This part is used to find the input, the invalid_input text and the data_container, used to show the backend response info.
```js
let timer;

const input = document.getElementById("url_input");
const invalid_input = document.getElementById("invalid_input");
const data_container = document.getElementById("data_container");
```

This function uses a Regular Expression to validate the URL, I could declare a new URL object, but it considers a URL without http or https as invalid, and a server CAN request without it, so I used RegEx. It accepts http, https and a direct link, without http or https.

```js
const verifyString = (value) => {
  const regExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

  return new RegExp(regExp).test(value);
};
```

This function should be responsible by calling the validation server and returning the info for the URL, as asked for the test. For now, I've implemented in a comment a sample of a request using native fetch of JavaScript and for the function, I've added a mock for the infos, if the time now is even it returns that the URL reffers to a file and for odd unix time, it returns that is a directory.
```js
const callServer = async () => {
  /*
    const response = await fetch(
      'https://example.com/verify_url',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {url: input.value}
      }
    )
  */

  if (Date.now() % 2 === 0) {
    data_container.innerHTML = `
       <p><b>Is File: </b> true<br/>
          <b>File Name:</b> mock.pdf<br/>
          <b>URL: </b>${input.value}</p>
    `;
  } else {
    data_container.innerHTML = `
       <p><b>Is Folder: </b> true<br/>                <b>Folder Name: </b> my_folder<br/>
          <b>URL: </b>${input.value}</p>
    `;
  }
};
```
Thi part is responsible to add a listener to input on keyUp, when the key up, the JavaScript cancels the previous timer and initiate a new one, so just when the user stops typing for 500ms it calls the server, similar to underscore.js debounce function. And, before start a new timer, it uses the verifyString function to validate the URL and prevent unecessary calls to backend.
```js
input.addEventListener("keyup", () => {
  clearTimeout(timer);

  if (verifyString(input.value)) timer = setTimeout(() => callServer(), 500);
});
```
Ending the Script, this part adds a listener to the input, when receives a new input, validate de URL and display the invalid URL text info if is an invalid URL. Also hides the response from backend when the URL is invalid.
```
input.addEventListener("input", (e) => {
  if (e.target.value === "") {
    data_container.style.display = "none";
    return (invalid_input.style.display = "none");
  } else if (!verifyString(e.target.value)) {
    data_container.style.display = "none";
    return (invalid_input.style.display = "block");
  }

  data_container.style.display = "block";
  return (invalid_input.style.display = "none");
});
```