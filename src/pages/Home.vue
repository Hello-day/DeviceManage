<template>
    <div class="mainBodyOfHome">
<!--    数据展示-->
        <div class="dataDisplayOfHome">
<!--          标题  -->
            <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                欢迎来到设备管理系统
                </span>
                <span style="flex: 2;font-size: 12px;font-weight: bold;color: #4E5C72;justify-content: end;display: flex">

                </span>
            </div>
<!--            数据具体展示-->
            <div class="detailedData">
                <!--            用户数-->
                <div class="dataBlocks" style="background-color: #E1F3D8">
                    <div style="flex: 1;width: 100%;height: 100%;display: flex;align-items: end;padding-left: 10px;font-weight: bold">
                            <span>已注册用户</span>
                    </div>
                    <div style="font-family: PingFangSC-Semibold,PingFang SC;font-size: 25px;font-weight: bold; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">
                                <span>{{Num}}人</span>
                    </div>
                </div>
                <!--            投票项目数-->
                <div class="dataBlocks" style="background-color: #FAECD8">
                    <div style="flex: 1;width: 100%;height: 100%;display: flex;align-items: end;padding-left: 10px;font-weight: bold">
                            <span>购入设备数</span>
                    </div>
                    <div style="font-family: PingFangSC-Semibold,PingFang SC;font-size: 25px;font-weight: bold; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">
                        <span>{{Item}}部</span>
                    </div>
                </div>
                <!--            参与人数-->
                <div class="dataBlocks" style="background-color:#FDE2E2">
                    <div style="flex: 1;width: 100%;height: 100%;display: flex;align-items: end;padding-left: 10px;font-weight: bold">
                        <span>库存设备数</span>
                    </div>
                    <div style="font-family: PingFangSC-Semibold,PingFang SC;font-size: 25px;font-weight: bold; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">
                        <span>{{Voted}}部</span>
                    </div>
                </div>

                <!--            团队人数-->
                <div class="dataBlocks" style="background-color:#edc28257"
                >
                    <div style="flex: 1;width: 100%;height: 100%;display: flex;align-items: end;padding-left: 10px;font-weight: bold">
                        <span>团队人数</span>
                    </div>
                    <div style="font-family: PingFangSC-Semibold,PingFang SC;font-weight:bold;font-size: 20px; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">
                        <span>3人</span>
                    </div>
                </div>
            </div>
        </div>

    <div class="visualizationOfHome">

       <div class="viewOfvoteData">

        <div class="voteChannel" v-infinite-scroll="load"  >

          <!--写死测试-->
          <div  class="textArea" style="background-image: radial-gradient(circle farthest-side at 10% 90%, #98e2ec8a, #f4d59d87 70%, #e7eda1b0);">
            <div class="headOfvoteData">
              <span >待归还订单</span>
            </div>
            <div class="voteChannel">
              <!--    现有投票-->
              <div class="voteNowHave" style="margin-top: -45px;margin-bottom: 10px;">
                <template >
                  <el-table
                      :data="tabledatas"
                      stripe
                      style="width: 100% ;margin-top: 30px;overflow-y:auto">
                    <el-table-column
                        prop="recordId"
                        label="记录号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="deviceId"
                        label="设备号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="lendDate"
                        label="借出日期">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                      <template slot-scope="scope">
                        <el-button
                            @click="handleClick(scope.row)"
                            type="text"
                            size="small"
                        >点击归还</el-button>

                      </template>
                    </el-table-column>
                  </el-table>
                </template>

              </div>
            </div>
          </div>
          <!--写死测试-->


        </div>


       </div>

    </div>

    </div>

</template>

<script>
import 'animate.css'
// eslint-disable-next-line no-unused-vars
import axios, {Axios as request} from "axios";
export default {
  name: "Home",
  data() {
    return {
      channel: [],
      count: 0,
      Num: '',
      Item: '',
      Voted: '',
      ChannelId: '',
      tabledatas:[]
    }
  },
  methods: {

    list() {
      this.request.get("/lend/list").then(res => {
        if (res.code == 1) {
          this.tabledatas = res.data
        } else {
          prompt(res.msg)
        }

      })
      this.request.get("/user/cnt").then(res => {
        if (res.code == 1) {
          this.Num = res.data
        } else {
          prompt(res.msg)
        }

      })
      this.request.get("/device/cnt").then(res => {
        if (res.code == 1) {
          this.Item = res.data
        } else {
          prompt(res.msg)
        }
      })
    },

  },

  created() {
     this.list();
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
    flex: 1;
    width: 100%;
    height: 500px;
    background-color: rgba(255,255,255,0.8);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
  }

  .voteChannel{
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: -15px;      /*改大框位置*/
    justify-content: center;
    flex-direction: column;
  }

  .voteChannel div{
    border-radius: 15px;
    transition: all 0.5s;
  }

 .textArea{   /*渐变色大框*/
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 440px;
  background-color: white;
  margin-left: 45px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #98e2ec8a, #8e9cdd8a 60%, #e7eda1b0);
   box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.05);
  }


  .liList li{
    text-align: center;
  }


  .voteNowHave{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    flex: 2;
    font-size: 13px;
    font-weight: bold;
    color: #464646;
    padding: 0 15px
  }


.headOfvoteData{  /*改标题文字属性*/
  height: 100%;
  width: 100%;
  flex: 2;
  display: flex;
  align-items: center;
  margin-top: -25px;
  font-weight: bold;
  font-size: 16px;
  justify-content: center;
}

  /*以下都是头部，不用看*/
    .dataDisplayOfHome{
        flex: 1;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 30px;
    }

    .visualizationOfHome{
        flex: 1;
        height: 100%;
        width: 100%;
        background-color: #DAF3EE;
    }

    .headOfDataDisplay{
        flex: 2;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: end;
    }

    .detailedData{
        flex: 4;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .dataBlocks{ /*头部数据块*/
        flex: 1;
        width: 100%;
        height: 80%;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
    }
    


.voteChannel{
  flex: 6;
  width: 100%;
}


</style>