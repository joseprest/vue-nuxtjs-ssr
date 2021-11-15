<template>
  <div class="avatar-cropper">
    <div v-if="dataUrl" class="avatar-cropper-overlay">
      <div class="avatar-cropper-mark"><a href="javascript:;" class="avatar-cropper-close" @click="destroy">&times;</a></div>
      <div class="avatar-cropper-container">
        <div class="avatar-cropper-image-container">
          <img ref="img" :src="dataUrl" alt="" @load.stop="createCropper" />
        </div>
        <div class="avatar-cropper-footer">
          <button class="avatar-cropper-btn" @click="destroy" v-text="labels.cancel">Cancel</button>
          <button class="avatar-cropper-btn" @click="submit" v-text="labels.submit">Submit</button>
        </div>
      </div>
    </div>
    <input ref="input" type="file" class="avatar-cropper-img-input" :accept="mimes">
  </div>
</template>

<script>

  // import Cropper from 'cropperjs'

  export default {
    props: {
      trigger: {
        type: [String], //, Element
        required: true
      },
      uploadHandler: {
        type: Function,
      },
      uploadUrl: {
        type: String,
      },
      uploadHeaders: {
        type: Object,
      },
      uploadFormName: {
        type: String,
        default: 'file'
      },
      uploadFormData: {
        type: Object,
        default() {
          return {}
        }
      },
      cropperOptions: {
        type: Object,
        default() {
          return {
            aspectRatio: 1,
            autoCropArea: 1,
            viewMode: 1,
            movable: false,
            zoomable: false,
          }
        }
      },
      outputOptions: {
        type: Object,
        default() {
          return {
            width: 512,
            height: 512
          }
        }
      },
      outputMime: {
        type: String,
        default: 'image/jpeg'
      },
      outputQuality: {
        type: Number,
        default: 0.9
      },
      mimes: {
        type: String,
        default: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
      },
      labels: {
        type: Object
      }
    },
    data() {
      return {
        cropper: undefined,
        dataUrl: undefined,
        filename: undefined
      }
    },
    methods: {
      destroy() {
        this.cropper.destroy()
        this.$refs.input.value = '';
        this.dataUrl = undefined
      },
      submit() {
        this.$emit('submit')
        if (this.uploadUrl) {
          this.uploadImage()
        } else if (this.uploadHandler) {
          this.uploadHandler(this.cropper)
        } else {
          this.$emit('error', 'No upload handler found.', 'user')
        }
        this.destroy()
      },
      pickImage() {
        this.$refs.input.click()
      },
      createCropper() {
        this.cropper = new Cropper(this.$refs.img, this.cropperOptions)
      },
     
    },
    mounted() {
      // listen for click event on trigger
      let trigger = typeof this.trigger == 'object' ? this.trigger : document.querySelector(this.trigger)
      if (!trigger) {
        this.$emit('error', 'No avatar make trigger found.', 'user')
      } else {
        trigger.addEventListener('click', this.pickImage)
      }

      // listen for input file changes
      let fileInput = this.$refs.input
      fileInput.addEventListener('change', () => {
        if (fileInput.files != null && fileInput.files[0] != null) {
          let reader = new FileReader()
          reader.onload = (e) => {
            this.dataUrl = e.target.result
          }

          reader.readAsDataURL(fileInput.files[0])

          this.filename = fileInput.files[0].name || 'unknown'
          this.$emit('changed', fileInput.files[0], reader)
        }
      })
    }
  }
</script>
