
require('dotenv').config()

async function addUser(userObj){
  const {email, links} = userObj;

  try {
    const req = await fetch(process.env.BASE_ENDPOINT_URL + "/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email_id : email, links}),
    });

    const res = await req.json();
    console.log(res)
  }
  catch(e){
    console.log("there was a failure in the add fetch:", e)
  }
}

async function deleteUser(email){
  try {
    const req = await fetch(process.env.BASE_ENDPOINT_URL + "/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email_id : email}),
    });

    const res = await req.json();
    console.log(res)
  }
  catch(e){
    console.log("there was a failure in the delete fetch:", e)
  }
}

async function sendEmails(){
  try {
    const req = await fetch(process.env.BASE_ENDPOINT_URL + "/sendEmails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const res = await req.json();
    console.log(res)
  }
  catch(e){
    console.log("there was a failure in the send emails fetch:", e)
  }
}

module.exports = {addUser, deleteUser, sendEmails}