import React from "react";
import {useLocation} from "react-router";
import './style.css';
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/src/plugin/regions";
import TimelinePlugin from "wavesurfer.js/src/plugin/timeline";

function Output(props)
{

    
    let location =new useLocation()
    //console.log(location.pathname)
    //console.log(location.state.audioFile)
    let audioFile=location.state.audioFile
    //console.log(audioFile)
    
    let reader=new FileReader()
    let data=""
    function cb(audioData){
        data=audioData
        }
    reader.readAsDataURL(audioFile)

    function getBase64(cb)
    {
        reader.onload=function(){
        let audioData=reader.result
        cb(audioData) 
        }
    }
    getBase64(cb);
    
    function playAudio() {
        

        let wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#A8DBA8',
            progressColor: '#3B8686',
            
              plugins: [
                TimelinePlugin.create({
                    container:"#wave-timeline",
                    
                }),
                RegionsPlugin.create({
                    container:"Wavefrom",
                    dragSelection: {
                        slop: 5
                    }
                })
              ],
              
        });
        
        wavesurfer.load(data)
        console.log(wavesurfer) 

        wavesurfer.on('region-created', function (region) {
            console.log(region.start, region.end);
          });

        let showBtn = document.getElementById("showBtn")
        let controlDiv= document.getElementById("controlDiv")
        let playBtn = document.getElementById("playBtn")
        let pauseBtn = document.getElementById("pauseBtn")
        let replayBtn = document.getElementById("replayBtn")
        let trimBtn = document.getElementById("trimBtn")
        let volumeSlider= document.getElementById("volumeSlider")
        let zoomSlider= document.getElementById("zoomSlider")

        showBtn.classList.add("d-none")
        controlDiv.classList.remove("d-none")
        controlDiv.classList.add("d-block")

        playBtn.onclick = function(){
            playBtn.classList.add("d-none")
            pauseBtn.classList.remove("d-none")
            pauseBtn.classList.add("d-inline")
            wavesurfer.playPause()
            }
        
        pauseBtn.onclick=function(){
            pauseBtn.classList.add("d-none")
            playBtn.classList.remove("d-none")
            playBtn.classList.add("d-inline")
            wavesurfer.playPause()
            }
        
        replayBtn.onclick=function(){
            wavesurfer.seekTo(0)
        }

        trimBtn.onclick=function(){
            let regions=wavesurfer.regions.list
            let keys = Object.keys(regions)
            console.log(regions[keys[0]])
            if(keys.length>=1){
                wavesurfer.clearRegions()
            }
        }

        volumeSlider.onmouseup=function(event){
            wavesurfer.setVolume(volumeSlider.value)
        }
        zoomSlider.onmouseup=function(event){
            wavesurfer.zoom(Number(zoomSlider.value))
        }
      }

    return(
            <div>
                <div id="output-div" className="m-2">
                   {<button className="btn btn-primary" id="showBtn" onClick={playAudio}>
                    <span>Show Audio</span>
                    </button>}
 

                    <div className="d-none" id="controlDiv">
                        <h1>Wave Form of Audio</h1>
                        <div id="waveform">
                        </div>
                        <div id="wave-timeline">
                        </div>
                        <label className="switch mr-1">
                            <input type="checkbox" id="togBtn"></input>
                            <div className="slider round">
                                <span className="agent">
                                    Agent
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg>
                                </span>  
                                
                                <span className="customer">
                                    Customer
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person" viewBox="0 0 16 16">
                                        <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/>
                                    </svg>
                                </span>
                            </div>
                        </label>

                        <button className="btn btn-success mr-1" id="playBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                            </svg>
                            
                            {/*Play*/}
                        </button>

                        <button className="btn btn-success mr-1 d-none" id="pauseBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16">
                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                            </svg>
                        </button>

                        <button className="btn btn-info mr-1" id="replayBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                            </svg>
                        {/*Re-Play*/}
                        </button>

                        <button className="btn btn-danger mr-1" id="trimBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-scissors" viewBox="0 0 16 16">
                                <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                            </svg>
                        </button>

                        <input type="range" min="0" max="1" step="any"  id="volumeSlider"></input><span>volumeSlider</span>
                        <input type="range" min="1" max="200" step="any"  id="zoomSlider"></input><span>zoomSlider</span>
                    </div>
                </div>
            </div>        
    )
}
export default Output;