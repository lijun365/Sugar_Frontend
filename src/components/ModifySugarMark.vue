<template>
  <div class="box">
    <div class="in-flex">
      <strong>序号：</strong>
      <input type="text" v-model="vo.id" class="input-box" disabled>
    </div>
    <div class="in-flex">
      <strong>状态：</strong>
      <el-radio-group v-model="vo.status">
        <el-radio-button label="true" value="true"></el-radio-button>
        <el-radio-button label="false" value="false"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="in-flex">
      <strong>天数：</strong>
      <input type="number" v-model="vo.days" class="input-box">
    </div>
    <div class="in-flex">
      <strong>描述：</strong>
      <input type="text" v-model="vo.desc" class="input-box">
    </div>
    <div class="in-flex">
      <strong>创建时间：</strong>
      <input type="date" v-model="vo.cDate" class="input-box">
    </div>
    <div class="in-flex">
      <strong>更新时间：</strong>
      <input type="date" v-model="vo.uDate" class="input-box">
    </div>
    <br>
    <div>
      <el-button @click="saveUpdate()" style="width: 60%;color: white; background-color: dodgerblue;">保存</el-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "ModifySugarMark",
  props: ['item'],
  data() {
    return {
      vo: {}
    }
  },
  methods: {
    ...mapActions({
      doUpdate: 'sugarmark/updateMark'
    }),
    saveUpdate() {
      this.doUpdate(this.item);
      location.reload();
    }
  },
  created() {
    console.log("In ModifySugarMark");
    console.log(this.item);
    this.vo = this.item;
  },
  destroyed() {
    console.log("ModifySugarMark destroyed.");
  }
}
</script>

<style scoped>
.in-flex{
  padding: 15px;
}
.input-box{
  padding: 10px;
  border-radius: 5px;
  border: 1px gainsboro solid;
  width: 50%;
}
</style>