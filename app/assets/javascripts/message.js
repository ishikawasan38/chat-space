$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
            `<div class="chat-comment">
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
               </div> 
               <img src=${message.image} >
             </div>` 
          return html;    
        } else {
          var html =
            `<div class="chat-comment">
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
               </div> 
             </div>` 
          return html;
        };
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
      $('.chat-main__message-list').append(html);
      $('form')[0].reset(); 
      $('.chat-main__message-list').animate({ scrolltop: $('.chat-main__message-list')[0].scrollHeight});      
      $('.contents__btn').prop('disabled', false);
    })
    .fail(function(){
        alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $
      ('.contens__btn').prop('disabled', false);
    })
})
})