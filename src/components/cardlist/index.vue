<template>
<div style="display:flex;width:100%;">
    <Card style="width:310px;margin-right:20px;" v-for="(item,index) in movieList" :key="index">
        <p slot="title">
            <Icon type="ios-bookmark" />
            推荐一
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            详情
        </a>
        <p>
            可能原因：内容简介,截取文章内容前几段内容展示......
        </p>
        <ul>
            <li v-for="(item,index) in randomMovieList" :key="index">
                <a :href="item.url" target="_blank">{{ item.name }}</a>
                <span>
                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                    {{ item.rate }}
                </span>
            </li>
        </ul>
    </Card>
</div>
</template>
<script>
    export default {
        data () {
            return {
                movieList: [
                    {
                        name: '推荐指数',
                        url: 'https://movie.douban.com/subject/1295124/',
                        rate: 9.4
                    },
                    {
                        name: '推荐指数',
                        url: 'https://movie.douban.com/subject/1292001/',
                        rate: 9.3
                    },
                    {
                        name: '推荐指数',
                        url: 'https://movie.douban.com/subject/2131459/',
                        rate: 9.2
                    }
                ],
                randomMovieList: []
            }
        },
        methods: {
            changeLimit () {
                function getArrayItems(arr, num) {
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i<num; i++) {
                        if (temp_array.length>0) {
                            const arrIndex = Math.floor(Math.random()*temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }
                this.randomMovieList = getArrayItems(this.movieList, 1);
            }
        },
        mounted () {
            this.changeLimit();
        }
    }
</script>


<style lang="less" scoped>

</style>