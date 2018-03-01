"use strict";

require("./videoInitPlugIns");

var videoInitPlug = function videoInitPlug() {
    try {
        videojs('video_res', {
            nativeControlsForTouch: false, autoHeight: true
        }).videoJsResolutionSwitcher();

        var myPlayer2 = videojs("video_res");
        $("#playVideo2").on("click", function () {

            myPlayer2.requestFullscreen();
            myPlayer2.play();
        });
    } catch (err) {}

    try {
        var isMobile = function isMobile() {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };

        (function (window, videojs) {
            var player = videojs('videojs-panorama-player', {
                controls: true,
                plugins: {
                    videoJsResolutionSwitcher: {
                        default: 'low',
                        dynamicLabel: false
                    }
                }
            }, function () {
                var player = this;
                var videoElement = document.querySelector(".player_wrapper");
                var width = videoElement.offsetWidth;
                var height = videoElement.offsetHeight;
                player.width(width), player.height(height);
                window.addEventListener("resize", function () {
                    var canvas = player.getChild('Canvas');
                    var width = videoElement.offsetWidth;
                    var height = videoElement.offsetHeight;
                    player.width(width), player.height(height);
                    if (canvas) canvas.handleResize();
                });

                player.on('resolutionchange', function () {
                    player.play();
                    var label = player.currentResolution().label;
                    var node = document.createElement("span");
                    node.innerHTML = "<span class='vjs-icon-hd'></span>";
                    if (label == "1080 HD") {
                        hd = true;

                        document.getElementsByClassName("player_container")[0].appendChild(node);
                    } else {
                        hd = false;
                        $(".vjs-icon-hd").remove();
                    }
                });
                if (window.innerHeight < window.innerWidth) {
                    player.requestFullscreen();
                }
            });

            player.panorama({
                autoMobileOrientation: true,
                clickAndDrag: true,
                clickToToggle: !isMobile(),
                initFov: 100,
                NoticeMessage: isMobile() ? "por favor mueva su dispositivo" : "utilice el cursor para arrastrar y soltar el video",
                callback: function callback() {
                    if (!isMobile()) player.play();
                }
            });

            function addNewButton(data) {

                var myPlayer = data.player,
                    controlBar,
                    newElement = document.createElement('div'),
                    newLink = document.createElement('a');

                newElement.id = data.id;
                newElement.className = 'downloadStyle vjs-control';

                newLink.innerHTML = "<i class='fa " + data.icon + " line-height' aria-hidden='true'></i>";
                newElement.appendChild(newLink);
                controlBar = document.getElementsByClassName('vjs-control-bar')[0];
                insertBeforeNode = document.getElementsByClassName('vjs-fullscreen-control')[0];
                controlBar.insertBefore(newElement, insertBeforeNode);

                return newElement;
            }
        })(window, window.videojs);

        var myPlayer = videojs("videojs-panorama-player");
        $("#playVideo").on("click", function () {

            myPlayer.requestFullscreen();
            myPlayer.play();
        });
    } catch (err) {}
};
videoInitPlug();


function vidCatego(id, validation, vidNames, poster, catego) {
    var clubName = poster.split("sites/").pop().split("/")[0];
    if (validation == "playVid") {
        if ($("#video_res").length) {
            videojs("video_res").dispose();
        }
        $(".tembVideoCat").remove();
        $(".imgItem").show();
        var vidArrNames = vidNames.split("^-^");
        for (var i = 0; i < vidArrNames.length; i++) {
            if (vidArrNames[i].indexOf("1080") > -1) {
                var vidSrc1080 = $("<source />", {
                    src: "/sites/\"" + clubName + "/Categories/" + catego + "/Content/" + vidArrNames[i] + ".mp4",
                    "label": "1080 HD",
                    "res": "1080",
                    "type": "video/mp4"
                });
            } else if (vidArrNames[i].indexOf("720") > -1) {
                var vidSrc720 = $("<source />", {
                    src: "/sites/\"" + clubName + "/Categories/" + catego + "/Content/" + vidArrNames[i] + ".mp4",
                    "label": "720p",
                    "res": "720",
                    "type": "video/mp4"
                });
            } else {
                var vidSrc = $("<source />", {
                    src: "/sites/\"" + clubName + "/Categories/" + catego + "/Content/" + vidArrNames[i] + ".mp4",
                    "label": "480p",
                    "res": "480",
                    "type": "video/mp4"
                });
            }
        }
        var vidContainer = $("<video />", {
            id: "video_res",
            addClass: "video-js vjs-default-skin videoCatego",
            "controls": "",
            "data-setup": "{}",
            "poster": poster,
            "crossorigin": "anonymous",
            append: [vidSrc1080, vidSrc720, vidSrc]
        });
        var divPlayerCont = $("<div />", {
            addClass: "player_container",
            append: [vidContainer]
        });
        var divVidCont = $("<div />", {
            addClass: "player_wrapper",
            append: [divPlayerCont]
        });
        var closePlayerIcon = $("<i />", {
            addClass: "fa fa-times-circle",
            "aria-hidden": "true"
        });
        var closePlayerWraper = $("<div />", {
            "onclick": "closePlayer();",
            addClass: "closePlayer",
            append: [closePlayerIcon]
        });
        var mainDiv = $("<div />", {
            addClass: "single_blog_post_img tembVideoCat",
            append: [divVidCont, closePlayerWraper],
            appendTo: "#vidItem-" + id
        });
        $(".imgItem." + id).hide();
        videoInitPlug();
    } else if (validation == "playSong") {
        if ($("#video_res").length) {
            videojs("video_res").dispose();
        }
        $(".tembVideoCat").remove();
        $(".imgItem").show();
        var songSrc = $("<source />", {
            src: "/sites/\"" + clubName + "/Categories/" + catego + "/Content/" + id + ".mp3",
            "type": "audio/mp3"
        });
        var songContainer = $("<video />", {
            id: "video_res",
            addClass: "video-js vjs-default-skin videoCatego",
            "controls": "",
            "data-setup": "{}",
            "poster": poster,
            "crossorigin": "anonymous",
            append: [songSrc]
        });
        var divPlayerSongCont = $("<div />", {
            addClass: "player_container",
            append: [songContainer]
        });
        var divSongCont = $("<div />", {
            addClass: "player_wrapper",
            append: [divPlayerSongCont]
        });
        var closePlayerIconSong = $("<i />", {
            addClass: "fa fa-times-circle",
            "aria-hidden": "true"
        });
        var closePlayerWraperSong = $("<div />", {
            "onclick": "closePlayer();",
            addClass: "closePlayer",
            append: [closePlayerIconSong]
        });
        var mainSongDiv = $("<div />", {
            addClass: "single_blog_post_img tembVideoCat",
            append: [divSongCont, closePlayerWraperSong],
            appendTo: "#vidItem-" + id
        });
        $(".imgItem." + id).hide();
        videoInitPlug();
    }
}
function closePlayer() {
    if ($("#video_res").length) {
        videojs("video_res").dispose();
    }
    $(".tembVideoCat").remove();
    $(".imgItem").show();
}