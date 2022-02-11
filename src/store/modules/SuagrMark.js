import {get,post,put,del} from '@/utils/request'

export default {
  namespaced: true,
  state: {
    resultData : {},
    responseVO: {},
    curPage : 1,
    pageSize : 10,
    total: 0
  },
  // mutations: {
  //   getRM(context) {
  //     this.getR(context);
  //   },
  //   SearchM(context,params) {
  //     this.Search(context,params);
  //   }
  // },
  actions: {
    getR(context) {
      get('/getmarks' + `/${context.state.curPage}` + `/${context.state.pageSize}`, null)
          .then(response => {
            context.state.resultData = response.data.obj;
            context.state.total = response.data.obj.total;
          }).catch(error => {
            alert("操作失败！" + error);
          });
    },
    Search(context,params) {
      // console.log(params);
      post('/getMarksByPost'+`/${context.state.curPage}`+`/${context.state.pageSize}`,params)
          .then(response => {
            context.state.resultData = response.data.obj;
            context.state.total = response.data.obj.total;
          }).catch(error => {
        alert("操作失败！"+error);
      });
    },
    delete(context,id) {
      del('/delete'+`/${id}`,id)
          .then(response => {
            context.state.responseVO = response.data;
          }).catch(error => {
        alert("操作失败！"+error);
      });
    },
    updateMark(context,params) {
      put("/update",params)
          .then( response => {
            context.state.responseVO = response.data;
          }).catch(error => {
        alert("操作失败！"+error);
      });
    },
    createMark(context,params) {
      post("/add",params)
          .then(response => {
            context.state.responseVO = response.data;
          }).catch(error => {
        alert("操作失败！"+error);
      });
    }
  }
}