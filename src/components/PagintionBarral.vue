<template>
  <div class="box">
    <div>
      <el-button v-for="i in pages" :key="i" @click="jump(i)" :type="i == nowPage? 'primary':null">{{i}}</el-button>
    </div>
    <div>
      <div>
        <!--      共有{{this.$store.state.sugarmark.total}}条数据-->
        共有{{total}}条数据
      </div>
      <div>
        共有{{pages}}页数据
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PagintionBarral",
  data(){
    return {
      pages: 0,
      total: 0,
      changeCurPage: 0,
      nowPage: 1
    }
  },
  methods:{
    pagesInit() {
      this.total = this.$store.state.sugarmark.total;
      console.log("total is:"+this.$store.state.sugarmark.total);
      this.pages = Math.ceil(this.$store.state.sugarmark.total/10);
      console.log("pages is: "+this.pages);
    },
    jump(i) {
      console.log("Jump...");
      this.changeCurPage = i;
      this.nowPage = i;
      this.$emit("changeCurPage",i);
    }
  },
  created() {
    // console.log("In Paginations...");

    // setTimeout(this.pagesInit,1000);
    setInterval(this.pagesInit,1000);
  }

}
</script>

<style scoped>
.box{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>