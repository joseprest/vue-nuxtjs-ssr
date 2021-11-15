<template>
    <div class="typeahead">
        <input @input="onChange" :name="name"
               v-model="searchString"
               ref="input"
               autocomplete="off"
               type="text" :class="inputClass" :placeholder="placeholder" />
        <ul  class="typeahead-list" v-show="searchString && showResult">
            <li class="typeahead-result" v-for="item in result" :key="item" @click="handleClick(item)">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from "axios";
    import {debounce} from 'lodash-core'
    export default {
        name: "TypeAhead",
        props: {
            inputClass: {
                type : String
            },
            placeholder: {
                type: String
            },
            name: {
                type: String,
                default: 'q'
            },
            initial: {
                type: String,
                default : ''
            }
        },
        data(){
            return {
                showResult: false,
                result: [],
                searchString: this.initial
            }
        },
        methods:{
            onChange: debounce(function () {
                this.$axios.get(process.env.apiUrl + 'search-suggestion?q=' + this.searchString).then(({data}) => {
                    this.result = data;
                    this.showResult = data.length
                }).catch((e) => {
                    console.log('Suggestion error: ' + e)
                });
            }, 150),
            clearString(){
                this.searchString = '';
            },
            handleClick(item){
                this.showResult = false;
                this.searchString = item;
                this.$emit('search', item)
            },
            handleClickOutside(evt) {
                if (!this.$el.contains(evt.target)) {
                    this.showResult = false;
                    this.arrowCounter = -1;
                }
            }
        },

        mounted() {
            document.addEventListener('click', this.handleClickOutside);
            let superplaceholder = require('superplaceholder')
            const sup = superplaceholder({
                el       : this.$refs.input,
                sentences: [this.placeholder],
                options  : {
                    autoStart: true,
                    loop     : true,
                }
            })
            sup.start()
        },
        destroyed() {
            document.removeEventListener('click', this.handleClickOutside)
        }
    }
</script>

<style scoped>

</style>