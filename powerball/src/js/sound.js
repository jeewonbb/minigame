// soundassets
var soundListIds = [
    "bgm",
    "bigwheel",
    "button_bet",
    "button_cancel",
    "button_confirm",
    "button_rebet",
    "button_slip",
    "result",
    "swish",
    "ui_function",
    "ui_popup",
    "win",
    "zoomin",
    "zoomout",
    "spin_left",
    "spin_right",
    "spin_end"
];
let soundList = [];

export function setMuteSound_bgm(value) 
{
    muteAll_bgm(value);
}

export function setMuteSound_effect(value) 
{
    muteAll_effect(value);
}


function initSoundList() 
{
    soundList = [];
    var name = null;
    var len = soundListIds.length;
    for ( var i = 0 ; i < len ; i++ ) 
    {
        name = soundListIds[i];
        soundList.push({
            id: name,
            sound: new Audio("sound/" + name + ".mp3")
        });
    }
}

function getSound(filename) 
{
    var len = soundList.length;
    var data = null;
    var sound = null;
    for( var i = 0; i < len ; i++ ) 
    {
        data = soundList[i];
        if ( filename == data.id && data.sound ) 
        {
            sound = data.sound;
            break;
        }
    }
    return sound;
}

function stopSound(filename) 
{
    var sound = getSound(filename);
    if ( sound == null )
        return;

    sound.pause();
    sound.currentTime = 0;
}

export function playSound(filename, value, time) 
{
    var sound = getSound(filename);

    if ( sound == null ) 
        return;

    sound.loop = value;
    if ( time >= 0 )
        sound.currentTime = time;
    
    sound.play().then(
    ).catch(function(e) {
    });
}

function muteAll_bgm(value) 
{
    soundList[0].sound.muted = value;
}

function muteAll_effect(value) 
{
    var len = soundList.length;
    for ( var i = 1; i < len ; i++ ) 
    {
        soundList[i].sound.muted = value;
    }
}
initSoundList();