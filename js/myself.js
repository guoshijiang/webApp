/**
 * Created by Administrator on 2016/9/4.
 */

//自己写特效，左侧点爱心
    function addClass(){
       /* var dianzan = document.querySelector("#dianzhan");
        var fl = true;
        dianzan.addEventListener("touchstart",onAddLike,false)*/
    }
    addClass();
    /*右点赞按钮*/
    function dianzhanPim (){
        var addzhan = document.querySelector("#szZan");
        var mydianzhanB = document.querySelector("#mydianzhanB");
        var close = document.querySelector(".mydianzhanClose");
        //获得音乐播放的按钮
        var music = document.querySelector(".music-icon");
        var globalA = document.querySelector("#globalAudioPlayer");
        //留言按钮dom
        var qiandao = document.querySelector("#qiandao");
        var message = document.querySelector("#message");
        var closeMesaage = document.querySelector(".closeMesaage");
        var tt = document.getElementById("hopewords");
        tt.innerText = "请输入祝福的话语";
        tt.onfocus = function(){
            if(tt.innerText == "请输入祝福的话语"){
                tt.innerText='';
            }
        }
        tt.onblur = function(){
            if(tt.innerText == ""){
                tt.innerText='请输入祝福的话语';
            }
        }
        var name = document.getElementById("peopleName");

        //控制音乐的播放按钮
        music.addEventListener("touchstart",function(){
            if(globalA.paused){globalA.play();
    //    $("#audioBtn").removeClass("pause").addClass("play");
            }else{globalA.pause();
    //    $("#audioBtn").removeClass("play").addClass("pause");
            }
        },false)
        
        /*点赞按钮显示提示图片*/
        addzhan.addEventListener("touchstart",function(){
            mydianzhanB.className = "";
        },false)
        
        addzhan.addEventListener("touchstart",onAddLike,false)
        
        close.addEventListener("touchstart",function(){
            mydianzhanB.className = "none";
        },false)

        /*签到按钮*/
        qiandao.addEventListener("touchstart",function(){
            message.className = "message";
        },false)

        closeMesaage.addEventListener("touchstart",function(){
            var nam = name.value;
            tt.innerText = "请输入祝福的话语";
            if(nam){
                name.value = "";
            }
            message.className = "message none";
        },false)

        //视频播放****************************************
        var videof = document.querySelector(".videof");
        var videClose = document.querySelector(".u-maskLayer-close");
        var shipin = document.querySelector("#maskgloab-video");
        var shipinSrc = document.querySelector("#video-sz");
        shipinSrc.pause();

        videof.addEventListener("touchstart",function(){
            shipin.className = "u-maskLayer z-show ";
            globalA.pause();
            if (shipinSrc.paused){
                shipinSrc.play();
            }

        },false)
        videClose.addEventListener("touchstart",function(){
            shipin.className = "u-maskLayer z-show none";
            shipinSrc.pause();
            restart();
            globalA.play();

        },false)

    //    点击图片按钮
        var szMap = document.querySelector("#szMap");
        var mymap = document.querySelector("#mymap");
        var closeMap = document.querySelector(".closeMap");
        szMap.addEventListener("touchstart",function(){
            mymap.className = "mymap";
        },false)
        closeMap.addEventListener("touchstart",function(){
            mymap.className = "mymap none";
        },false)
    };

    dianzhanPim();
	function restart() {
	        var video = document.querySelector("#video-sz");
	        video.currentTime = 0;
	    }

    // 后台留言数据库
    var tx = document.getElementById("mymessages");

    var txx = document.getElementById("dianzhan");

    var dinum = document.getElementById("dinum");
    
    var asks = document.querySelector("#asks");
    
    function onValue() {
        var url = "野狗数据库url";
        var ref = new Wilddog(url);
        ref.on("value",function(snapshot){
        var i=1;
		snapshot.forEach(function(snap){
		if(snap.val().msg!="")
		 	var msg = "";
		 	var context = ""
		 	i++;
		 	//创建标签并添加内容
			var li = document.createElement("li");
			if(i%2==0){
				li.setAttribute("class","mymessagec0");
			}else{
				li.setAttribute("class","mymessagec1");
			}
			var div1 = document.createElement("div");
			var div2 = document.createElement("div");
			//添加名字
            if(!snap.val().nam){
                return false;
            }
			msg ="姓名："+ snap.val().nam + " new "+"("+snap.val().tim+")";
			var txt = document.createTextNode(msg);
			div1.appendChild(txt);
			li.appendChild(div1);
			
			//添加留言
			context = "祝福：" +snap.val().msg;
			var txts = document.createTextNode(context);
			div2.appendChild(txts);
			li.appendChild(div2);
			$(tx).prepend(li);
		});
	});
		//涮新点赞数据
        var urll = "野狗数据库url";
        var reff = new Wilddog(urll);
        reff.on("value",function(snapshot){
            var ms = "";
            ms =  snapshot.val().like + "\r\n" ;//从数据库活获得的数据
            //前面是点赞数量， 后面是查看的数量。实时更新的。别的地方更新，这边会同步
            //赋到对应的控件上即可
           /* txx.innerHTML = "";*/
            txx.innerHTML = ms ;
            dinum.innerHTML = ms;
            sza=ms;//将在数据库获得数据赋给一个全变量
        });
        
		//刷新查看区
		reff.on("value",function(snapshot){
            var mss = "";
            mss =  snapshot.val().look + "\r\n" ;//从数据库活获得的数据
            //前面是点赞数量， 后面是查看的数量。实时更新的。别的地方更新，这边会同步
            //赋到对应的控件上即可
           /* txx.innerHTML = "";*/
            asks.innerHTML = mss ;
            window.localStorage.szcha=mss;//将在数据库获得数据赋给一个本地一个变量缓存下来
        });
        //加载刷新纪录数
        onAddLook();
    }
   var getTimeNow = function (date){
           var time = date;
           var h = time.getHours();
           var mm = time.getMonth()+1;
           if(mm<10){
               mm="0"+mm;
           }
           var dd = time.getDate();
           if(dd<10){
               dd="0"+dd;
           }
           if(h<10){
               h="0"+h;
           }
           var m =time.getMinutes();
           if(m<10){
               m="0"+m;
           }
           var timeStr = mm+"-"+dd+" "+h+":"+m;
            return timeStr;
      }
    
   	function onAdd() {
    	
        var nam = document.getElementById("peopleName").value;
        var num  = document.getElementById("peopleNum").value;
        var tim;
        /*    var tel  = document.getElementById("tel").value;*/
        var msg  = document.getElementById("hopewords").innerText;
        if(msg==""){
            msg = " ";
        }
        var url = "<!--野狗数据库url：https://wedding1002.wilddogio.com-->";
        var ref = new Wilddog(url);
        var times = getTimeNow(new Date());
        tim = times;
        if(nam != ""){
            ref.push({"nam":nam,
                "num":num ,
                "msg":msg,
                "tim":tim
            })
            document.getElementById("peopleName").value = "";
        }  else{
            alert("姓名不能为空");
        }

    }

    //点赞按钮累加
    //从页面上获取，tx上，对应点赞数量上的控件
    var dianzan = document.querySelector("#dianzhan");
    var fl = true;
    function onAddLike() {
        var ms ;
        var url = "野狗数据库url";
        var ref = new Wilddog(url);
        if(!fl){
            return;
        }
        sza = parseInt(sza) +parseInt(1);
        ref.update({"like":sza});
        ms = sza;
        txx.innerHTML = ms ;
        dinum.innerHTML = ms;
        dianzan.className = "hasAdded";
        fl = false;
    }

	//记录打开的次数
    function onAddLook() {
    	var mss;
        var url = "野狗数据库url";
        var ref = new Wilddog(url);
     	/*var szCha = 0 ;//从页面上获取，tx上，对应查看数量的控件*/
    	var szcha = window.localStorage.szcha;
        szcha = parseInt(szcha) + parseInt(1);
        ref.update({"look":szcha});
       	/* msg = a.toString();*/
      	mss = szcha;
        asks.innerHTML = mss ;
    }
// 滑动部分；
function hua(){

    var oll = document.getElementById("mymessages");
    var box = document.querySelector("#commentDialogWarp");
    var start,move=0,sum=0;

    oll.addEventListener("touchstart",function(e){
        var touch = e.touches[0];
        start = touch.pageY;
        console.log(e)

    },false)

    oll.addEventListener("touchmove",function(e){
        var touch = e.touches[0];
        move = start-touch.pageY+sum;

        var conHeg = parseInt(oll.offsetHeight);
        console.log(conHeg)
        var boxH= parseInt(box.offsetHeight);
        if(move<= 0 ){
            move = -15;
            oll.style.transform = "translateY("+ -move +"px)";
            return;
        }else if(parseInt(conHeg-move)-boxH<0){
            move = conHeg - boxH +15;
            oll.style.transform = "translateY("+ -move +"px)";
            return false;

        }
        console.log(move);

        oll.style.transform = "translateY("+ -move +"px)";
    },false)

    oll.addEventListener("touchend",function(e){
        if(move-sum == 0){
            return false;
        }
        sum = 0 +move;
        console.log("现在是"+sum)
    },false)
}
hua();
