import { useState } from "react";
import { auth, db } from "./firebase";
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";


function ChatMessage(props) {
    const [msg, setMsg] = useState('');



  return (
  <div>
      <form>
          <div className='"sendMessage'>
          <input placeholder='Message ...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
          <button>Send</button>
          </div>
      </form>

  </div>)
}export default ChatMessage