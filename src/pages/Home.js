import React from 'react'
import RecordRTC, {MultiStreamRecorder} from 'recordrtc'
import {downloadBlobFile, getMedia, handleStopShare, loadMetaDataVideo} from "../function";

const constraints = {
    video: true,
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
    }
}

const Home = () => {

    const startRecord  = async () => {
        window.streamScreen = await navigator.mediaDevices.getDisplayMedia(constraints);

        window.streamScreen.width = window.screen.width;
        window.streamScreen.height = window.screen.height;
        window.streamScreen.fullcanvas = true;

        const microphone = await getMedia({audio: true, video: false})

        recordMultiStream([window.streamScreen, microphone], (rec) => {
            setTimeout(()=>{
                stopRecordMulti(rec);
            }, 5000)
        })

        // window.recorder = RecordRTC(window.streamScreen, {
        //     type: 'video',
        //     mimeType: 'video/webm'
        // });
        // window.recordMic = RecordRTC(microphone, {
        //     type: 'video'
        // });
        // window.recordMic.microphone = microphone;

        // window.recorder.startRecording();
        // window.recordMic.startRecording();

        // window.streamScreen.oninactive = () => stopRecord
    }

    const recordMultiStream = (ArrayOfMediaStreams, callback) => {
        let options = {
            mimeType: 'video/webm'
        }
        let recorder = new MultiStreamRecorder(ArrayOfMediaStreams, options);
        recorder.record();
        callback(recorder);
    }

    const stopRecordMulti = (recorder) => {
        recorder.stop(function(blob) {
            downloadBlobFile(blob, false)
        });
    }




    const stopRecord = () => {
        // stopRTC();
        console.log("a")
        window.recorder.stopRecording(function() {
            console.log({
                a: window.recorder,
                b: window.recordMic
            })
            window.recordMic.stopRecording(function() {
                console.log("c")
                var blob1 = window.recorder.getBlob();
                var blob2 = window.recordMic.getBlob();
                console.log({blob1, blob2})
                let blobCom = new Blob([blob1, blob2], {type: 'video'});
                console.log(blobCom)
                console.log(URL.createObjectURL(blobCom))
                downloadBlobFile(URL.createObjectURL(blobCom), false);
                // handleStopShare(window.streamScreen);
            });
        });

    }

    const stopRTC = () => {
        window.recorder.stopRecording(function() {
            var blob = window.recorder.getBlob();
            downloadBlobFile(blob, false);
            handleStopShare(window.streamScreen);
        });
    }


    return ( <div>
        <button onClick={startRecord}>Record</button>
        <button onClick={stopRecord}>Stop Record</button>
    </div>)
}
export default Home
