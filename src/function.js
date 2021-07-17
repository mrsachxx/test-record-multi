export async function getMedia(constraints) {
    let stream = null;

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        /* use the stream */
    } catch(err) {
        /* handle the error */
        console.log("sach err", err);
    }
    return stream;
}

export function downloadBlobFile(blob, isBlobURL, type = ".mp4") {
    let a = document.createElement("a");
    a.download = [
        "record meeting_",
        (new Date() + "").slice(4, 28),
        type,
    ].join("");
    if (isBlobURL) {
        a.href = blob;
    }else {
        a.href = URL.createObjectURL(blob);
    }
    a.textContent = a.download;
    a.click();
}

export function handleStopShare (stream) {
    if (!stream) return;
    stream.getTracks().forEach(track => track.stop());
}

export function loadMetaDataVideo (stream, callback) {
    let video = document.createElement('video');
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => callback(video));
}
