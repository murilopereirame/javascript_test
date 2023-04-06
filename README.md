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
  const regExp =
    /^(((https|http):\/\/)|)[(a-zA-Z0-9)@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

  return new RegExp(regExp).test(value);
};
```

The RegEx validates if URL starts with :// it should have http or https before

```
(https|http):\/\/)|)
```

This part validate the subdomain, as www. or validation., or no subdomain names, the domain name and it validates the domain TLD with minimum length of 2, as .br

```
[(a-zA-Z0-9)@:%._\+~#=]{2,256}\.[a-z]{2,6}
```

And finnaly, this part should validate if is a valid ending, accpets empty string, url paths, file name, folders and query params

```
([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)
```

Here we have "The Server", this function contains a Promise that represents the server and given an url it should be returns the info about it. For now, it contains a mock for the infos, if the time now is even, returns that the URL reffers to a file and for odd unix time, returns that is a directory. The return structure is the type of url, the name of file/folder and the analysed URL.

The setTimeout is used to delay the response, simulating the internet delay between the client and the server.

```js
const mockedServer = async (url) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (Date.now() % 2 === 0)
        resolve({
          type: "FILE",
          name: "mock.pdf",
          url,
        });
      else
        resolve({
          type: "FOLDER",
          name: "my_folder",
          url,
        });
    }, 700)
  );
};
```

This function should be responsible by calling the validation server and returning the info for the URL, as asked for the test. For now, I've implemented in a comment a sample of a request using native fetch of JavaScript and for the function.

I've added a call to "The Server", our mocked server, the call is async as we expect from a comunication between client and service so I used await to waits the server response, after it, I show the data_container and filled it up with the server response.

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

  const url = input.value;
  const response = await mockedServer(url);

  data_container.innerHTML = `
      <p><b>Type: </b> ${response.type}<br/>
      <b>Name:</b> ${response.name}<br/>
      <b>URL: </b>${input.value}</p>
  `;

  data_container.style.display = "block";
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
