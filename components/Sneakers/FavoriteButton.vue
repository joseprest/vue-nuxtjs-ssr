<template>
	<div class="favorite" :class="{selected: isFav}" @click.prevent="favClick">
	  <heart-icon/>
	</div>
</template>

<script>
	import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
	import HeartIcon from "../icons/heart-icon";

    export default {
		name: 'FavoriteButton',
		components: {HeartIcon},
		props: ['sneaker'],
		computed: {
			...mapState(['favorites', 'onceLoggedIn']),
			isFav() {
				return this._.indexOf(this.favorites, this.sneaker.slug) !== -1
			}
		},
		methods: {
			...mapActions(['addFavourites']),
			...mapMutations(['setChosenFavorite']),
			async favClick() {
				if (this.loggedIn) {
					this.setChosenFavorite(this.sneaker);
					try {
						await this.addFavourites(this.sneaker);
						if (this.isFav) {
							this.$root.$emit('bv::show::modal','favoriteModal');
							setTimeout( () => {
								this.$root.$emit('bv::hide::modal','favoriteModal');
							}, 5000);
						}
					}
					catch (e) {
						console.log(e);
					}
				} else {
					this.$router.push(this.localePath({
						name: this.onceLoggedIn ? 'login' : 'register'
					}))
				}

			}
		}
    }
</script>
