"use strict";

var CDN_BASE = "https://cdn.jsdelivr.net/gh/greeniYT/y@main/apple-knight-mini-dungeon-funny/poki%20test%201/";

var loaders = {
    unity: "unity.js",
    "unity-2020": "unity-2020.js"
};

var root = CDN_BASE;

// Allow local override for development
if (0 <= window.location.href.indexOf("pokiForceLocalLoader")) {
    loaders.unity = "./unity.js";
    root = "/loaders";
}

if (!window.config) throw Error("window.config not found");

var loader = loaders[window.config.loader];
if (!loader) throw Error('Loader "' + window.config.loader + '" not found');

if (!window.config.unityWebglLoaderUrl) {
    window.config.unityWebglLoaderUrl = CDN_BASE + "UnityLoader.2019.2.js";
}

var sdkScript = document.createElement("script");
sdkScript.src = CDN_BASE + "poki-sdk.js";
sdkScript.onload = function() {
    var i = document.createElement("script");
    i.src = root + loader;
    document.body.appendChild(i);
};
document.body.appendChild(sdkScript);
