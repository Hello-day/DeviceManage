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

                  <el-button round icon="el-icon-edit" @click="editAll">批量编辑</el-button>
                  <el-button round icon = "el-icon-finished" @click="submit">提交</el-button>
                  <el-button round icon = "el-icon-plus" @click="addAll">批量增加</el-button>
                  <el-button round icon="el-icon-delete" @click="delectAll">批量删除</el-button>
                </div>

                  <el-table :data="tabledatas" border @selection-change="handleSelectionChange" style="margin-top: 10px">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="用户ID">
                      <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="用户名">
                      <template slot-scope="scope">
                        <span>{{scope.row.text}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button round @click="open">修改密码</el-button>
                        <el-button round type="danger" plain @click="delect(scope.row.title,scope.$index)">删除用户</el-button>
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
import Vue from 'vue'
export default {
  data() {
    return {
      tabledatas: [],
      multipleSelection: [],
      user:[],
    }
  },
  created() {
    this.tabledatas = [
      { title: '1', text: 'admin' },
      { title: '2', text: 'ss222ssa' },
    ]
    this.tabledatas.map(i => {
      i.show = false
      return i
    })
  },
  methods: {
    table(){
      this.request.get("/user/check").then(res=>{
        if(res.code == 1){
          this.myParticipate=res.data
        }else{
          prompt(res.msg)
        }

        // console.log(this.channel)
      })
      console.log(this.myParticipate)
    },
    open() {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '新密码是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },

    submit() {
      this.tabledatas.map((i, index) => {
        i.show = false
        Vue.set(this.tabledatas, index, i)
      })
    },

    // 单个删除
    delect(userId,index) {
      this.tabledatas.splice(index, 1)

        this.request.get('/user/delete/'+ userId).then(res=>{  //路由没配
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