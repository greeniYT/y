 
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
    var gameInstance = UnityLoader.instantiate("gameContainer", "Build/Smash-Hit.json", {
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
      