<template>
    <div class="scroll-top-box" :class="cssClass" @click="scrollToTop">
        <span>
            <svg class="search-svg" width="12px" height="12px" viewBox="0 0 23 23" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g transform="translate(-274.000000, -23.000000)">
                    <path class="search-icon" style="fill:rgb(255,255,255)"
                          d="M291.782705,39.0814222 L296.193944,43.492661 C296.776498,44.0752149 296.776498,45.01764 296.193944,
                          45.6001939 C295.61139,46.1827479 294.668965,46.1827479 294.086411,45.6001939 L289.675172,41.1889552 C288.072652,
                          42.3640042 286.095017,43.0552485 283.956335,43.0552485 C278.602671,43.0552485 274.263672,38.7162491 274.263672,
                          33.3625852 C274.263672,28.0089213 278.602671,23.6699219 283.956335,23.6699219 C289.309999,23.6699219 293.648998,
                          28.0089213 293.648998,33.3625852 C293.648998,35.5012672 292.957754,37.4789019 291.782705,39.0814222 Z M283.956335,
                          40.5699502 C287.938114,40.5699502 291.1637,37.3443644 291.1637,33.3625852 C291.1637,29.380806 287.938114,
                          26.1552202 283.956335,26.1552202 C279.974556,26.1552202 276.74897,29.380806 276.74897,33.3625852 C276.74897,
                          37.3443644 279.974556,40.5699502 283.956335,40.5699502 Z"></path>
                </g>
            </svg>
        </span>
        <span class="icon-up">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8px" height="8px"
                 viewBox="0 0 10 10" version="1.1">
                <g id="surface1">
                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(255,255,255);fill-opacity:1;"
                          d="M 9.898438 6.851562 L 5.230469 2.183594 C 5.164062 2.117188 5.085938 2.082031 5 2.082031 C 4.910156 2.082031
                          4.835938 2.117188 4.769531 2.183594 L 0.101562 6.851562 C 0.0351562 6.917969 0 6.996094 0 7.082031 C 0 7.167969
                          0.0351562 7.246094 0.101562 7.3125 L 0.601562 7.8125 C 0.667969 7.878906 0.746094 7.914062 0.832031 7.914062 C
                          0.917969 7.914062 0.996094 7.878906 1.0625 7.8125 L 5 3.875 L 8.9375 7.8125 C 9.003906 7.878906 9.078125 7.914062
                          9.167969 7.914062 C 9.253906 7.914062 9.328125 7.878906 9.398438 7.8125 L 9.898438 7.3125 C 9.964844 7.246094 9.996094
                          7.167969 9.996094 7.082031 C 9.996094 6.996094 9.964844 6.917969 9.898438 6.851562 Z M 9.898438 6.851562 "></path>
                </g>
            </svg>
        </span>
    </div>
</template>

<script>
    import {debounce} from 'lodash-core'
    export default {
        name: "toTopBtn",
        data(){
          return {
              cssClass : []
          }
        },
        methods: {
            scrollToTop(){
                document.getElementsByTagName("BODY")[0].scrollIntoView({behavior: "smooth"});
            } ,
            throttleScroll(){
                if (window.scrollY > 80) {
                    this.$store.commit('setHeaderTopClass', {remove: 'position-sticky', add: 'fixed-top'})
                } else {
                    this.$store.commit('setHeaderTopClass', {add: 'position-sticky', remove: 'fixed-top'})
                }
                let idx = this._.indexOf(this.cssClass, 'show')
                if (window.scrollY > 600)
                    idx === -1 &&  this.cssClass.push('show');
                else
                    this.cssClass.splice( idx,1);
            }
        },
        mounted(){
            this.$nextTick(()=>{
                window.addEventListener('scroll', this.throttleScroll);
            })

        },
        destroyed() {
            window.removeEventListener('scroll', this.throttleScroll);
        }
    }
</script>

<style scoped>

</style>