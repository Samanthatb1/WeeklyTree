import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Ubsubscribe.scss";
const { deleteUser } = require("../../services/api");

function Unsubscribe() {
  const [email, setEmail] = useState([""]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function submit() {
    setError(false);

    deleteUser(email)
      .then(() => navigate("/success"))
      .catch((e) => setError(true));
  }

  return (
    <div class="unsubscribe">
      <p>Enter your email to Unsubscribe </p>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="example@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
      {error && (
        <p>
          Sorry, there was an error. Possibly your email you provided is invalid
        </p>
      )}
    </div>
  );
}

export default Unsubscribe;
