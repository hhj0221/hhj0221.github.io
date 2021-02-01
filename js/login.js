function checks(){ 
    var hobbyCheck = false;
    var getMail = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/); 
   var getCheck = RegExp(/^[a-zA-Z0-9]{4,12}$/); 
   var getName = RegExp(/^[가-힣]{2,}$/); 
   var fmt = RegExp(/^\d{6}[1234]\d{6}$/); //형식 설정 
   var buf = new Array(13); //주민등록번호 배열 
   //아이디 공백 확인 
   if($("#userID").val() == ""){
    alert("아이디 입력바람"); 
   $("#userID").focus(); return false; } //아이디 유효성검사 
   if(!getCheck.test($("#userID").val())){ 
       alert("형식에 맞게 입력해주세요");
    $("#userID").val(""); $("#userID").focus(); 
   
    return false; } 
    //비밀번호 공백 확인 
   if($("#password").val() == ""){ 
   alert("패스워드 입력바람");
    $("#password").focus();
    return false; } 
    
    //아이디 비밀번호 같음 확인 
   
   if($("#userID").val() == $("#password").val()){ 
   alert("아이디와 비밀번호가 같습니다");
    $("#password").val(""); $("#password").focus();
     return false; }
      //비밀번호 유효성검사 
   
   if(!getCheck.test($("#password").val())){
   alert("형식에 맞게 입력해주세요"); 
   $("#password").val("");
   $("#password").focus(); 
   return false; } 
   //비밀번호 확인란 공백 확인
   
   if($("#password_check").val() == "")
   { alert("패스워드 확인란을 입력해주세요");
   
    $("#password_check").focus(); return false; } 
    //비밀번호 서로확인 
    if($("#password").val() != $("#password_check").val()){ 
        alert("비밀번호가 상이합니다");
     $("#password").val(""); 
     $("#password_check").val("");
     $("#password").focus(); 
     return false; } 
     //이메일 공백 확인 
   
    if($("#userEmail").val() == ""){ 
        alert("이메일을 입력해주세요");
     $("#userEmail").focus(); return false; }
     //이메일 유효성 검사 
   
    if(!getMail.test($("#userEmail").val())){
    alert("이메일형식에 맞게 입력해주세요") 
    $("#userEmail").val(""); 
    $("#userEmail").focus();
     return false;
    }
     //이름 공백 검사 
    if($("#userName").val() == ""){ 
    alert("이름을 입력해주세요"); 
    $("#userName").focus(); 
    return false;
    } 
    //이름 유효성 검사
   
    if(!getName.test($("#userName").val())){ 
       alert("이름형식에 맞게 입력해주세요")
    $("#userName").val("");
    $("#userName").focus();
      return false;
    } 
      
    if(($("#id_num").val() == "") || ($("#id_num_back").val() == ""))
    { alert("주민등록번호를 입력해주세요"); 
    $("#id_num").focus();
     return false; }
     if(check_jumin() ==false){ 
         return false; } 
         //취미 유효성 검사
      for(var i=0;i<$('[userName="hobby[]"]').length;i++){
           if($('input:checkbox[userName="hobby[]"]').eq(i).is(":checked") == true) 
           { hobbyCheck = true; break; } } 
      if(!hobbyCheck){ alert("하나이상 관심분야를 체크해 주세요");
       return false; } 
     alert("자기소개를 입력해주세요")
      $("#intro").val(""); 
      $("#intro").focus(); return fals  //자기소개란 공백 검사 
      if($("#intro").val() == ""){ e; } return true; } 
      function check_jumin(){ var jumins3 = $("#id_num").val() + $("#id_num_back").val();
       //주민등록번호 생년월일 전달 
      var fmt = RegExp(/^\d{6}[1234]\d{6}$/) 
      //포멧 설정 var buf = new Array(13); 
      //주민번호 유효성 검사 
      if (!fmt.test(jumins3)) { 
          alert("주민등록번호 형식에 맞게 입력해주세요");
           $("#id_num").focus(); return false; } 
           //주민번호 존재 검사 
      for (var i = 0; i < buf.length; i++){ buf[i] = parseInt(jumins3.charAt(i)); } 
      var multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
      // 밑에 더해주는 12자리 숫자들
       var sum = 0; for (var i = 0; i < 12; i++){ sum += (buf[i] *= multipliers[i]);
           // 배열끼리12번 돌면서 
       } if ((11 - (sum % 11)) % 10 != buf[12]) {
            alert("잘못된 주민등록번호 입니다."); $
            ("#id_num").focus(); return false; } 
       var birthYear = (jumins3.charAt(6) <= "2") ? "19" : "20"; 
       birthYear += $("#id_num").val().substr(0, 2); 
       var birthMonth = $("#id_num").val().substr(2, 2);
        var birthDate = $("#id_num").val().substr(4, 2);
        var birth = new Date(birthYear, birthMonth, birthDate);
         $("#year").val(birthYear); 
         $("#month").val(birthMonth);
          $("#date").val(birthDate); 
       } 

       function saveGuestBook(){
        var guestBook = new GuestBook($(userName).val(), $(userEmail).val(),$(userID).val());
        console.log(guestBook);
    
        //기존데이터 가져오기. 존재하지 않을때만 새배열 생성
        var arr = JSON.parse(localStorage.getItem("arr"));
        if(arr == null) arr = [];
        arr.push(guestBook);
        console.log(arr);
    
        //배열로 저장
        var jsonStr = JSON.stringify(arr);
        localStorage.setItem("arr", jsonStr);
    
        //초기화
        $(userName).val('').focus();
        $(userEmail).val('').focus();
        $(userID).val('').focus();;
    
  
    
    
        //새로입력된 정보로 갱신
        loadGuestBook();
      }
    
      function GuestBook(name, email,id,number){
        this.name = name;
        this.email = email;
        this.id =id;
        this.number =number;
        this.time = new Date().getTime();//unix second로 시간 관리
      }
    
      /**
       * html DOM등록을 마치면(load), localStorage의 데이터를 읽어서 테이블로 출력
       */ 
      $(function(){
        //방문자 정보 화면 출력하기
        loadGuestBook();
      });
    
      /**
       * 화면 최초로딩시, 방문자정보 새로 추가시 호출되어
       * 화면에 방명록정보를 표시한다.
       */ 
      function loadGuestBook(){
        var arr = JSON.parse(localStorage.getItem("arr"));
        var $guestBook = $(guestBook);//table태그
    
        //헤더부분 추가
        $guestBook.html("<tr><th>No</th><th>NAME</th><th>EMAIL</th><th>ID</th><th>방문일시</th></tr>");
    
        //내용부분 추가
        if(arr == null){
          $guestBook.append("<tr><td colspan='6'>방문자가 없습니다.</td></tr>");
        }
        else {
          //방명록 내림차순
          arr.reverse();
          $.each(arr, function(index, elem){
            var date = new Date(elem.time); //unix second -> date객체
            var tr = "<tr>";
            tr += "<td>" + (index + 1) + "</td>";
            tr += "<td>" + elem.name + "</td>";
            tr += "<td>" + elem.email + "</td>";
            tr += "<td>" + elem.id + "</td>";
            tr += "<td>" + displayTime(date) + "</td>";
            tr += "</tr>";
            $guestBook.append(tr);
          });
        }
    
      }
    
      /**
       * 2021/01/28 11:50
       */ 
      function displayTime(date){
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() 
             + " " + date.getHours() + ":" + date.getMinutes();
    
      } 
