<template>
    <div class="div-circle">
      <div :class=" flag?'div-circle-in':null "></div>
    </div>
</template>

<script>
export default {
  name: "SelectButton",
  props:["flag"]
}
</script>

<style>
.div-circle{
  width: 30px;
  height: 30px;
  border: 1px gainsboro solid;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.div-circle-in{
  width: 20px;
  height: 20px;
  background-color: deepskyblue;
  box-sizing: border-box;
  border-radius: 50%;
}
</style>