/**
 * 歌名，歌手
 */
setInterval(function() {
    if ($('#player source:first-child').length > 0) {
        var song = $('#player source:first-child').attr('src').split('\/')[1];
        var title = song.split('-')[1].replace(/\s/, "").split('.')[0];
        var singer = song.split('-')[0].replace(/\s/, "")
        $('.title').text(title);
        $('.singer').text(singer);
    } else {
        $('.title').text("没有歌曲了");
        $('.singer').text("");
    }
}, 50);
/**
 * 收藏
 */
var i = 0;
var player = document.getElementById('player');
$('.glyphicon-heart-empty').click(function() {
    if (i % 2 == 0) {
        $(this).attr('class', 'glyphicon glyphicon-heart');
        i++;
    } else {
        $(this).attr('class', 'glyphicon glyphicon-heart-empty');
        i++;
    }
})

/**
 * 暂停功能
 */
$('.glyphicon-play').click(function() {
    if (i % 2 == 0) {
        $(this).attr('class', 'glyphicon glyphicon-pause');
        player.play();
        $(".img-circle").css("animation-name", "rot");
        i++;
    } else {
        $(this).attr('class', 'glyphicon glyphicon-play');
        player.pause();
        $(".img-circle").css("animation-name", "none");
        i++;
    }
})
/**
 * 歌曲剩余时长显示及时间轴
 */

$('#player').on('timeupdate', function() {
    var time = (player.currentTime - player.duration) / 60;
    if (player.currentTime > 0) {
        $('.time').text(time.toFixed(2));
    } else {
        $('.time').text('0.00');
    }
    $('#timeline>div.progress-bar').css('width', function() {
        return player.currentTime / player.duration * 100 + "%";
    })
})

/**
 * 鼠标点击时间轴，快进
 */
$('#timeline').click(function(e) {
    var seek = e.offsetX / $(this).width() * player.duration;
    // player.fastSeek(seek);
    player.currentTime = seek;
    $('#timeline>div.progress-bar').css('width', seek + "px");
})
/**
 * 音量调节
 */
//点击音量，切换出音量调节
$('.glyphicon-volume-up').click(function() {
    $('#volumeLine').toggle();
})
//点击音量调节轴
$('#volumeLine').click(function(e) {
    var volume = e.offsetX / $(this).width();
    if (volume < 0.05) {
        $('.glyphicon-volume-up').attr('class', 'glyphicon glyphicon-volume-off');
        player.muted = true;
        player.volume = 0;
        $('#volumeLine>div.progress-bar').css('width', 0);
    } else {
        if (player.muted == true) {
            $('.glyphicon-volume-off').attr('class', 'glyphicon glyphicon-volume-up');
            player.muted = false;
        }
        player.volume = volume * 1.0;
        $('#volumeLine>div.progress-bar').css('width', volume * 100 + "%");
    }

})
/**
 * 删除
 */
$('.glyphicon-trash').click(function() {
    if ($('#player source:first-child').length > 0) {
        $('#player source:first-child').remove();
        var status = player.paused;
        player.load();
        if (!status) {
            player.play();
        }
    } else {
        alert('没歌曲了');
    }
})
/**
 * 封面
 */
setInterval(function() {
    if ($('#player source:first-child').length > 0) {
        var song = $('#player source:first-child').attr("src").split('\/')[1].split('.')[0];
        $('.conver img').attr("src", "jpg/" + song + ".jpg");
    } else {
        $('.conver img').attr("src", "");
    }
}, 50);

/**
 * 下载
 */
$('.glyphicon-download-alt').click(function() {

});
/**
 * 下一曲
 */
$('.glyphicon-step-forward').click(function() {
    $('#player').append($('#player source:first-child'));
    var status = player.paused;
    player.load();
    if (!status) {
        player.play();
    }
})
