<template>
    <li class="selected-sizes-item" @click="remove"><span v-html="sizeHtml(size, format)"></span>
        <close-small-icon/>
    </li>
</template>

<script>
    import CloseSmallIcon from "../icons/close-small-icon";

    export default {
        components: {CloseSmallIcon},
        props     : ['size', 'format'],
        methods   : {
            remove()
            {
                let index = this._.indexOf(this.$parent.$parent['sizes_' + this.format], this.size);
                if (index !== -1) {
                    this.$delete(this.$parent.$parent['sizes_' + this.format], index);
                }
            },
        }
    }
</script>
