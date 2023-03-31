let timer;

const input = document.getElementById("url_input");
const invalid_input = document.getElementById("invalid_input");
const data_container = document.getElementById("data_container");

const verifyString = (value) => {
  const regExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

  return new RegExp(regExp).test(value);
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

input.addEventListener("keyup", () => {
  clearTimeout(timer);

  if (verifyString(input.value)) timer = setTimeout(() => callServer(), 500);
});

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
