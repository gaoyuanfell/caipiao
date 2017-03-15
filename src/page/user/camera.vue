<template>
    <div class="contener camera" :style="{'zIndex':$route.params.zIndex}">

        <video class="video" ref="camera" height="100%" :style="cameraStyle"></video>

        <canvas class="canvas" ref="canvas" :style="canvasStyle"></canvas>

        <div v-if="cameraState" class="photograph" @click="photograph"></div>
        <div class="camera-blck" @click="cameraBlck">
            <i class="icon">&#xe653;</i>
        </div>
        <div class="camera-switch" @click="switchCameras">
            <i class="icon">&#xe651;</i>
        </div>

        <div v-if="!cameraState" class="recovery" @click="recovery">
            <i class="icon">&#xe639;</i>
        </div>

        <div v-if="!cameraState" class="confirm" @click="confirm">
            <i class="icon">&#xe609;</i>
        </div>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import header from '../../components/header.vue';
    import { Toast } from 'mint-ui';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                cameraState:true,
                cameraStyle:{
                    zIndex:2
                },
                canvasStyle:{
                    zIndex:1
                },
                videoTracks:null,
            }
        },
        created: function () {
            
        },
        mounted:function(){
            // let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
            // for (let constraint in supportedConstraints) {
            //     if (supportedConstraints.hasOwnProperty(constraint)) {
            //         console.info(constraint)
            //     }
            // }
            var video = this.$refs.camera;
            var canvas = this.$refs.canvas;
            
            var constraints = {
                audio: false,
                video: {
                    width: 1920,
                    height: 1080,
                    frameRate: { max: 30 },
                    aspectRatio: { ideal: 1.7777777778 },
                    // facingMode: { exact: "user" },
                    facingMode: { exact: "environment" },//left right environment user
                }
            };
            navigator.mediaDevices.getUserMedia(constraints).then(
                (stream) => {
                    this.videoTracks = stream.getVideoTracks();
                    // stream.onended = function () {
                    //     console.log('Stream ended');
                    // };
                    video.srcObject = stream;
                    video.play();
                }
            ).catch(
                (error) => {
                    console.error(error);
                }
            )
        },
        computed:{
            
        },
        methods:{
            switchCameras(){
                // Toast(this.videoTracks[0] + '')
                let constraints = this.videoTracks[0].getConstraints();
                // Toast(JSON.stringify(constraints))
                let camera = constraints.facingMode;
                if(camera == 'user'){
                    constraints.facingMode = "environment";
                }else{
                    constraints.facingMode = "user";
                }
                this.videoTracks[0].applyConstriants(constraints);
            },
            cameraBlck(){
                this.$router.push({name:'userInfo'})
            },
            photograph(){
                var video = this.$refs.camera;
                var canvas = this.$refs.canvas;
                let w = video.offsetWidth;
                let h = video.offsetHeight;
                canvas.width = w;
                canvas.height = h;
                canvas.getContext('2d').drawImage(video, 0, 0, w, h);
                var data = canvas.toDataURL('image/png');
                this.cameraStyle.zIndex = 1;
                this.canvasStyle.zIndex = 2;
                this.cameraState = false;
            },
            recovery(){
                this.cameraState = true;
                this.cameraStyle.zIndex = 2;
                this.canvasStyle.zIndex = 1;
            },
            confirm(){
                this.cameraState = true;
                this.cameraStyle.zIndex = 2;
                this.canvasStyle.zIndex = 1;
            }
        }
    }
</script>