<template>
    <div class="">
        <ul class="breadcrumbs container">
            <template v-for="level in items">
                <li class="breadcrumbs-item">
                    <nuxt-link no-prefetch class="breadcrumbs-link" :to="level.lnk">{{level.text}}</nuxt-link>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>


    export default {
        name: "Breadcrumbs",
        props: {
            items:{
                type: Array,
                required: true,
            }
        }

    }
</script>
