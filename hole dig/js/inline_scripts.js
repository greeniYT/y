
    const overlayBackgroundColor = "";
    const progressBarFillColor = "";
    const progressBarBackgroundColor = "";
    const progressBarBorderColor = "";
    const backgroundFileName = "";
  

window.__GS_BOOT_CFG__={version: 0, sdkSrc: 'sdk-bundle/gamepush.gd.js'};


    const buildUrl = "Build";
    const loaderUrl = buildUrl + "/Digger.loader.js";
    const config = {
      dataUrl: buildUrl + "/Digger.data.unityweb",
      workerUrl: buildUrl + "/Digger.data.unityweb",
      frameworkUrl: buildUrl + "/Digger.framework.js.unityweb",
      codeUrl: buildUrl + "/Digger.wasm.unityweb",
      // #if MEMORY_FILENAME
      //   memoryUrl: buildUrl + "/",
      // #endif
      // #if SYMBOLS_FILENAME
      //   symbolsUrl: buildUrl + "/",
      // #endif
      streamingAssetsUrl: "StreamingAssets",
      companyName: "incrediGames",
      productName: "Dig a hole",
      productVersion: "0.1",
    };

    const container = document.querySelector("#unity-container");
    const canvas = document.querySelector("#unity-canvas");
    const loadingCover = document.querySelector("#loading-cover");
    const progressBarEmpty = document.querySelector("#unity-progress-bar-empty");
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    const spinner = document.querySelector('.spinner');

    if (overlayBackgroundColor !== " " && overlayBackgroundColor !== ""){
      canvas.style.background = overlayBackgroundColor;
    }

    if (progressBarFillColor !== " " && progressBarFillColor !== ""){
      progressBarFull.style.background = progressBarFillColor;
    }

    if (progressBarBackgroundColor !== " " && progressBarBackgroundColor !== ""){
      progressBarEmpty.style.background = progressBarBackgroundColor;
    }

    if (progressBarBorderColor !== " " && progressBarBorderColor !== ""){
      progressBarEmpty.style.border.color = progressBarBorderColor;
    }

    if (backgroundFileName !== " " && backgroundFileName !== ""){
      canvas.style.background = "url('" + backgroundFileName + "') center / cover";
    }

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
    }

    // #if BACKGROUND_FILENAME
    // canvas.style.background = "url('" + buildUrl + "/') center / cover";
    // #endif

    loadingCover.style.display = "";

        // Выключаем появление меню при правом клике мыши
        document.addEventListener('contextmenu', event => event.preventDefault());

        // Возвращаем фокус, если кликнули по экрану
        function FocusGame() {
            window.focus();
            canvas.focus();
        }

        window.addEventListener('pointerdown', () => {
            FocusGame();
        });
        window.addEventListener('touchstart', () => {
            FocusGame();
        });

    const unityLoader = document.createElement("script");
    unityLoader.src = loaderUrl;
    unityLoader.onload = async () => {
      createUnityInstance(canvas, config, (progress) => {
        spinner.style.display = "none";
        progressBarEmpty.style.display = "";
        progressBarFull.style.width = `${100 * progress}%`;
      }).then((unityInstance) => {
        window.unityInstance = unityInstance;
        loadingCover.style.display = "none";
      }).catch((message) => {
        alert(message);
      });
    };
    document.body.appendChild(unityLoader);

    document.addEventListener("pointerdown", () => {
      container.focus();
      window.focus();
      canvas.focus();
    });
	 if (!window.blurFocusHandlersInstalled) {
    window.addEventListener('blur', function() {
      let blockerButton = document.createElement('button');
      blockerButton.style.position = 'fixed';
      blockerButton.style.top = '0';
      blockerButton.style.left = '0';
      blockerButton.style.width = '100%';
      blockerButton.style.height = '100%';
      blockerButton.style.zIndex = '9999';
      blockerButton.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      blockerButton.style.border = 'none';
      blockerButton.style.cursor = 'default';
      document.body.appendChild(blockerButton);

      function removeBlocker() {
        if (blockerButton && blockerButton.parentNode) {
          blockerButton.parentNode.removeChild(blockerButton);
        }
        window.removeEventListener('focus', removeBlocker);
      }
      window.addEventListener('focus', removeBlocker);
    });
    window.blurFocusHandlersInstalled = true;
  }
  