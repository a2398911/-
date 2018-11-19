let selectArea = document.getElementById('selectArea');
let infoItem = document.querySelector('.infoItem');
let contentTitle = document.querySelector('.content-title');
let pageNumber = document.querySelector('.pageNumber');
let hotAreaGroup = document.querySelector('.hotArea-group');

let xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);


xhr.onload = function () {
  if (xhr.status == 200){
    let data = JSON.parse(xhr.response).result.records;
    
    // select data
    let zoneArray = [];
    data.forEach(item => zoneArray.push(item.Zone));
    let newZone = zoneArray.filter((item,index,newItem) => newItem.indexOf(item) == index);
    console.log(zoneArray);

    let zoneStr = '<option value="" disabled selected>請選擇行政區</option><option value="全部行政區">全部行政區</option>';
    newZone.forEach(item => zoneStr += `<option value="${item}">${item}</option>`);
    selectArea.innerHTML = zoneStr;

    // allZone data
    allZoneArray= [];
    for(let i=0; i<data.length; i+=8){
      allZoneArray.push(data.slice(i,i+8));
    }
    console.log(allZoneArray)
    
    // set
    let nowPage = 0;
    let currentZone = 'allZoneZone';
    seletTemplate(allZoneArray[0]);
    pageNum(allZoneArray)
    
    // DataPage
    function DataPage(item,nweArray,zone){
      let nowArray = item.filter(arrayItem => arrayItem.Zone == zone);
      for(let i=0; i<nowArray.length; i+=8){
        nweArray.push(nowArray.slice(i,i+8));
      };
    }

    // seletTemplate
    function seletTemplate(currentZone){
      let currentZoneStr= '';
      currentZone.forEach(item => {
        contentTitle.textContent = item.Zone;
        currentZoneStr += `
        <li class="infoItem-box d-inline-block">
          <div class="infoItem-img" style="background-image: url('${item.Picture1}');">
            <div class="infoItem-text d-flex h-justify-content-between h-align-items-end">
              <h4 class="infoItem-title">${item.Name}</h4>
              <p class="infoItem-area">${item.Zone}</p>
            </div>
            <div class="infoItem-data d-flex h-flex-column h-justify-content-center">
              <p class="icon time">${item.Opentime}</p>
              <p class="icon address">${item.Add}</p>
              <p class="icon phone">${item.Tel}</p>
              <h4 class="freeVisit">${item.Ticketinfo}</h4>
            </div>
          </div>
        </li>
        `
      });
      infoItem.innerHTML = currentZoneStr;
    }

    // sanMinZone data
    sanMinZone = [];
    DataPage(data,sanMinZone,'三民區');
    //neiMenZone data
    neiMenZone = [];
    DataPage(data,neiMenZone,'內門區');
    //meiNong
    meiNongZone = [];
    DataPage(data,meiNongZone,'美濃區');
    //daShu
    daShuZone = [];
    DataPage(data,daShuZone,'大樹區');
    //xiaoGang
    xiaoGangZone = [];
    DataPage(data,xiaoGangZone,'小港區');
    //ltuGui
    ltuGuiZone = [];
    DataPage(data,ltuGuiZone,'六龜區');
    //renWu
    renWuZone = [];
    DataPage(data,renWuZone,'仁武區');
    //zuoYing
    zuoYingZone = [];
    DataPage(data,zuoYingZone,'左營區');
    //tianLiao
    tianLiaoZone = [];
    DataPage(data,tianLiaoZone,'田寮區');
    //yongAn
    yongAnZone = [];
    DataPage(data,yongAnZone,'永安區');
    //jiaXian
    jiaXianZone = [];
    DataPage(data,jiaXianZone,'甲仙區');
    //guShan
    guShanZone = [];
    DataPage(data,guShanZone,'鼓山區');
    //shaLin
    shaLinZone = [];
    DataPage(data,shaLinZone,'杉林區');
    //NaMaJia
    NaMaJiaZone = [];
    DataPage(data,NaMaJiaZone,'那瑪夏');
    //gangShan
    gangShanZone = [];
    DataPage(data,gangShanZone,'岡山區');
    //gaoXiong
    gaoXiongZone = [];
    DataPage(data,gaoXiongZone,'高雄市');
    //qianZhen
    qianZhenZone = [];
    DataPage(data,qianZhenZone,'前鎮區');
    //xinXing
    xinXingZone = [];
    DataPage(data,xinXingZone,'新興區');
    //lingYa
    lingYaZone = [];
    DataPage(data,lingYaZone,'苓雅區');
    //maoLin
    maoLinZone = [];
    DataPage(data,maoLinZone,'茂林區');
    //jiaDing
    jiaDingZone = [];
    DataPage(data,jiaDingZone,'茄萣區');
    //ziGuan
    ziGuanZone = [];
    DataPage(data,ziGuanZone,'梓官區');
    //qiJin
    qiJinZone = [];
    DataPage(data,qiJinZone,'旗津區');
    //taoYuan
    taoYuanZone = [];
    DataPage(data,taoYuanZone,'桃源區');
    console.log(taoYuanZone)
    //nanZi
    nanZiZone = [];
    DataPage(data,nanZiZone,'楠梓區');
    //qianJin
    qianJinZone = [];
    DataPage(data,qianJinZone,'前金區');
    //fengShan
    fengShanZone = [];
    DataPage(data,fengShanZone,'鳳山區');

    //currentSelect
    function currentSelect(currentSelectValue){
      switch (currentSelectValue) {
        case "全部行政區":
          currentZone = 'allZoneZone';
          pageNum(allZoneArray);
          seletTemplate(allZoneArray[0]);
          break;
        case "三民區":
          currentZone = 'sanMinZone';
          pageNum(sanMinZone);
          seletTemplate(sanMinZone[0]);
          break;
        case "內門區":
          currentZone = 'neiMenZone';
          pageNum(neiMenZone);
          seletTemplate(neiMenZone[0]);
          break;
        case "美濃區":
          currentZone = 'meiNongZone';
          pageNum(meiNongZone);
          seletTemplate(meiNongZone[0]);
          break;
        case "大樹區":
          currentZone = 'daShuZone';
          pageNum(daShuZone);
          seletTemplate(daShuZone[0]);
          break;
        case "小港區":
          currentZone = 'xiaoGangZone';
          pageNum(xiaoGangZone);
          seletTemplate(xiaoGangZone[0]);
          break;
        case "六龜區":
          currentZone = 'ltuGuiZone';
          pageNum(ltuGuiZone);
          seletTemplate(ltuGuiZone[0]);
          break;
        case "仁武區":
          currentZone = 'renWuZone';
          pageNum(renWuZone);
          seletTemplate(renWuZone[0]);
          break;
        case "左營區":
          currentZone = 'zuoYingZone';
          pageNum(zuoYingZone);
          seletTemplate(zuoYingZone[0]);
          break;
        case "田寮區":
          currentZone = 'tianLiaoZone';
          pageNum(tianLiaoZone);
          seletTemplate(tianLiaoZone[0]);
          break;
        case "永安區":
          currentZone = 'yongAnZone';
          pageNum(yongAnZone);
          seletTemplate(yongAnZone[0]);
          break;
        case "甲仙區":
          currentZone = 'jiaXianZone';
          pageNum(jiaXianZone);
          seletTemplate(jiaXianZone[0]);
          break;
        case "鼓山區":
          currentZone = 'guShanZone';
          pageNum(guShanZone);
          seletTemplate(guShanZone[0]);
          break;
        case "杉林區":
          currentZone = 'shaLinZone';
          pageNum(shaLinZone);
          seletTemplate(shaLinZone[0]);
          break;
        case "那瑪夏":
          currentZone = 'NaMaJiaZone';
          pageNum(NaMaJiaZone);
          seletTemplate(NaMaJiaZone[0]);
          break;
        case "岡山區":
          currentZone = 'gangShanZone';
          pageNum(gangShanZone);
          seletTemplate(gangShanZone[0]);
          break;
        case "高雄市":
          currentZone = 'gaoXiongZone';
          pageNum(gaoXiongZone);
          seletTemplate(gaoXiongZone[0]);
          break;
        case "前鎮區":
          currentZone = 'qianZhenZone';
          pageNum(qianZhenZone);
          seletTemplate(qianZhenZone[0]);
          break;
        case "新興區":
          currentZone = 'xinXingZone';
          pageNum(xinXingZone);
          seletTemplate(xinXingZone[0]);
          break;
        case "苓雅區":
          currentZone = 'lingYaZone';
          pageNum(lingYaZone);
          seletTemplate(lingYaZone[0]);
          break;
        case "茂林區":
          currentZone = 'maoLinZone';
          pageNum(maoLinZone);
          seletTemplate(maoLinZone[0]);
          break;
        case "茄萣區":
          currentZone = 'jiaDingZone';
          pageNum(jiaDingZone);
          seletTemplate(jiaDingZone[0]);
          break;
        case "梓官區":
          currentZone = 'ziGuanZone';
          pageNum(ziGuanZone);
          seletTemplate(ziGuanZone[0]);
          break;
        case "旗津區":
          currentZone = 'qiJinZone';
          pageNum(qiJinZone);
          seletTemplate(qiJinZone[0]);
          break;
        case "桃源區":
          currentZone = 'taoYuanZone';
          pageNum(taoYuanZone);
          seletTemplate(taoYuanZone[0]);
          break;
        case "楠梓區":
          currentZone = 'nanZiZone';
          pageNum(nanZiZone);
          seletTemplate(nanZiZone[0]);
          break;
        case "前金區":
          currentZone = 'qianJinZone';
          pageNum(qianJinZone);
          seletTemplate(qianJinZone[0]);
          break;
        case "鳳山區":
          currentZone = 'fengShanZone';
          pageNum(fengShanZone);
          seletTemplate(fengShanZone[0]);
          break;
      }
    }
    // changeSelet
    function changeSelet(){
      let currentSelectValue = selectArea.value;
      currentSelect(currentSelectValue);
    }

    //pageNum
    function pageNum(currentZone){
      let pageNumStr = '<a href="#" class="prev disabled">< prev</a>';
      let pageNextStr = '<a href="#" class="next">next ></a>';
      console.log(currentZone.length);
      for(let i=0; i<currentZone.length; i++) {
        pageNumStr += `
        <a href="#" class="page" data-pagenum=${i}>${i+1}</a>
        `
      }
      console.log(pageNumStr)
      pageNumber.innerHTML = pageNumStr + pageNextStr;

      nowPage= 0;
      pageRenew();
    }

    //prev and Next button
    function prevNext(nowPage,array){
      let prev = document.querySelector('.prev');
      let next = document.querySelector('.next');
      nowPage == 0 ? prev.className = 'prev disabled' : prev.className = 'prev';
      nowPage == array.length - 1 ? next.className = 'next disabled' : next.className = 'next';
    }
    

    //pageRenew
    function pageRenew(){
      let pageLinks = document.querySelectorAll('.page');
      pageLinks.forEach(item => item.className = 'page');
      pageLinks[nowPage].className = 'page current';
    }
    
    //nowPageUpdata
    function nowPageUpdata(nowPage){
      pageRenew();
      
      switch (currentZone) {
        case "allZoneZone":
          seletTemplate(allZoneArray[nowPage]);
          prevNext(nowPage,allZoneArray);
          break;
        case "sanMinZone":
          seletTemplate(sanMinZone[nowPage]);
          prevNext(nowPage,sanMinZone);
          break;
        case "neiMenZone":
          seletTemplate(neiMenZone[nowPage]);
          prevNext(nowPage,neiMenZone);
          break;
        case "meiNongZone":
          seletTemplate(meiNongZone[nowPage]);
          prevNext(nowPage,meiNongZone);
          break;
        case "daShuZone":
          seletTemplate(daShuZone[nowPage]);
          prevNext(nowPage,daShuZone);
          break;
        case "xiaoGangZone":
          seletTemplate(xiaoGangZone[nowPage]);
          prevNext(nowPage,xiaoGangZone);
          break;
        case "ltuGuiZone":
          seletTemplate(ltuGuiZone[nowPage]);
          prevNext(nowPage,ltuGuiZone);
          break;
        case "renWuZone":
          seletTemplate(renWuZone[nowPage]);
          prevNext(nowPage,renWuZone);
          break;
        case "zuoYingZone":
          seletTemplate(zuoYingZone[nowPage]);
          prevNext(nowPage,zuoYingZone);
          break;
        case "tianLiaoZone":
          seletTemplate(tianLiaoZone[nowPage]);
          prevNext(nowPage,tianLiaoZone);
          break;
        case "yongAnZone":
          seletTemplate(yongAnZone[nowPage]);
          prevNext(nowPage,yongAnZone);
          break;
        case "jiaXianZone":
          seletTemplate(jiaXianZone[nowPage]);
          prevNext(nowPage,jiaXianZone);
          break;
        case "guShanZone":
          seletTemplate(guShanZone[nowPage]);
          prevNext(nowPage,guShanZone);
          break;
        case "shaLinZone":
          seletTemplate(shaLinZone[nowPage]);
          prevNext(nowPage,shaLinZone);
          break;
        case "NaMaJiaZone":
          seletTemplate(NaMaJiaZone[nowPage]);
          prevNext(nowPage,NaMaJiaZone);
          break;
        case "gangShanZone":
          seletTemplate(gangShanZone[nowPage]);
          prevNext(nowPage,gangShanZone);
          break;
        case "gaoXiongZone":
          seletTemplate(gaoXiongZone[nowPage]);
          prevNext(nowPage,gaoXiongZone);
          break;
        case "qianZhenZone":
          seletTemplate(qianZhenZone[nowPage]);
          prevNext(nowPage,qianZhenZone);
          break;
        case "xinXingZone":
          seletTemplate(xinXingZone[nowPage]);
          prevNext(nowPage,xinXingZone);
          break;
        case "lingYaZone":
          seletTemplate(lingYaZone[nowPage]);
          prevNext(nowPage,lingYaZone);
          break;
        case "maoLinZone":
          seletTemplate(maoLinZone[nowPage]);
          prevNext(nowPage,maoLinZone);
          break;
        case "jiaDingZone":
          seletTemplate(jiaDingZone[nowPage]);
          prevNext(nowPage,jiaDingZone);
          break;
        case "ziGuanZone":
          seletTemplate(ziGuanZone[nowPage]);
          prevNext(nowPage,ziGuanZone);
          break;
        case "qiJinZone":
          seletTemplate(qiJinZone[nowPage]);
          prevNext(nowPage,qiJinZone);
          break;
        case "taoYuanZone":
          seletTemplate(taoYuanZone[nowPage]);
          prevNext(nowPage,taoYuanZone);
          break;
        case "nanZiZone":
          seletTemplate(nanZiZone[nowPage]);
          prevNext(nowPage,nanZiZone);
          break;
        case "qianJinZone":
          seletTemplate(qianJinZone[nowPage]);
          prevNext(nowPage,qianJinZone);
          break;
        case "fengShanZone":
          seletTemplate(fengShanZone[nowPage]);
          prevNext(nowPage,fengShanZone);
          break;
      };
    }

    // changePage
    function changePage(e){
      e.preventDefault();
      let current = e.target.className;
      
      if(current == 'page') {
        nowPage = e.target.dataset.pagenum;
        nowPageUpdata(nowPage);
      }else if(current == 'next') {
        nowPage++;
        nowPageUpdata(nowPage);
      }else if(current == 'prev') {
        nowPage--;
        nowPageUpdata(nowPage);
      };
    };

    // hotAreaBtn
    function hotAreaBtn(e){
      let btnColor = e.target.className;
      
      if(btnColor == 'purple'){
        currentSelect("苓雅區");
        selectArea.value = "苓雅區";
      }else if(btnColor == 'pink'){
        currentSelect("三民區");
        selectArea.value = "三民區";
      }else if(btnColor == 'yellow'){
        currentSelect("新興區");
        selectArea.value = "新興區";
      }else if(btnColor == 'blue'){
        currentSelect("美濃區");
        selectArea.value = "美濃區";
      }
    }

    selectArea.addEventListener('change',changeSelet);
    pageNumber.addEventListener('click',changePage);
    hotAreaGroup.addEventListener('click',hotAreaBtn);
  } 
}

