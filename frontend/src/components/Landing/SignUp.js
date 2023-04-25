import { useState } from 'react';
import "./Landing.scss";
import Input from "./Input";
import { useHistory } from "react-router-dom";
const {addUser} = require('../../services/api');

function SignUp(){
  const popularLinkTrees = [
    {name: "WiE", link: "https://linktr.ee/uwaterloowie"},
    {name: "WiCS", link: "https://linktr.ee/uwaterloowics"},
    {name: "OStem", link: "https://linktr.ee/ostemuwaterloo"},
    {name: "CSClub", link: "https://linktr.ee/uwcsclub"},
    {name: "Tech+", link: "https://linktr.ee/techplusuw"},
    {name: "DataSci Club", link: "https://linktr.ee/uwdsc"},
    {name: "Wasa", link: "https://linktr.ee/wasawaterloo"},
    {name: "Blueprint", link: "https://linktr.ee/uwaterlooblueprint"},
    {name: "PM Club", link: "https://linktr.ee/uwaterloopm"},
    {name: "UW UX", link: "https://linktr.ee/uwux"},
    {name: "HTN", link: "https://linktr.ee/hackthenorth"},
  ]
  const [inputCount, setInputCount] = useState(0);
  const [linkTrees, setLinkTrees] = useState([NewInput(inputCount)]);
  const [data, setData] = useState([""]);
  const [email, setEmail] = useState([""]);
  const [error, setError] = useState(false);

  function NewInput(newId){
    return {
      id : newId,
      html: <Input 
        key={newId} 
        handleChange={onChangeOccured} 
        id={newId} 
        onClose={() => deleteLinkTree(newId)} />
    }
  }

  function addLinkTree(){
    setData(oldArray => [...oldArray, ""] );
    const newInput = new NewInput(inputCount+1)
    setLinkTrees(oldArray => [...oldArray, newInput] );
    setInputCount(prev => prev+1)
  }

  function deleteLinkTree(id){
    setLinkTrees(prevArr => {
      return prevArr.filter(tree => tree.id !== id)
    })
    setData(prevArr => {
      prevArr[id] = ""
      return prevArr
    })
  }

  function onChangeOccured({id, val}){
    setData(oldArray => {
      oldArray[id] = val
      return oldArray
    })
  }

  async function submit(){
    const history = useHistory();
    setError(false);

    // 1. validate email
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/);
    if (!emailRegex.test(email)){
      setError(true);
      return;
    }

    // 2. validate linktree links
    for (let link of data) { 
      let regex = /https:\/\/linktr\.ee\/[A-Za-z]+/i;
      if (link !== "" && link !== " " && !regex.test(link)) {
        setError(true);
        return;
      }
    }
    
    addUser({email, data})
      .then(() => history.push("/success"))
      .catch(e => setError(true))
  }

  return (
    <div class="signup_container">
      <div class="signup_email">
        <h3>Email</h3>
        <p>You can unsubscribe at any time</p>
        <input 
          type="text" 
          name="email" 
          id="email" 
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <h3>LinkTrees</h3>
        <p>The order you add them will be the order they appear in the email</p>
        {linkTrees.map(linkTree => {
          return (
          <div 
            className="signup_linktree" 
            key={linkTree.id}>
            {linkTree.html}
          </div>)
        })}

        <button class="signup_add" onClick={addLinkTree}>Add Link +</button>
        <br/>
        <button class="signup_submit" onClick={submit}>Submit</button>
        {error && <p>Sorry, there was an error. Possibly your email or a link you provided is invalid</p>}

      </div>
      <div class="signup_popular-trees">
        <h3>Popular LinkTrees</h3>
        <ul>
          {popularLinkTrees.map(tree => {
            return (
              <li>
                <span><b>{tree.name}</b></span> : <span>{tree.link}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SignUp;