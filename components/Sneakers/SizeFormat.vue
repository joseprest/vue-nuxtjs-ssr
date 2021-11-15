<template>
	<div class="size-format-container">
		<label class="size_format" :class="{'selected': f === sizeFormat}" v-for="(val, f) in $parent.sizes" :key="f"
			   @click.stop="setSizeFormat(f)">
	  		<input type="radio" name="size_format[]" :value="f">{{f.toUpperCase()}}
  		</label>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

    export default {
		name: 'SizeFormatSelector',
		data() {
			return {
				format: ''
			}
		},
		methods: {
			...mapMutations(['setSizeFormat']),
		},
		computed: {
			...mapState(['sizeFormat'])
		}
    }
</script>
