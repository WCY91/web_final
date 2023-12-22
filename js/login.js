/*生成6位隨機數*/

$(document).ready(function(){
   
    $('#LoginBtn').click(function(){
        var account = $('#loginAccount').val();
        var password = $('#loginPassword').val();    
      
        $.ajax({
            type: 'GET',
            url: '/php/select_account.php',
            data: 'account='+ account,
            success:function(msg){ 
                if(msg.length==0){
                    alert("輸入錯誤的帳號密碼");
                }
                else{
                    $.each(msg, function (i, user) {
                        if(user.Password==password){
                            localStorage.setItem("account",account);                            
                            localStorage.setItem("password",password);  
                            localStorage.setItem("status","1");                                              
                            alert("登入成功");                            
                        }
                        else{
                            alert("輸入錯誤的帳號密碼");
                        }
                        
                    });                    
                }
            }            
        });             
        
        if(localStorage.getItem("status")=="1"){
            console.log(document.getElementById('status'));
            document.getElementById('status').innerHTML=localStorage.getItem("account"); 
        }
    });   
    
});
