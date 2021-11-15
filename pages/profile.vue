<template>
    <div>
        <simple-header/>
        <client-only>
            <ProfileHeader :cropperLoaded="avatarCropperLoaded"/>
        </client-only>
        <article class="container-fluid my-pairs row line" id="my-pairs">
            <profile-side-menu/>
            <nuxt-child></nuxt-child>
        </article>
    </div>
</template>

<script>
    import ProfileSideMenu from "../components/profile/profileSideMenu";
    import ProfileHeader from "../components/profile/Header";
    import SimpleHeader from "../components/SimpleHeader";

    export default {
        name: "profile",
        components: {SimpleHeader, ProfileHeader, ProfileSideMenu},
        data(){
            return {
                avatarCropperLoaded:false
            }
        },
        beforeRouteEnter(to, from, next) {

            next();
        },
        head(){
            return {
                script: [
                    {
                        hid: 'stripe',
                        src: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.6/cropper.min.js',
                        defer: true,
                        // Changed after script load
                        callback: () => {
                            this.avatarCropperLoaded = true
                        }
                    }
                ],
                link: [
                    { rel: 'stylesheet',
                        href: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.6/cropper.min.css' }
                ]

            }
        },
    }
</script>

<style scoped>

</style>