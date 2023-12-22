/*生成6位隨機數*/

$(document).ready(function(){

    $('#signUpbtn').click(function(){

        var account = $('#account').val();
        var password = $('#password').val();      
        
        var flag = 0;
        $.ajax({
            type: 'GET',
            url: '/php/select_account.php',
            data: 'account='+ account,
            success:function(msg){  
                console.log(msg);              
                if(msg.length==0){
                    console.log("null");
                    $.ajax({
                        url:'/php/insert_account.php',
                        method:'POST',
                        data:{
                            account:account,
                            password:password
                        },
                        success:function(res){
                            console.log(res);
                            alert("成功註冊!!!");
                        }
                    });
                }
                else{
                    alert("已有相同帳戶名的帳戶");
                }
            }
            
        })
        
        
    });
    

});
