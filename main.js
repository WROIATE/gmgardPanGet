// ==UserScript==
// @name           GmgardPanGet
// @namespace      gmgard.com
// @version      0.1
// @description  gmgard pan tool
// @author       jarao
// @match        https://gmgard.com/*
// @match        https://pan.baidu.com/*
// @icon         https://www.google.com/s2/favicons?domain=gmgard.com
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

(function () {
    'use strict';
    let host = window.location.host
    console.log(host)
    switch (host) {
        case "gmgard.com":
            {
                let dlList = $("dl#dllist dd")
                for (let i = 0; i < dlList.length; i++) {
                    let panCode = $(dlList[i]).find("span.label-inverse").text()
                    $(dlList[i]).find("a").click(async function () {
                        let ori = $(this).attr("href")
                        if (ori.search("https://pan.baidu.com/s/") != -1) {
                            let key = "#" + ori.split("/s/")[1]
                            if (panCode != null) {
                                GM.setValue(key, panCode)
                                console.log(key, await GM.getValue(key))
                                window.open(ori + key, '_blank')
                            } else {
                                console.log("这个度盘貌似没有提取码~")
                            }
                        } else {
                            console.log("这个资源貌似没有标准度盘分享链接~")
                        }
                    })
                }
            }
        case "pan.baidu.com":
            {
                let key = location.hash
                console.log()
                GM.getValue(key).then(
                    (panCode) => {
                        if (panCode != null) {
                            $("input#accessCode").val(panCode)
                            console.log(key, panCode)
                            $("input#accessCode").submit()
                        }
                    }
                )
            }
    }
})();