import React, { useEffect, useRef, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth } from './firebase'

function ChatRoom() {
  const fires = firebase.firestore()
  const messagesRef = fires.collection('messages')
  const query = messagesRef.orderBy('createdAt').limitToLast(25)

  const [messages] = useCollectionData(query, { idField: 'id' })

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    })

    setFormValue('')
  }

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main>

      <div>
        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="say something nice"
          />

          <button type="submit" disabled={!formValue}>
            🕊️
          </button>
        </form>
      </div>
    </>
  )
}
export default ChatRoom

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  )
}
