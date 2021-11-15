<template>
		<div :class="alert ? 'notification selected':'notification'"
		   data-toggle="tooltip" title="" data-trigger="hover" :data-original-title="!alert ? $t('Notify about price') : $t('Remove price alert')"
		   @click.prevent="click">
			<span>
				<bell-icon/>
			</span>
		</div>
</template>

<script>
	import {mapMutations, mapActions} from 'vuex'
	import BellIcon from "../icons/bell-icon";

	export default {
		name : 'AlertButton',
		components: {BellIcon},
		props: ['sneaker'],
		computed: {
			alert() {
				return  this._.indexOf(this.$store.state.notifications, this.sneaker.slug) !== -1
			}
		},
		methods: {
			...mapMutations(['setChosenForNotify']),
            ...mapActions(['removeNotification']),
			async click() {
				if (!this.alert) {
					this.setChosenForNotify(this.sneaker);
					this.$root.$emit('bv::show::modal','notificationModal');
				} else {
					try {
                        this.removeNotification(this.sneaker.slug);
					}
					catch (e) {
						console.log(e);
					}
				}
			}
		}
    }
</script>
