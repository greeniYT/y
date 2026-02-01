 
       function UnityProgress(gameInstance, progress) {
		  if (!gameInstance.Module) {
			 return;
		  } else if (progress === "complete") {
			 document.getElementById("logo").style.display = "none";
			 document.getElementById("FullscreenImg").style.display = "block";
			  document.getElementById("sitelogo").style.display = "block";
			return;
		  } else if (progress == 1) {
			document.getElementById("loadinginfo").innerHTML = "PROCESSING...";
		  } else if (progress > 0) {
			document.getElementById("loadinginfo").innerHTML = "Loading: " + Math.round(progress * 100) + "%";
			 document.getElementById("sitelogo").style.display = "none";
		  }
    }
    var gameInstance = UnityLoader.instantiate("gameContainer", "Build/Smash-Hit-11-23-7-GD.json", {
      onProgress: UnityProgress,
      Module: {
        onRuntimeInitialized: function() { UnityProgress(gameInstance, "complete") }
      }
    });
      
      function FitScreen(){
       var w=800;
       var h=550;
       var availWidth=window.innerWidth;
       var availHeight=window.innerHeight-40;
	   
       var canvas = document.getElementById("#canvas");
       if(availWidth/availHeight>w/h){
         height = availHeight;
         width = (height*w/h);
      }else{
         width = availWidth;
         height = width*h/w;
      }
      canvas.width = width;
      canvas.height = height;
       document.getElementById("container").style.width=width + "px";
       document.getElementById("container").style.height=(height + 40) + "px";
       document.getElementById("gameContainer").style.width=width + "px";
       document.getElementById("gameContainer").style.height=height + "px";
	  
       if(width/height>4/3){
           document.getElementById("logo").style.height=Math.round(height*0.6) + "px";  
           document.getElementById("logo").style.width=Math.round(height*0.6*4/3) + "px";
       }else{
           document.getElementById("logo").style.width=Math.round(width*0.8) + "px";
           document.getElementById("logo").style.height=Math.round(width*0.8*3/4) + "px";
       }
	   
    }
      


		gamesBest = Games;
		linkBest = CreateLinksInGame;
	


		gamesCar = Games;
		linkCar = CreateLinksInGame;
	

 
	function openWindow(Screen,Button,NameId,website)
    {        
       document.onmouseup = function()
        {
		    switch(website.trim().toLowerCase()){
				case "bestgames":
					GameId = GetGameIdByNameId(NameId,gamesBest);
					linkBest("Smash Hit",Screen,Button,GameId);
					break;
				case "cargames":
					GameId = GetGameIdByNameId(NameId,gamesCar);
					linkCar("Smash Hit",Screen,Button,GameId);
					break;
				default:
					console.log(website+" is error");
			}
			document.onmouseup = null;
        }
	}
	//随机一个nameId
	function GetNameIdByRandom(len,website){
		var gamesArr;
		switch(website.trim().toLowerCase()){
			case "bestgames":
				 gamesArr = gamesBest;
				break;
			case "cargames":
				 gamesArr = gamesCar;
				break;
			default:
				console.log(website+" is error");
			}
		var nameIdArray = new Array();
		var separator = ',';
		for(var i = 0;i<len;i++){
			var randomIndex;
			var nameId;
			do{
				 randomIndex = Math.floor(Math.random()*(gamesArr.length));
				 nameId = gamesArr[randomIndex]['nameid'];
			}while(nameIdArray.includes(nameId)&&len<=gamesArr.length);
			nameIdArray[i] = nameId;
		}
		nameIdArray[len] = website;
		var nameIds = nameIdArray.join(separator);
		console.log(nameIds);
	    gameInstance.SendMessage("WWWLoader","CallGetNameIds",nameIds);
	}
	//通过NameId获取GameId
	function GetGameIdByNameId(NameId,Games){
		for (i=0;i<Games.length;i++){
			if(Games[i]['nameid'] == NameId){
				return Games[i]['id'];
			}
		}
		console.log("ShowGames.js not exist ",NameId," correspond to vaule");
		return "";
	}
	//直接根据网址打开网页
	function openWindowByUrl(Url)
    {        
	 var url = encodeURI(Url);
       document.onmouseup = function()
        {
            window.open(url);
			document.onmouseup = null;
        }
	}
	  