/**
   * blur event handler
   */ 
  pwdCheck.onblur = function () {
    if (pwd1.value != pwdCheck.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pwd1.value = '';
      pwdCheck.value = '';
      pwd1.focus();
    }
  };
  

  var frm = document.querySelector("[name=memberEnrollFrm]");
// console.log(frm);

  /**
   * 폼 유효성 검사
   * 각 input태그값이 모두 유효할 때만 return true 하고, 폼이 제출된다.
   * return false하면 폼이 제출되지 않는다.
   */ 
  frm.onsubmit = function(){
    //1.id검사
    //문자열 길이는 length속성. 메소드아님.
    if(userID.value.length < 4){
      alert("아이디는 4글자 이상이어야 합니다.");
      userID.select();
      return false;//조기리턴 -> 폼제출방지
    }

    //2.이름 검사 
    if(/^[가-힣]{2,}$/.test(memberName.value) == false){
      alert("이름은 한글 2글자 이상이어야합니다.");
      memberName.select();
      return false;
    }

    //3.비밀번호 검사 : 4글자이상 && (pwd.value == pwdCheck.value)
    if(pwd.value.length < 4){
      alert("비밀번호는 4글자 이상이어야 합니다.");
      pwd.select();
      return false;
    }

    if(pwd.value != pwdCheck.value){
      alert("비밀번호가 일치하지 않습니다.");
      pwd.value = '';
      pwdCheck.value = '';
      pwd.focus();
      return false;
    }

    return true;
  };

  function saveGuestBook(){
    var guestBook = new GuestBook($(memberId).val(), $(memberName).val(), $(pwd).val());

    //기존데이터 가져오기. 존재하지 않을때만 새배열 생성
    var arr = JSON.parse(localStorage.getItem("arr"));
    if(arr == null) arr = [];
    arr.push(guestBook);
    console.log(arr);

    //배열로 저장
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem("arr", jsonStr);

    //초기화
    $(memberId).val('');
    $(memberName).val('');
    $(pwd).val('');
    $(pwdCheck).val('');
    
    //새로입력된 정보로 갱신
    //loadGuestBook();
  }

  function GuestBook(memberId, memberName, pwd){
    this.memberId = memberId;
    this.memberName = memberName;
    this.pwd = pwd;
    this.time = new Date().getTime();//unix second로 시간 관리
  }
  
  /**
   * 화면 최초로딩시, 방문자정보 새로 추가시 호출되어
   * 화면에 방명록정보를 표시한다.
   */ 
  function loadGuestBook(){
    var arr = JSON.parse(localStorage.getItem("arr"));
    var $guestBook = $(guestBook);//table태그

    //헤더부분 추가
    $guestBook.html("<tr><th>No</th><th>ID</th><th>이름</th><th>방문일시</th></tr>");

    //내용부분 추가
    if(arr == null){
      $guestBook.append("<tr><td colspan='4'>방문자가 없습니다.</td></tr>");    
    }
    else {
      loginValidation();
      //방명록 내림차순
      arr.reverse();
      $.each(arr, function(index, elem){
        var date = new Date(elem.time); //unix second -> date객체
        var tr = "<tr>";
        tr += "<td>" + (index + 1) + "</td>";
        tr += "<td>" + elem.memberId + "</td>";
        tr += "<td>" + elem.memberName/*.replaceAll("\n", "<br>")*/ + "</td>";
        tr += "<td>" + displayTime(date) + "</td>";
        tr += "</tr>";
        $guestBook.append(tr);
      });
    }
    $(userName).val('');
    $(pwd1).val('');
    // 전체삭제 위험함
    localStorage.clear();
  }


  function loginValidation(){

  }
  /**
   * 2021/01/28 11:50
   */ 
  function displayTime(date){
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() 
         + " " + date.getHours() + ":" + date.getMinutes();

  }