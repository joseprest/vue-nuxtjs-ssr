<template>
	<header class="header" id="header" v-if="loggedIn">
		<!--<search-bar></search-bar>-->
		<div class="header-bg-img img_profile" :style="headerStyle">
			<div class="header-bg-mask">
				<h1 class="header-name" v-html="user.name ? user.name : $t('Your name here')"></h1>
			</div>
			<camera-icon class="change-cover"/>
		</div>
		<div class="header-avatar">
			<avatar-cropper
					v-if="cropperLoaded"
					:uploadHandler="uploadAvatar"
					trigger=".change-photo"
					:labels="{submit: 'Submit', cancel:'Cancel'}"/>
			<a class="header-avatar-img-link">
				<avatar :src="user.avatar" :size="180" :username="avatarInitials" class="header-avatar-img"></avatar>
				<camera-icon class="change-photo"/>
			</a>
		</div>
		<avatar-cropper
				v-if="cropperLoaded"
				:cropper-options="{
				aspectRatio: 1.5,
				autoCropArea: 1,
				viewMode: 1,
				movable: false,
				zoomable: false
				}"
				:uploadHandler="uploadCover"
				trigger=".change-cover"
				:labels="{submit: 'Submit', cancel:'Cancel'}"/>
	</header>
</template>

<script>
	import {mapGetters} from 'vuex'
     import AvatarCropper from "./AvatarCropper";
	import Avatar from "vue-avatar";
	import CameraIcon from "../icons/camera-icon";

	export default {
		name : 'ProfileHeader',
		props:['cropperLoaded'],
		components: {CameraIcon, Avatar, AvatarCropper },
		computed:{
			avatarInitials(){
				return this.user.name ? this.user.name: 's';
			},
			headerStyle(){
				
				return this.user.cover ? 'background:url(' + this.user.cover + ')' : '';
			},
			user()
			{
				return this.$store.state.auth.user
			}
		},
		methods: {
		  handleUploaded(resp) {
			this.userAvatar = resp.relative_url;
		  },
		  uploadAvatar(cropper){
			cropper.getCroppedCanvas({
				width: 512,
				height: 512
			  }).toBlob((blob) => {
			  let form = new FormData()
			  form.append('avatar', blob, 'filename');

			  // NProgress.start()
			  this.$axios.post('profile/avatar', form).then(response => {
				  this.$auth.fetchUser()
			  }).catch(error => {

			  }).then(() => {
			
				// NProgress.done()
			  });

			}, 'image/jpeg', 1)
		  },
		  uploadCover(cropper){
			cropper.getCroppedCanvas({
				width: 1440,
				height: 960
			  }).toBlob((blob) => {
			  let form = new FormData();
			  form.append('cover', blob, 'filename');

			  // NProgress.start()
			  this.$axios.post('profile/cover', form).then(response=>{
				  this.$auth.fetchUser()
			  }).catch(error=>{
				  
			  }).then(()=>{
			
				// NProgress.done()
			  });

			}, 'image/jpeg', 1)
		  }
		}

    }
</script>
