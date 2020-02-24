if (!localStorage.getItem('display_name'))
    localStorage.setItem('display_name', "");

    if (!localStorage.getItem('channel_name'))
    localStorage.setItem('channel_name', "");

    document.addEventListener('DOMContentLoaded', () => {
    let display_name = localStorage.getItem('display_name');
    let channelName = localStorage.getItem('channel_name');
        // Remember display name
        document.querySelector('#display_name').value = display_name;
        document.querySelector('#isChannel').value = channelName;
        
    document.querySelector('#getDisplayName').onclick = (ev) => {
        //ev.preventDefault();
        if (document.querySelector('#display_name').value.length > 0){
            let display_name = document.querySelector('#display_name').value;
            localStorage.setItem('display_name',display_name);
        }
        else
        alert("display name can't be empty");
       
    }

    // document.querySelector('#form').onsubmit = () => {

    //     // Initialize new request
    //     const request = new XMLHttpRequest();
    //     const exampleInputName = document.querySelector('#exampleInputName').value;
    //     const exampleInputDesc = document.querySelector('#exampleInputDesc').value;
    //     request.open('POST', '/creatChannel');
    //     // Add data to send with request
    //     const data = new FormData();
    //     data.append('name', exampleInputName);
    //     data.append('descripti', exampleInputDesc);

    //     // Send request
    //     request.send(data);
    //     return false;
    // };
   
});



