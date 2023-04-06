let timer;

const input = document.getElementById("url_input");
const invalid_input = document.getElementById("invalid_input");
const data_container = document.getElementById("data_container");

const verifyString = (value) => {
  const regExp =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

  return new RegExp(regExp).test(value);
};

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

input.addEventListener("keyup", () => {
  clearTimeout(timer);

  if (verifyString(input.value)) timer = setTimeout(() => callServer(), 500);
});

input.addEventListener("input", (e) => {
  data_container.style.display = "none";

  if (e.target.value === "") {
    return (invalid_input.style.display = "none");
  } else if (!verifyString(e.target.value)) {
    return (invalid_input.style.display = "block");
  }

  return (invalid_input.style.display = "none");
});
