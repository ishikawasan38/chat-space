$(function(){
      function buildHTML(message){
        if ( message.content && message.image) {
          var html = 
           `<div class="message" data-message-id= ${message.id} >
           </div>
              <div class="chat-comment">
                <div class="chat-comment__name">
                  <div class="group-name1">
                    ${message.user_name}
                </div>
                  <div class="group-time1">
                    ${message.created_at}
                  </div> 
              </div>
                <div class="chat-comment__name2">
                  <p class="chat-comment__name2__content">
                    ${message.content}
                  </p>
                <img src=${message.image} class="input-box__image" >
                </div>`
              

        } else if (message.content) {
          var html =
           `<div class="message" data-message-id=${message.id}> 
           </div>
              <div class="chat-comment">
                <div class="chat-comment__name">
                 <div class="group-name1">
                  ${message.user_name}
                </div>
                <div class="group-time1">
                    ${message.created_at}
                </div>
              </div>
              <div class="chat-comment__name2">
                <p class="chat-comment__name2__content">
                   ${message.content}
                </p> 
              </div> `

        } else if (message.image) {
          var html =
          `<div class="message" data-message-id= ${message.id}> 
           </div>
             <div class="chat-comment">
               <div class="chat-comment__name">
                 <div class="group-name1">
                   ${message.user_name} 
                 </div>
                 <div class="group-time1">
                   ${message.created_at}
                 </div>
               </div>
                 <div class="chat-comment__name2">
                   <img src=${message.image} class="input-box__image"
               </div>`
              
        
      };
      return html;
    }


  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
   })
     .done(function(data){
       var html = buildHTML(data);
       $('.chat-comments').append(html);
       $('form')[0].reset(); 
      //  console.log($('.chat-comments')[0].scrollHeight);
       $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
       $('.contents__btn').prop('disabled', false);
     })
    .fail(function(){
        alert("メッセージ送信に失敗しました");
    })
    });
  
  
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages. length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
      });
        
     }
     $('.chat-comments').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
   };
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  };
})