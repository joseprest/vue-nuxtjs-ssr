<template>
    <b-modal hide-footer modal-class="notificationModal" id="notificationModal" centered>
        <div slot="modal-header" class="modal-header w-100">
            <bell-icon/>
            <span>{{$t('Minimum price alert')}}</span>
            <button type="button" class="close-button p-0" @click="$root.$emit('bv::hide::modal','notificationModal')">
                <close-icon/>
            </button>
        </div>
        <div class="modal-body container-fluid" v-if="!_.isEmpty(sneaker)">
            <div class="image-wraper-left">
                <div class="row">
                    <div class="col-12 col-md-12 mx-auto">
                        <img class="product-photo-img" :src="thumb(sneaker)" :alt="sneaker.brand + ' ' +sneaker.name">
                    </div>
                    <div class="col-12 info text-center">
                        <div class="name">{{sneaker.brand}} {{sneaker.name}}</div>
                        <div class="price">{{releasePrice(sneaker)}}</div>
                    </div>
                </div>
            </div>
            <div class="image-wraper-right">
                <div class="row">
                    <span class="slider-name col-12">{{$t('Desired minimum value')}}</span>
                </div>
                <div class="row slider-container">
                    <client-only>
                        <range-slider
                                class="col-12 col-sm-9 pl-0 pl-sm-2"
                                min="1"
                                :max="Math.floor(maxPrice) + 1"
                                step="1"
                                v-model="minimum">
                        </range-slider>

<!--                        <vue-slider v-model="minimum" :min="1" :max="Math.floor(maxPrice) + 1" :height="8" :dotSize="20"-->
<!--                                    class="col-12 col-sm-9 pl-0 pl-sm-2"/>-->
                    </client-only>
                    <span id="sliderVal" class="sliderVal ml-auto">{{price(minimum ? minimum : maxPrice)}}</span>
                </div>
                <div class="row">
                    <span class="timeout col-12">{{$t('Timeout')}}</span>
                    <span class="time-text col-12">{{$t('After the specified time, the alert will be deleted')}}</span>
                </div>
                <div class="row time-periods justify-content-center">
                    <label class="container-size">
                        <input type="radio" name="group11[]" value="1" v-model="expires">
                        <span class="label-text">1 {{$t('month')}}</span>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container-size">
                        <input type="radio" name="group11[]" value="2" v-model="expires">
                        <span class="label-text">2 {{$t('months')}}</span>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container-size">
                        <input type="radio" name="group11[]" value="3" v-model="expires">
                        <span class="label-text">3 {{$t('months')}}</span>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container-size">
                        <input type="radio" name="group11[]" value="6" v-model="expires">
                        <span class="label-text">6 {{$t('months')}}</span>
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="row set-alert">
                    <div class="col col-12">
                        <form class="alert-form">
                            <input :disabled="loggedIn" :class="'email-input ' + (error ? 'invalid':'')"
                                   type="email" :placeholder="$t('E-mail address')" v-model="email">
                            <button class="primary-button primary-button__set-alert" @click.prevent="add">
                                <arrow-right/>
                                <span class="primary-button-text">{{$t('Set alert')}}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import BellIcon from "../icons/bell-icon";
    import CloseIcon from "../icons/close-icon";
    import ArrowRight from "../icons/arrow-right";
    import RangeSlider from 'vue-range-slider'

    export default {
		name : 'notificationModal',
		data(){
			return {
				// sneaker : {},
				email : this.$store.state.auth.user ? this.$store.state.auth.user.email :'',
				error : false,
				minimum : 0,
				expires : 2
			}
		},
		computed:{
			...mapState({sneaker: 'chosenForNotify'}),
            ...mapGetters(['currency']),
			maxPrice(){
				return this.sneaker.price_eur ? this.sneaker['price_' + this.currency] :
					this.findReleasePrice(this.sneaker)
			},
		},
        watch: {
            sneaker() {
                this.minimum = this.maxPrice;
                this.error = false;
                this.expires = 2;
                this.email =  this.$store.state.auth.user ? this.$store.state.auth.user.email : '';
            }
        },
		methods: {
		    ...mapMutations(['addNotification']),
			async add() {
				this.error = false;
                this.$nuxt.$loading.start();
                try {
                    await this.$axios.post('/price-alerts', this.params() )
                    if (this.loggedIn) {
                        this.addNotification(this.sneaker.slug)
                    }
                    this.$root.$emit('bv::hide::modal','notificationModal');
                    this.$root.$emit('bv::show::modal','alertModal');
                }
				catch (e) {
                    console.log('alerts ', e.response ? e.response.status : e);
                    this.error = true;
                }
                this.$nuxt.$loading.finish();
			},
			// remove(slug){
			// 	if(auth())
			// 		return authApi.delete('/price-alerts/' + slug)
			// 			.then(()=>{
			// 				localApi.delete('/price-alerts/' + slug).then(()=>{
			// 					this.removed(slug)
			// 				})
			// 			});
			// },
			params() {
				return { email: this.email,
						minimum: this.minimum,
						expires : this.expires,
						slug : this.sneaker.slug,
						locale : this.$i18n.locale,
						currency : this.currency.toUpperCase()
				}
			},
		},
		components:{ArrowRight, CloseIcon, BellIcon, RangeSlider}
    }
</script>
