// const { sendMessage } = require("react-chat-engine");

const socket= io()

let textarea=document.querySelector('#textarea')
let messagearea=document.querySelector('.message_area')

let name1;

do{
name1=prompt('Enter your NAme:-')
}while(!name1)

textarea.addEventListener('keyup', (e) =>{
    if(e.key==='Enter'){
    
       sendMess(e.target.value)
    }
})



function sendMess(message){
    let msg={
       user: name1,
       message: message.trim()
    }

    appendMessage(msg,'outgoing')
    scrollTo();
  textarea.value=""
    // sending server//
    socket.emit('message', msg)
}

function appendMessage(msg,type){
 let mainDiv=document.createElement('div')
 let className=type
 mainDiv.classList.add(className,'message')

 let markup= `
  
 <h4>${msg.user}</h4>
 <p>${msg.message}</p>
 
 `
 mainDiv.innerHTML=markup
 messagearea.appendChild(mainDiv)
}

// recive
socket.on('message',(msg) =>{
    appendMessage(msg,'incoming')
    scrollTo();
})

function scrollTo(){
    messagearea.scrollTop=messagearea.scrollHeight
}