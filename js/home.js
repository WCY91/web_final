/*生成6位隨機數*/

$(document).ready(function() {
  // ...

  $.ajax({
    type: 'GET',
    url: 'https://3.27.142.83/getAll',
    beforeSend: function() {
      showLoader();
    },
    success: function(allRoom) {
      console.log(allRoom);
      $("#result").html("");
      $.each(allRoom.allRoom, function(index, room) {
        MakeRoomCard(index,  room);
      });
    },
    complete: function() {
      
      hideLoader();
    }
  });

});

function showLoader() {
  $("#loader").show();
}

function hideLoader() {
  $("#loader").hide();
}
function MakeRoomCard(index, room) {
  console.log(room);

  let mapURL = "https://www.google.com.tw/maps/place/" + room.address;
  let collapseURL = "#collapse" + index;

  let carousel = ''; 

  if (room.img_list && room.img_list.length > 0) {
   
    let carouselInner = '';
    room.img_list.forEach((img, i) => {
      carouselInner += `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img src="${img}" class="d-block w-100" style="max-height: 250px;" alt="Image ${i + 1}">
        </div>
      `;
    });

    carousel = `
      <div id="carousel${index}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${carouselInner}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${index}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel${index}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }

  let card1 = `
    <div class="card container">
      ${carousel}
      <div class="card-body">
        <div class="row py-2">
          <h3 class="card-title text-dark">${room.name}</h3>
        </div>
        <span id="count" style="display:none">${room.money}</span>
        <div class="row">
          <span class="col-9">
            地區:${room.zone}</br>
          </span>
          <a href=${mapURL} class="btn btn-info btn-sm col-3">
            地址
          </a>
        </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <button class="btn btn-warning col-9" data-bs-toggle="collapse" href="${collapseURL}">
            詳細資訊
          </button>
          <button id="heart" style="text-align: center" class="col-3 pt-2 fs-4">
            ❤
          </button>
        </div>
      </div>
    </div>
  `;

  let card2 = `
    <div class="collapse" id="collapse${index}">
      <div class="card">
        <div class="card-body">
          <p>
            價錢: ${room.money}
            房型: ${room.type}
            格局: ${room.roomType}
            坪數: ${room.area}
          </p>
        </div>
        <div class="card-footer">
          <div class="row">
            <span class="col-4 ps-3 fs-4">留下評價:</span>
            <div class="offset-3 col-4">
              <div class="input-group">
                <select class="form-select" id="evaluation" onchange="selectOnchange_evaluation(this)">
                  <option value="1"> 1 ⭐</option>
                  <option value="2"> 2 ⭐</option>
                  <option value="3"> 3 ⭐</option>
                  <option value="4"> 4 ⭐</option>
                  <option value="5"> 5 ⭐</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  let finalcard = $("<div></div>").addClass("col-md-12 col-lg-4 py-5").attr("id", "showcards");
  finalcard.append(card1, card2);

  $("#result").append(finalcard);
}


function selectOnchange_evaluation(selectRate)
{
    // if(selectPriceFnc.selectedIndex==0)
    // {
    //     PriceFrom="0";
    //     PriceTo="100";
    // }
    // else if(selectPriceFnc.selectedIndex==4)
    // {
    //     PriceFrom="1000";
    //     PriceTo="1000+";
    // }
    // else
    // {
    //     PriceFrom=selectPriceFnc.options[(selectPriceFnc.selectedIndex-1)].value;
    //     PriceTo=selectPriceFnc.options[selectPriceFnc.selectedIndex].value;
    // }
}