const inputEl = document.getElementById("input")
const sendBtn = document.getElementById("send-btn")
const messagesEl = document.getElementById("messages")

const createNewMessageEl = (sender, message) => {
  const mainDiv = document.createElement('div')
  const senderName = document.createElement('p')
  const messageDiv = document.createElement('div')
  senderName.textContent = sender
  mainDiv.appendChild(senderName)
  mainDiv.appendChild(messageDiv)
  mainDiv.className = 'message-box'
  senderName.className = 'sender-name'
  messageDiv.className = 'message-div typing-animation'
  scrollToBottom()
  messageDiv.textContent = message
  return mainDiv 
}

const scrollToBottom = () => {
  messagesEl.scrollTop = messagesEl.scrollHeight 
}

sendBtn.addEventListener("click", (e) => {
  sendMessage()
  inputEl.value = ''
})

const PORT = 5000

const backendUrl = `http://localhost:${PORT}`
const sendMessage = async () => {
  try {
    if(inputEl.value){
      const newSentMessageEl = createNewMessageEl("you", inputEl.value) 
      messagesEl.appendChild(newSentMessageEl)
      const response = await fetch(`${backendUrl}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({message: inputEl.value})
      })

      const responseData = await response.json()
      responseMessage = responseData.response
      const newMessageRecievedEl = createNewMessageEl("siwakAPT", responseMessage)
      messagesEl.appendChild(newMessageRecievedEl)
    }else {
      window.alert("Cannot send an empty message")
      return 
    }
  }catch(err) {
    console.log('Error sending message', err)
  }
}
