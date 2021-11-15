<template>
    <b-modal id="favoriteModal" hide-footer hide-backdrop modal-class="favoriteModal">
        <div slot="modal-header">
            <span class="heart"></span>
            <span>{{$t('Added to your favorite sneakers')}}</span>
        </div>
        <div class="modal-body container-fluid">
            <div class="row"> <!-- v-if="show"-->
                <div class="col-4">
                    <img class="product-photo-img" :src="thumb(sneaker)" :alt="sneaker.name">
                </div>
                <div class="col-8 info">
                    <div class="name">{{sneaker.brand}} {{sneaker.name}}</div>
                    <div class="size"></div>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <div class="d-flex justify-content-center">
                    <button class="button-small" @click="btnClick">
                        <arrow-right/>
                        <span class="button-small-text">{{$t('Go to account')}}</span>
                    </button>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import {mapState} from 'vuex';
    import ArrowRight from "../icons/arrow-right";

    export default {
        name: "favoritesModal",
        components: {ArrowRight},
        computed: {
            ...mapState({
                sneaker: 'chosenFavorite',
            })
        },
        methods: {
            btnClick() {
                this.$router.push(this.localePath({name: 'profile-my-favorites'}));
                this.$root.$emit('bv::hide::modal','favoriteModal');
            }
        }
    }
</script>

<style scoped>

</style>