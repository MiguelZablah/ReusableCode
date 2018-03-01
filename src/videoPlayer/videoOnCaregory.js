import './videoInitPlugIns';

function videoP(id, validation, vidNames, poster, catego) {
    // Gets clubName
    var clubName = poster.split("sites/").pop().split("/")[0];
    if (validation == "playVid") {
        // Removes VideoJs
        if($("#video_res").length) {
            videojs("video_res").dispose();
        }
        // Remove previews div
        $(".tembVideoCat").remove();
        // Show preview for vid
        $(".imgItem").show();
        // Creates Array of the urls
        var vidArrNames = vidNames.split("^-^");
        // Cretes Html
        for (var i = 0; i < vidArrNames.length; i++) {
            if (vidArrNames[i].indexOf("1080") > -1) {
                var vidSrc1080 = $("<source />", {
                    src: `/sites/"${clubName}/Categories/${catego}/Content/${vidArrNames[i]}.mp4`,
                    "label": "1080 HD",
                    "res": "1080",
                    "type": "video/mp4"
                });
            } else if (vidArrNames[i].indexOf("720") > -1) {
                var vidSrc720 = $("<source />", {
                    src: `/sites/"${clubName}/Categories/${catego}/Content/${vidArrNames[i]}.mp4`,
                    "label": "720p",
                    "res": "720",
                    "type": "video/mp4"
                });
            } else {
                var vidSrc = $("<source />", {
                    src: `/sites/"${clubName}/Categories/${catego}/Content/${vidArrNames[i]}.mp4`,
                    "label": "480p",
                    "res": "480",
                    "type": "video/mp4"
                });
            }
        }
        var vidContainer = $("<video />", {
            id: "video_res",
            addClass: "video-js vjs-default-skin videoCatego",
            "controls":"",
            "data-setup":"{}",
            "poster": poster,
            "crossorigin": "anonymous",
            append: [vidSrc1080, vidSrc720, vidSrc]
        });
        var divPlayerCont = $("<div />", {
            addClass: "player_container",
            append: [vidContainer],
        });
        var divVidCont = $("<div />", {
            addClass: "player_wrapper",
            append: [divPlayerCont],
        });
        var closePlayerIcon = $("<i />", {
            addClass: "fa fa-times-circle",
            "aria-hidden": "true",
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
        // Hide preview for vid
        $(".imgItem." + id).hide();
        // Init videoJS PlugIn
        videoInitPlug();
    }else if(validation == "playSong"){
        // Removes VideoJs
        if($("#video_res").length) {
            videojs("video_res").dispose();
        }
        // Remove previews div
        $(".tembVideoCat").remove();
        // Show preview for vid
        $(".imgItem").show();
        // Cretes Html
        var songSrc = $("<source />", {
            src: `/sites/"${clubName}/Categories/${catego}/Content/${id}.mp3`,
            "type": "audio/mp3"
        });
        var songContainer = $("<video />", {
            id: "video_res",
            addClass: "video-js vjs-default-skin videoCatego",
            "controls":"",
            "data-setup":"{}",
            "poster": poster,
            "crossorigin": "anonymous",
            append: [songSrc]
        });
        var divPlayerSongCont = $("<div />", {
            addClass: "player_container",
            append: [songContainer],
        });
        var divSongCont = $("<div />", {
            addClass: "player_wrapper",
            append: [divPlayerSongCont],
        });
        var closePlayerIconSong = $("<i />", {
            addClass: "fa fa-times-circle",
            "aria-hidden": "true",
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
        // Hide preview for vid
        $(".imgItem." + id).hide();
        // Init videoJS PlugIn
        videoInitPlug();
    }
}
// For use in html btn
function closePlayer() {
    // Removes VideoJs
    if($("#video_res").length) {
        videojs("video_res").dispose();
    }
    // Remove previews div
    $(".tembVideoCat").remove();
    // Show preview for vid
    $(".imgItem").show();
}