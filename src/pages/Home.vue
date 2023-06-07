<template>
    <div class="mainBodyOfHome">
<!--    数据展示-->
        <div class="dataDisplayOfHome">
<!--          标题  -->
            <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                设备管理系统
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
          <div  class="textArea" >
            <div class="headOfvoteData">
              <span >售出订单数</span>
            </div>
            <div class="voteChannel" @click="voteContentApper(i)">
              <!--    现有投票-->
              <div class="voteNowHave">
                <div>
                  用&nbsp;户&nbsp;信&nbsp;息&nbsp;:
                  <span>test2</span>
                </div>
              </div>
            </div>
          </div>
          <!--写死测试-->
          <!--写死测试-->
          <div  class="textArea" style="background-image: radial-gradient(circle farthest-side at 10% 90%, #98e2ec8a, #f4d59d87 70%, #e7eda1b0);">
            <div class="headOfvoteData">
              <span >转借订单数</span>
            </div>
            <div class="voteChannel" @click="voteContentApper(i)">
              <!--    现有投票-->
              <div class="voteNowHave">
                <div>
                  用&nbsp;户&nbsp;信&nbsp;息&nbsp;:
                  <span>test2</span>
                </div>
              </div>
            </div>
          </div>
          <!--写死测试-->



          <!--eslint-disable-next-line-->

        </div>
         <div class="voteChannel" v-infinite-scroll="load"  >


           <!--写死测试-->
           <div  class="textArea" style="background-image: radial-gradient(circle farthest-side at 10% 90%, #98e2ec8a, #f4d59d87 70%, #e7eda1b0);">
             <div class="headOfvoteData">
               <span >维修订单数</span>
             </div>
             <div class="voteChannel" @click="voteContentApper(i)">
               <!--    现有投票-->
               <div class="voteNowHave">
                 <div>
                   用&nbsp;户&nbsp;信&nbsp;息&nbsp;:
                   <span>test2</span>
                 </div>
               </div>
             </div>
           </div>
           <!--写死测试-->
           <!--写死测试-->
           <div  class="textArea" >
             <div class="headOfvoteData">
               <span >test2</span>
             </div>
             <div class="voteChannel" @click="voteContentApper(i)">
               <!--    现有投票-->
               <div class="voteNowHave">
                 <div>
                   用&nbsp;户&nbsp;信&nbsp;息&nbsp;:
                   <span>test2</span>
                 </div>
               </div>
             </div>
           </div>
           <!--写死测试-->



           <!--eslint-disable-next-line-->

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
      flagOfvoteCenter: false,
      flagOftext: true,
      flagOfvoteData: true,
      flagOfvoteContent: true,
      color:this.coloring()
    }
  },
  methods: {

    list() {
      this.request.get("/channel/list").then(res => {
        if (res.code == 1) {
          this.channel = res.data
        } else {
          prompt(res.msg)
        }

      })
    },

    loadNum() {
      this.request.get("/user/count").then(res => {
        this.Num = res.data.cnt
        this.Item = res.data.numOfVote
        this.Voted = res.data.numOfPeople
      })
    },

  },

  created() {

  },
  randomRgb(item) {
    let R = Math.floor(Math.random() * 255);
    let G = Math.floor(Math.random() * 255);
    let B = Math.floor(Math.random() * 255);
    return {
      width: (item.num / item.total * 100) + '%', // 进度条
      background: 'rgb(' + R + ',' + G + ',' + B + ')'
    };
  }


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
    flex: 2;
    width: 100%;
    height: 500px;
    background-color: rgba(255,255,255,0.8);
    border-radius: 15px;
    display: flex;
    flex-direction: row;
  }

  .voteChannel{
    flex: 2;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .voteChannel div{
    border-radius: 15px;
    margin-top: 20px;
    transition: all 0.5s;
  }

  .voteChannel div:hover{
    transform: scale(1.01,1.01);
  }


 .textArea{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 200px;
  background-color: white;
  margin-left: 25px;
  margin-right: 15px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #98e2ec8a, #8e9cdd8a 60%, #e7eda1b0);
   box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
  }

  .textArea div{
  margin-top: 0px;
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
    flex-direction: row;
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

  .voteNowHave:hover{
    cursor: pointer;
    background-color: rgba(231,234,237,0.7);
    transform: scale(0,0);
    width: 99%;
    border-radius: 10px;

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
    .dataBlocks{
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
    

.headOfvoteData{
  height: 100%;
  width: 100%;
  flex: 2;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-weight: bold;
  font-size: 16px;
  justify-content: center;
}

.voteChannel{
  flex: 6;
  width: 100%;
}


</style>