<!DOCTYPE html>
<html>
    <head>
        <title>4 COLORS</title>
        <link rel="stylesheet" href="page/four_colors6/css/reset.css" type="text/css">
        <link rel="stylesheet" href="page/four_colors6/css/main.css" type="text/css">
        <link rel="stylesheet" href="page/four_colors6/css/orientation_utils.css" type="text/css">
        <link rel="stylesheet" href="page/four_colors6/css/ios_fullscreen.css" type="text/css">
        <link rel='shortcut icon' type='image/x-icon' href='./favicon.ico' />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
	<meta name="msapplication-tap-highlight" content="no"/>

        <script type="text/javascript" src ="page/four_colors6/js/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/createjs.min.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/platform.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/ios_fullscreen.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/screenfull.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/howler.min.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/ctl_utils.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/sprite_lib.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/settings.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CLang.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CPreloader.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CMain.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CTextButton.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CToggle.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CGfxButton.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CPanelTutorial.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CTurnManager.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CAnimation.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CMenu.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CSelectPlayers.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CCard.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CDeckDisplayer.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CHandDisplayer.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CGame.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CInterface.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CCreditsPanel.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CSelectColorPanel.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CAreYouSurePanel.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CEndPanel.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/CCTLText.js"></script>
        <script type="text/javascript" src ="page/four_colors6/js/sprintf.js"></script>
    </head>
    <body ondragstart="return false;" ondrop="return false;" >
	<div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
          <script>
            $(document).ready(function(){
                     var oMain = new CMain({
                                            starting_num_cards: 7,
                                            fullscreen: false,
                                            check_orientation: false,
                                            audio_enable_on_startup: true
                                            
                                           });
                                           
                    
                    $(oMain).on("select_players", function(evt,iNumPlayers){
                        //...ADD YOUR CODE HERE EVENTUALLY
                    });
        
                    $(oMain).on("start_session", function(evt) {
                            if(getParamValue('ctl-arcade') === "true"){
                                parent.__ctlArcadeStartSession();
                            }
                            //...ADD YOUR CODE HERE EVENTUALLY
                    }); 
                     
                    $(oMain).on("end_session", function(evt) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeEndSession();
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("save_score", function(evt,iScore, szMode) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeSaveScore({score:iScore, mode: szMode});
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("show_interlevel_ad", function(evt) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeShowInterlevelAD();
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });
                    
                    $(oMain).on("share_event", function(evt, iScore) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeShareEvent({   img: TEXT_SHARE_IMAGE,
                                                                title: TEXT_SHARE_TITLE,
                                                                msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
                                                                msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1});
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });
					 
                    if(isIOS()){ 
                        setTimeout(function(){sizeHandler();},200); 
                    }else{ sizeHandler(); } 
                                         
           });

        </script>
        <div class="check-fonts">
            <p class="check-font-1">test 1</p>
        </div> 
        
        <canvas id="canvas" class='ani_hack' width="1920" height="1080"> </canvas>
        <div data-orientation="landscape" class="orientation-msg-container"><p class="orientation-msg-text">Please rotate your device</p></div>
        <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

    <script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"version":"2024.11.0","token":"be16a1d157e744d4a0ba042ab5b205ee","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
</body>
</html>
