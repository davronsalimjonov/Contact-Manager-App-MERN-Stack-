export function formatTime(sec_num) {
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - (minutes * 60);
    return minutes.toString().padStart(2,'0') + ':' + seconds.toString().padStart(2,'0');
}