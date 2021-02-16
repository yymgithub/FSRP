<template>
    <h2 :class="`title${' ' + size}`">
        <section class="text">
            <span 
            v-for="(i, index) in content" 
            :key="index"
            :class="{'first': index === 0}">
            {{i}}
            </span>
        </section>
        <slot></slot>
    </h2>
</template>

<style lang="less" scoped>
    .title {
        padding: 20px 0;
        color: #555;
        .text {
            display: inline-block;
        font-weight: bold!important;

        }
    }

    .default {
        font-size: 16px;

        .first {
            font-size: 20px;
            color: #3282d6;
        }
    }

    .small {
        font-size: 14px;

        .first {
            font-size: 18px;
            color: #3282d6;
        }
    }

    .large {
        font-size: 22px;

        .first {
            font-size: 26px;
            color: #3282d6;
        }
    }
</style>

<script>
    export default {
        name: 'BaseTitle',
        props: {
            content: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'default'
            }
        }
    }
</script>