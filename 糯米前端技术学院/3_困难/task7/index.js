/**
 * 歌名，歌手
 */
setInterval(function() {
    var song = $('#player source:first-child').attr('src').split('\/')[1];
    var title = song.split('-')[1].replace(/\s/, "").split('.')[0];
    var singer = song.split('-')[0].replace(/\s/, "")
    $('.title').text(title);
    $('.singer').text(singer);
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
        i++;
    } else {
        $(this).attr('class', 'glyphicon glyphicon-play');
        player.pause();
        i++;
    }
})
/**
 * 歌曲剩余时长显示及时间轴
 */
setInterval(function() {
    var time = (player.currentTime - player.duration) / 60;
    if (player.currentTime > 0) {
        $('.time').text(time.toFixed(2));
    } else {
        $('.time').text('0.00');
    }
    //时间轴
    $('.progress-bar').css('width', function() {
        return player.currentTime / player.duration * 100 + "%";
    })
}, 0);

/**
 * 静音
 */
$('.glyphicon-volume-up').click(function() {
    if (i % 2 == 0) {
        $(this).attr('class', 'glyphicon glyphicon-volume-off');
        player.muted = true;
        i++;
    } else {
        $(this).attr('class', 'glyphicon glyphicon-volume-up');
        player.muted = false;
        i++;
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
    var song = $('#player source:first-child').attr("src").split('\/')[1].split('.')[0];
    $('.conver img').attr("src", "jpg/" + song + ".jpg");
}, 50);

/**
 * 下载
 */
$('.glyphicon-download-alt').click(function() {

});
