<template>
    <div>{{test}}</div>
</template>

<script>
export default {
    data() {
        return {
            test: '我是vue组件'
        }
    }
}
</script>

<style lang="less" scoped>
div{
    color: blue;
}
</style>