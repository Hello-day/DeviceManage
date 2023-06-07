<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                用户管理
                </span>
      </div>
    </div>


    <div class="visualizationOfHome">
      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto">
          <div class="textArea" >
            <div class="voteChannel">
              <div class="voteNowHave"  style="overflow-y:auto" >
                <div style="margin: auto">
                  <el-button round icon="el-icon-edit">批量编辑</el-button>
                  <el-button round icon = "el-icon-finished">提交</el-button>
                  <el-button round icon = "el-icon-plus" @click="addAll">批量增加</el-button>
                  <el-button round icon="el-icon-delete" @click="delectAll">批量删除</el-button>
                </div>

                  <el-table :data="tabledatas" border @selection-change="handleSelectionChange" style="margin-top: 10px">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="userId" label="用户ID">
                    </el-table-column>
                    <el-table-column prop="userName" label="用户名">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button round @click="changePWD(scope.row.userName)">修改密码</el-button>
                        <el-button round type="danger" plain @click="delect(scope.row.userId,scope.$index)">删除用户</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      tabledatas: [],
      multipleSelection: [],
    }
  },
  created() {
    this.table()

  },
  methods: {
    table(){
      this.request.get("/user/list").then(res=>{
          this.tabledatas=res.data
      })
     // console.log(this.tabledatas)
    },

    changePWD(userName) {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(( value ) => {
        this.request.post("/user/change/"+ userName,{password: value.value}).then(res=>{ //这边不行
          if(res.code=="1"){
            this.$message({
              type: 'success',
              message: '新密码是: ' + value.value
            })
          }
          else{
            this.$message.error("修改失败！")
          }
        })
       ;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },

    // 单个删除
    delect(userId,index) {
      this.tabledatas.splice(index, 1)
        this.request.get('/user/delete/'+ userId).then(res=>{
          if(res.code=="1"){
            this.$message.success("删除成功！")
          }
          else{
            this.$message.error("删除失败！")
          }
        })
    },

    //批量新增
    addAll() {
      if (this.multipleSelection.length == 0) {
        let list = {
          title: "",
          text: ""
        }
        this.tabledatas.push(list)
      } else {
        this.multipleSelection.forEach((val, index)=> {
          this.tabledatas.splice(index, 0,JSON.parse(JSON.stringify(val)))
        });
      }
    },
    //批量删除
    delectAll() {
      for (let i = 0; i < this.tabledatas.length; i++) {
        const element = this.tabledatas[i];
        element.id = i
      }
      if (this.multipleSelection.length == 0) this.$message.error('请先至少选择一项')
      this.multipleSelection.forEach(element => {
        this.tabledatas.forEach((e, i) => {
          if (element.id == e.id) {
            this.tabledatas.splice(i, 1)
          }
        });
      });
    },
    //选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },

}

</script>

<style scoped>

.mainBodyOfHome{
  display: flex;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #FFE8EA, #EDF3FF 70%, #EDF2FB);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.viewOfvoteData{
  width: 100%;
  height: 570px;
  background-color: #F5F7F9;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  right: 0px;
}

.voteChannel{
  flex: 14;
  width: 100%;
  overflow-y: auto;
  position: relative;
}
.voteChannel div{
  border-radius: 15px;
  margin-top: 20px;
  transition: all 0.5s;
}

.voteChannel div:hover{
  transform: scale(1.01,1.01);
}



.liList li{
  text-align: center;
}

.liList li:hover{
  color: #257B5E;
  background-color: rgba(37,123,94,0.1);
}


.voteNowHave{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90%;
  width: 100%;
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  color: #464646;
  padding: 15px 15px
}


.dataDisplayOfHome{
  flex: 2;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px;
}
.visualizationOfHome{
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: #DAF3EE;
}

.headOfDataDisplay{
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}


.voteChannel{
  flex: 14;
  width: 100%;
  overflow-y: auto;
  position: relative;

}

.voteChannel div{
  border-radius: 15px;
  margin-top: 20px;
  transition: all 0.5s;
}

.voteChannel div:hover{
  transform: scale(1,1);
}


.textArea{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 500px;
  background-color: white;
  margin-left: 30px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #87d7efb0, #e4faa891 70%, #e7eda1b0);
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
}

.textArea div{
  margin-top: 0px;
}

.voteChannel{
  flex: 6;
  width: 100%;
}

</style>