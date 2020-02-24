
    document.addEventListener('DOMContentLoaded', () => {
  
    let display_name = localStorage.getItem('display_name');
    
       // By default, submit button is disabled
       document.querySelector('#submit').disabled = true;
       document.querySelector('#submit').style.color = "red";
       // Connect to websocket
       var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
   
       // Enable button only if there is text in the input field
       document.querySelector('#task').onkeyup = () => {
           if (document.querySelector('#task').value.length > 0){
   
               document.querySelector('#submit').disabled = false;
               document.querySelector('#submit').style.color = "blue";
   
           }
           else
               document.querySelector('#submit').disabled = true;
               document.querySelector('#submit').style.color = "red";
       };
   
       // When connected, configure button
       socket.on('connect', () => {
           document.querySelector('#submit').onclick = (ev) => {
               ev.preventDefault();
               var message = document.querySelector('#task').value;
               var channelName = document.querySelector('#channelName').value;
               socket.emit('submit message', {'message': message, 'channelName': channelName});
            //console.log(content);
               };
           });
   
       socket.on('receive message', function(data) {
           console.log("data.display_name:"+ data.display_name);
           console.log("display_name:"+ display_name);
           const content = document.createElement('div');
           var msg_page = document.querySelector('#msg-page');
           console.log("content:"+ content);
            if(data.display_name == display_name ){
                content.innerHTML = `<div class="outgoing-chats" Id="${data.message_id}">
                <div class="outgoing-chats-msg">
                <p>${data.message} </p>
                <span class="time">${data.timeStamp}</span>
                <button  class="getId" type="button" value="${data.message_id}" data-getId="${data.message_id}">
                    <span><i class="fa fa-trash" style="color:#ccc"></i></span>
                </button>
             </div>
          </div>`;

        //   `<div class="outgoing-chats">
        //         <div class="outgoing-chats-msg">
        //         <p>${data.message}</p>
        //         <span class="time">${data.timeStamp}</span>
        //      </div>
        //   </div>`

          
          msg_page.append(content);
            console.log("content:"+ content.innerHTML);
            }else{
                
                content.innerHTML = `<div class="received-chats">
                <div class="received-chats-name">
                    <p class="sender-display-name">${data.display_name}</p>
                </div>
                <div class="received-msg">
                    <div class="received-msg-inbox">
                        <p>${data.message}</p>
                        <span class="time">${data.timeStamp}</span>
                    </div>
                </div>
            </div>`;
            document.querySelector('#msg-page').append(content);
            console.log("content:"+ content);
            }

           document.querySelector('#task').value = '';
           document.querySelector('#submit').disabled = true;
           document.querySelector('#submit').style.color = "red";
           
      });

    //   document.querySelector('#getId').onclick= (button)=> {
    //     var id = button.dataset.getId;
    //     console.log(id)
    //     };

        // document.querySelector('.getId').onclick = (ev) => {
        //     console.log("make hay");
        //     const element = ev.target;
        //     // document.querySelector('.getId').parentElement.remove();
        //     // ev.preventDefault();
        //     const id = element.value;
        //     console.log(id);
        //     element.parentElement.remove();
            
        //     // ev.parentElement.remove();
        //     // var id = document.querySelector('.getId').dataset.getId;
        //     // ev.preventDefault();
        //     // var id = ev.dataset.getId;
        //     //  console.log(id)
        // };

        document.querySelectorAll('.getId').forEach(link => {
            link.onclick = () => {
                console.log("make hay");
                // const page = link.dataset.page;
                const id = link.value;
                console.log(id);
                const request = new XMLHttpRequest();
                request.open('POST', '/deleteMsg');
                const data = new FormData();
                data.append('msgId', id);
                request.send(data);
                document.querySelector('#'+CSS.escape(id)+'').remove();
                
            };
        });
        
       
    });

//     $(".getId").click(function(){
//         var id =   $(this).val();
//         console.log(id);
//             const request = new XMLHttpRequest();
//             request.open('POST', '/deleteMsg');
//             const data = new FormData();
//             data.append('msgId', id);
//             request.send(data);
//             document.querySelector('#'+CSS.escape(id)+'').remove();
//    });
  



