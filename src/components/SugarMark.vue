<template>
  <div v-loading="coverFlag">
<!--    <div v-if="coverFlag" id="coverPage">-->
<!--      <i class="el-icon-loading"></i>-->
<!--      123-->
<!--    </div>-->
    <div class="sugar">
    <h1>戒糖的365天</h1>
    <hr/>
    <div class="form">
        <div class="div-flex">
<!--          <div class="in-flex">-->
<!--            <strong>序号：</strong>-->
<!--            <input type="text" v-model="form.id" class="input-box">-->
<!--          </div>-->
          <div class="in-flex">
            <strong>状态：</strong>
            <el-radio-group v-model="form.status">
              <el-radio-button label="true" value="true"></el-radio-button>
              <el-radio-button label="false" value="false"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="in-flex">
            <strong>天数：</strong>
            <input type="number" v-model="form.days" class="input-box">
          </div>
          <div class="in-flex">
            <strong>描述：</strong>
            <input type="text" v-model="form.desc" class="input-box">
          </div>
          <br>
          <div class="in-flex">
            <strong>创建时间：</strong>
            <input type="date" v-model="form.cDate" class="input-box">
          </div>
          <div class="in-flex">
            <strong>更新时间：</strong>
            <input type="date" v-model="form.uDate" class="input-box">
          </div>
        </div>
        <div class="form-button">
          <el-button @click="search()" icon="el-icon-search">搜索</el-button>
          <el-button class="el-button" @click="doReset()">重置</el-button>
        </div>
    </div>
    <table class="table-table">
      <thead class="table-head">
        <tr>
<!--          <th>序号</th>-->
          <th>状态</th>
          <th>天数</th>
          <th>描述</th>
          <th>创建时间</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="item of sugarmark.resultData.list" :key="item.id">
<!--          <td v-text="item.id"></td>-->
          <td>
            <input type="radio" :checked="item.status" style="transform: scale(1.5)">
<!--            <SelectButton flag="${item.status}" style="margin: auto"></SelectButton>-->
          </td>
          <td v-text="item.days"></td>
          <td v-text="item.desc"></td>
          <td v-text="item.cDate"></td>
          <td v-text="item.uDate"></td>
          <td>
            <el-button-group>
              <el-button @click="modify(item.id)">编辑</el-button>
              <el-button @click="del(item.id)">删除</el-button>
            </el-button-group>
          </td>

          <el-drawer :visible.sync="updateFlag" direction="rtl" title="更新记录" :before-close="handleClose">
<!--            <ModifySugarMark :item="updateVo"></ModifySugarMark>-->
            <div class="box">
<!--              <div class="in-flex">-->
<!--                <strong>序号：</strong>-->
<!--                <input type="text" v-model="updateVo.id" class="input-box" disabled>-->
<!--              </div>-->
              <div class="in-flex">
                <strong>状态：</strong>
                <el-radio-group v-model="updateVo.status">
                  <el-radio-button label="true" value="true"></el-radio-button>
                  <el-radio-button label="false" value="false"></el-radio-button>
                </el-radio-group>
              </div>
              <div class="in-flex">
                <strong>天数：</strong>
                <input type="number" v-model="updateVo.days" class="input-box"  disabled>
              </div>
              <div class="in-flex">
                <strong>描述：</strong>
                <input type="text" v-model="updateVo.desc" class="input-box">
              </div>
              <div class="in-flex">
                <strong>创建时间：</strong>
                <input type="date" v-model="updateVo.cDate" class="input-box"  disabled>
              </div>
              <div class="in-flex">
                <strong>更新时间：</strong>
                <input type="date" v-model="updateVo.uDate" class="input-box"  disabled>
              </div>
              <br>
              <div>
                <el-button @click="saveUpdate()" style="width: 60%;color: white; background-color: dodgerblue;"  icon="el-icon-check">保存</el-button>
              </div>
            </div>
          </el-drawer>

        </tr>
      </tbody>
    </table>
    <div class="table-button">
<!--        <PagintionBarral v-on:changeCurPage="changeCurPage"></PagintionBarral>-->
      <div class="p-box">
        <div>
          <el-button v-for="i in showPages" :key="i" @click="jump(i)" :type="i == iPage? 'primary':null">{{i}}</el-button>
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

      <br>
        <el-button @click="createFlagInit()" style="width: 30%" icon="el-icon-plus">新建记录</el-button>

        <el-drawer :visible.sync="createFlag" direction="rtl" title="新建记录" :before-close="handleCloseAdd">
          <!--            <ModifySugarMark :item="updateVo"></ModifySugarMark>-->
          <div class="box">
            <div class="in-flex">
              <strong>状态：</strong>
              <el-radio-group v-model="createVo.status">
                <el-radio-button label="true" value="true"></el-radio-button>
                <el-radio-button label="false" value="false"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="in-flex">
              <strong>天数：</strong>
              <input type="number" v-model="createVo.days" class="input-box">
            </div>
            <div class="in-flex">
              <strong>描述：</strong>
              <input type="text" v-model="createVo.desc" class="input-box" default="OK">
            </div>
            <div class="in-flex">
              <strong>创建时间：</strong>
              <input type="date" v-model="createVo.cDate" class="input-box">
            </div>
            <br>
            <div>
              <el-button @click="saveNew()" style="width: 60%;color: white; background-color: dodgerblue;" icon="el-icon-check">保存</el-button>
            </div>
          </div>
        </el-drawer>
    </div>
  </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
// import PagintionBarral from '@/components/PagintionBarral'
// import SelectButton from "@/components/buttons/SelectButton"
// import ModifySugarMark from "@/components/ModifySugarMark"

// function doCover() {
//   document.getElementById("coverPage").innerHTML = document.getElementById("coverPage").innerHTML+"abc";
// }

export default {
  name: "SugarMark",
  components: {
    // PagintionBarral
    // ModifySugarMark
  },
  data(){
    return {
      form: {
        id: '',
        status: '',
        days: '',
        desc: '',
        cDate: '',
        uDate: ''
      },
      showData:{},
      updateFlag: false,
      updateVo: {},
      createFlag: false,
      createVo:{},
      coverFlag: false,
      pages: 0,
      iPage: 1,
      total: 0,
      showPages:[],
      timeInterval: setInterval(this.doPagesInit,1000),
      countDoPage: 0,
      // timeDoRefresh: setInterval(this.dorefresh,1000),
      doRefreshFlag: null,
      countRefreshTime: 0
    }
  },
  methods: {
    ...mapActions({
      getSugarMarks: 'sugarmark/getR',
      doSearch: 'sugarmark/Search',
      doDel: 'sugarmark/delete',
      doUpdate: 'sugarmark/updateMark',
      doCreate: 'sugarmark/createMark'
    }),
    formInit() {
      this.form.id = '',
          this.form.id = '',
          this.form.status = '',
          this.form.days = '',
          this.form.desc = '',
          this.form.cDate = '',
          this.form.uDate = ''
    },
    createFlagInit() {
      this.createFlag=true;
      this.createVo.desc="OK";
      //this.createVo.status=true;
      let temp=new Date();
      let temp_month=temp.getMonth()+1;
      let temp_month_str="";
      if(temp_month<10) {
        temp_month_str="0"+temp_month;
      }else{
        temp_month_str += temp_month;
      }
      let temp_day=temp.getDate();
      let temp_day_str="";
      if(temp_day<10){
        temp_day_str="0"+temp_day;
      }else {
        temp_day_str+=temp_day;
      }
      this.createVo.cDate=temp.getFullYear()+"-"+temp_month_str+"-"+temp_day_str;
      console.log("createFlagInit has been called!");
      console.log("the cdate is "+this.createVo.cDate);
      let temp_day_misecond = (new Date(this.createVo.cDate).getTime() - new Date("2021-10-28").getTime()) / 86400000 + 1;
      this.createVo.days = temp_day_misecond;
    },
    // changeCurPage(changeCurPage) {
    //   this.$store.state.sugarmark.curPage = changeCurPage;
    //   this.getSugarMarks();
    // },
    dorefresh() {
      console.log("countRefresh is: "+this.countRefreshTime);
      if(this.$store.state.sugarmark.responseVO.code == 200) {
        clearInterval(this.doRefreshFlag);
        this.coverFlag = false;
        this.countRefreshTime = 0;
        this.getSugarMarks();
        this.doRefreshFlag = null;
        this.$store.state.sugarmark.responseVO = {}
      }else if(this.countRefreshTime >= 5){
        clearInterval(this.doRefreshFlag);
        this.coverFlag = false;
        this.countRefreshTime = 0;
        this.getSugarMarks();
        this.doRefreshFlag = null;
        this.$store.state.sugarmark.responseVO = {}
        alert("超时，刷新观察数据有无变化！");
      }
      else {
        this.countRefreshTime += 1;
      }
      // this.getSugarMarks();
    },
    search() {
      console.log("do search...");
      this.doSearch(this.form);
    },
    doReset() {
      this.formInit();
    },
    del(id) {
      this.coverFlag = true;
      this.doDel(id);
      this.total--;
      this.pages = Math.ceil(this.total/10);
      this.doRefreshFlag = setInterval(this.dorefresh,1000);
      // window.location.reload();
    },
    saveNew() {
      this.createFlag = false;
      this.coverFlag = true;
      this.doCreate(this.createVo);
      this.createVo={};
      this.total++;
      this.pages = Math.ceil(this.total/10);
      this.doRefreshFlag = setInterval(this.dorefresh,1000);
    },
    saveUpdate() {
      this.updateFlag = false;
      this.coverFlag = true;
      this.doUpdate(this.updateVo);
      this.doRefreshFlag = setInterval(this.dorefresh,1000);
      // this.timeDoRefresh;
    },
    modify(id) {
      // console.log("id is: "+id);
      for(let temp of this.$store.state.sugarmark.resultData.list) {
        if(temp.id == id) {
          this.updateVo = temp;
          break;
        }
      }
      this.updateFlag = true;
    },
    handleCloseAdd() {
      this.createFlag = false;
      this.createVo = {};
    },
    handleClose() {
      // this.$confirm('确认关闭？').then(() => {
      //   this.updateFlag = false;
      // }).catch(() => {});
      this.updateFlag = false;
      this.getSugarMarks();
    },
    pagesInit() {
      this.total = this.$store.state.sugarmark.total;
      console.log("total is:"+this.$store.state.sugarmark.total);
      this.pages = Math.ceil(this.$store.state.sugarmark.total/10);
      console.log("pages is: "+this.pages);
      this.setShowPages();
    },
    setShowPages() {
      this.showPages.splice(0,this.showPages.length);
      if(this.total<=3){
        for(let i=1;i<=this.total;++i){
          this.showPages.push(i);
        }
      }else {
        if (1 == this.$store.state.sugarmark.curPage || 2 == this.$store.state.sugarmark.curPage) {
          this.showPages.push(1, 2, 3, this.pages);
        } else if (this.$store.state.sugarmark.curPage == this.pages) {
          let temp = this.$store.state.sugarmark.curPage;
          this.showPages.push(1, temp - 2, temp - 1, temp);
        } else if(this.$store.state.sugarmark.curPage == this.pages-1) {
          let temp = this.$store.state.sugarmark.curPage;
          this.showPages.push(1, temp - 1, temp, temp+1);
        } else {
          let temp = this.$store.state.sugarmark.curPage;
          this.showPages.push(1, temp - 1, temp, temp + 1, this.pages);
        }
      }
    },
    doPagesInit() {
      if(this.total != 0 || this.countDoPage >= 10) {
        clearInterval(this.timeInterval);
        this.countDoPage = 0;
      }
      this.pagesInit();
      this.countDoPage += 1;
    },
    jump(i) {
      console.log("Jump...");
      this.$store.state.sugarmark.curPage = i;
      this.iPage = i;
      this.setShowPages();
      this.getSugarMarks();
    }
  },
  computed: {
    ...mapState(['sugarmark'])
  },
  created() {
    // console.log("In SugarMark...");
    this.getSugarMarks();
    // this.timeInterval;
  }
}
</script>

<style>
body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#coverPage{
  position: fixed;
  background-color: gainsboro;
  width: 50%;
  height: 400px;
  z-index: 5;
  /*transform: scale(2);*/
}
.sugar{
  width: 75%;
  /*border: 1px blue solid;*/
  margin: auto;
  text-align: left;
}
.form{
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
}
.div-flex{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.in-flex{
  padding: 15px;
}
.input-box{
  padding: 10px;
  border-radius: 5px;
  border: 1px gainsboro solid;
  width: 50%;
}
.form-button{
  margin-top: 15px;
  text-align: center;
}
.table-table{
  width: 90%;
  margin: auto;
  text-align: center;
  /*border: 1px blue solid;*/
}
.table-head{
  font-size: x-large;
}
.table-body{
  font-size: larger;
}
tr>th {
  border-bottom: 1px gainsboro solid;
  padding: 15px;
}
tr>td {
  border-bottom: 1px gainsboro solid;
  padding: 10px;
}
.table-button{
  margin: 15px;
  text-align: center;
}
.p-box{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>