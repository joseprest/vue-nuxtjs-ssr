<template>
	<div itemprop="availability" :content="content" class="go-button"  :class="{countdown: isCountDown}"
			    :disabled="!available">
		<arrow-right path-class />
		<span v-if="text" class="go-button-text">{{isCountDown ? $t('available') + ' ' + countDownExpiration : (featured ? $t('Shop now at', {name: partner}) : $t('Go to shop'))}}</span>
	</div>
</template>

<script>
	import ArrowRight from "../icons/arrow-right";

	export default {
		components: {ArrowRight},
		props: ['available', 'lnk', 'partner', 'text', 'url', 'featured', 'query', 'isCountDown', 'countDownExpiration'],
		computed: {
			content() {
			    return this.available ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock';
            }
		}
    }
</script>
