const api_base_endpoint = process.env.REACT_APP_BASE_ENDPOINT_URL;

// tested user exists and doesnt exist
async function addUser(userObj) {
  const { email, links } = userObj;

  const url = api_base_endpoint + "/newUser";

  try {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_id: email, links }),
    });

    const res = await req.text();
    console.log(res);
  } catch (e) {
    console.log("there was a failure in the add fetch:", e);
  }
}

// works!
async function deleteUser(email) {
  try {
    const req = await fetch(
      process.env.REACT_APP_BASE_ENDPOINT_URL + "/deleteUser",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_id: email }),
      },
    );

    const res = await req.text();
    console.log(res);
  } catch (e) {
    console.log("there was a failure in the delete fetch:", e);
  }
}

module.exports = { addUser, deleteUser };
