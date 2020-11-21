<template>
    <footer>
        <p class="line1">联系方式:123456789 邮箱：123@email.com</p>
        <p class="line2">
            Copyright@{{new Date().getFullYear()}} 
        </p>
    </footer>
</template>
<style lang="less" scoped>
footer {
    background: #34373a;
    height: 120px;
    color: #9b9ea0;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .line1 {
        margin-top: 27px;
    }
    .line2 {
        display: flex;
        align-items: center;
    }
}
</style>
