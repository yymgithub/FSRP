<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#icon-' + type"></use>
    </svg>
</template>
<script>
export default {
    props: {
        type: String
    }
};
</script>
