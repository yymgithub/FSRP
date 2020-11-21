<template>
   <div>
       <my-header></my-header>
       <my-welcome></my-welcome>
       <my-introduce></my-introduce>
       <my-use></my-use>
       <my-footer></my-footer>
   </div>
</template>

<script>
import MyHeader from './layout/MyHeader.vue';
import MyWelcome from './layout/MyWelcome.vue';
import MyIntroduce from './layout/MyIntroduce.vue';
import MyFooter from './layout/MyFooter.vue';
import MyUse from './layout/MyUse.vue';
export default {
  components: { MyWelcome, MyHeader, MyIntroduce, MyFooter, MyUse },
}
</script>
