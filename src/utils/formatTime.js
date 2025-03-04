export function formatTime(sec_num) {
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - (minutes * 60);
    return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}

export function getFormatTime(date) {
    return (new Date(date)).getHours().toString().padStart(2, "0") + ":" + (new Date(date)).getMinutes().toString().padStart(2, "0");
}