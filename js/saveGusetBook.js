function saveGuestBook(){
    var guestBook = new GuestBook($(userName).val(), $(userEmail).val(),$(userID).val(),$(userNumber).val());
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

    $(userNumber).val('').focus();;
 

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
    $guestBook.html("<tr><th>No</th><th>NAME</th><th>EMAIL</th><th>ID</th><th>NUMBER</th><th>방문일시</th></tr>");

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
        tr += "<td>" + elem.number + "</td>";
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