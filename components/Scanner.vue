<template>
  <div id="interactive" class="viewport scanner">
    <video playsinline autoplay></video>
    <canvas class="drawingBuffer" ref="drawingBuffer"/>
    <div class="barcode-error">{{error}}</div>
  </div>
</template>

<script>
import Quagga from 'quagga';

export default {
  name: 'QuaggaScanner',
  props: {
    onDetected: {
      type: Function,
    },
    onProcessed: {
      type: Function,
      default(result) {
        let drawingCtx = Quagga.canvas.ctx.overlay;

        let drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0,
              0,
              parseInt(drawingCanvas.getAttribute('width')),
              parseInt(drawingCanvas.getAttribute('height'))
            );
            result.boxes
              .filter(function(box) {
                return box !== result.box;
              })
              .forEach(function(box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                  color: 'green',
                  lineWidth: 2,
                });
              });
          }
          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
              color: '#00F',
              lineWidth: 2,
            });
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(
              result.line,
              { x: 'x', y: 'y' },
              drawingCtx,
              { color: 'red', lineWidth: 3 }
            );
          }
        }
      },
    },
    readerTypes: {
      type: Array,
      default: () => ['code_128_reader'],
    },
    readerSize: {
      type: Object,
      default: () => ({
        width: 640,
        height: 480,
      }),
      validator: o =>
        typeof o.width === 'number' && typeof o.height === 'number',
    },
    aspectRatio: {
      type: Object,
      default: () => ({
        min: 1,
        max: 2,
      }),
      validator: o => typeof o.min === 'number' && typeof o.max === 'number',
    },
  },
  data: function() {
    return {
      error: '',
      quaggaState: {
          inputStream : {
          type: 'LiveStream',
          constraints: {
            // width:  {min: this.readerSize.width},
            // height:  {min: this.readerSize.height} ,
            facingMode: 'environment',
            aspectRatio: { min: 1, max: 2 },
            focusMode: 'continuous',
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers:  window.navigator.hardwareConcurrency || 2,
        frequency: 5,
        decoder: {
          readers: this.readerTypes,
        },
        locate: true,
      },
    };
  },
  methods: {
    init()
    {
      this.error = '';
      Quagga.onDetected(this.onDetected);
      Quagga.onProcessed(this.onProcessed);
      Quagga.init(this.quaggaState, (err)=>{
        if (err) {
          console.error(err)
          if(this.$device.isIos)
            this.error = "Apple iOS does not allow camera streaming in Chrome/Firefox. Please use Safari.";
          else
            this.error = "Access to camera is blocked.";
        }else {
          this.error = '';
          Quagga.start()
        }
      });
    },
    destroy()
    {
      this.$refs.drawingBuffer.width =this.$refs.drawingBuffer.width
      Quagga.stop();
    },
      start()
    {
      Quagga.start();
    },
      pause()
      {
          Quagga.pause();
      },
  },
  destroyed: function() {
    Quagga.stop();
  },
};
</script>

<style scoped>
.viewport {
  position: relative;
}

.viewport canvas,
.viewport video {
  position: absolute;
  left: 0;
  top: 0;
}

  #interactive video,  #interactive canvas
  {
    width: 100%;
    height: auto;
  }
</style>
