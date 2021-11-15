<template>
	<div>
		<input type="radio" name="product-photo" 
			:id="'gallary-'+index" :value="index" class="input-hidden" v-model="$parent.$parent.currentImageIndex">
		<label :for="'gallary-'+index">
		  <img :src="thumbFromImage(image)" :alt="alt + (index ? ' '+index : index)">
		</label>
	</div>
</template>

<script>

    export default {
		props: ['image', 'index', 'alt'],
		methods : {
			
			thumbFromImage(url)
			{
				let base = this._.slice(this._.split(url, '/'),0,-1);
				let name = this._.split(this._.slice(this._.split(url, '/'),-1)[0], '.');
				name = name[0] + '-thumb.' + name[1];
				return base.join('/') + '/conversions/' + name;
			},
		}
    }
</script>
