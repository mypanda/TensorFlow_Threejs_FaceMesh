export default class TrackingSetup {
  videoTarget: HTMLVideoElement;
  videoConstraints: { audio: boolean; video: { width: number; height: number; }; };
  receivingData: boolean;
  aspectRatio: number;
  onReceivingData: ()=>void;

  constructor(onReceivingData:()=>void) {
    this.videoTarget = document.createElement('video')
    this.videoConstraints = { audio: false, video: { width: 1280, height: 720 } }
    this.aspectRatio = 
      this.videoConstraints.video.width/
      this.videoConstraints.video.height
    this.receivingData = false
    this.onReceivingData = onReceivingData
    this.init();
  }

  private init(){
    navigator.mediaDevices
    .getUserMedia(this.videoConstraints)
    .then((mediaStream)=>{
        this.videoTarget.srcObject = mediaStream
        this.videoTarget.onloadedmetadata = () => this.onLoadMetadata()
    })
    .catch(function (err) {
        alert(err.name + ': ' + err.message)
    })
  }

  onLoadMetadata(){
    this.videoTarget.setAttribute('autoplay', 'true')
    this.videoTarget.setAttribute('playsinline', 'true')
    this.videoTarget.play()
    this.receivingData = true
    this.onReceivingData()
  }
}

