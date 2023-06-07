<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                购买管理
                </span>

       </div>

    </div>

    <div class="visualizationOfHome">
      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto" @click="votePageApper(1)">

          <!--eslint-disable-next-line-->
          <transition-group name="list-complete" tag="p" appear v-for="i in myPurchase">

            <div v-show="flagOftext" class="textArea" :key="i">
                <!--    现有投票-->
                <div class="voteNowHave">
                  <div>
                    投&nbsp;票&nbsp;详&nbsp;情&nbsp;:
                    <span>{{i.recordId}}</span>
                  </div>
                </div>
            </div>
          </transition-group>
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
  name: "Shop",
  data(){
    return {
      changeBtn:'返回',
      channel:[],
      myPurchase:[],  //储存我创建的投票，里面数据删掉
      user: localStorage.getItem("user"),
      flagOfvoteCenter:false,
      flagOftext:true,
      flagOfvoteData:true,
      flagOfvoteContent:true,
      flagOfstartCreate:false,


    }
  },
  methods:{

    votePageApper(i){
      this.$router.push({
                name:"ShopContent",
                query:{
                  voteItem:i  //变量名准备改
                }
            })
    },

    goBack() {
      this.$router.go(-1)
    },


    list(){
      this.request.get("/purchase/list").then(res => {
        this.myPurchase = res.data
      })
    },

    submitForm() {

      this.request.post('/vote/add/', this.dynamicValidateForm).then(res=>{
        if(res.code=="1"){
          this.$message.success("提交成功！")
          this.vote_Id = res.data
          console.log(this.vote_Id)
          this.dynamicValidateForm.options.unshift({
            voteId:'',
            optionName: ''
          })
          this.dynamicValidateForm.options[0].optionName=this.dynamicValidateForm.option1;
          for(let i=0;i<this.dynamicValidateForm.options.length;i++){
            console.log(i+" "+this.vote_Id)
            this.dynamicValidateForm.options[i].voteId = this.vote_Id
          }
          // for(let i in this.dynamicValidateForm.options){
          //   i.voteId = this.vote_Id
          // }
          this.request.post('/option/add', this.dynamicValidateForm.options).then(res=>{
            if(res.code=="1"){
              this.$message.success("提交成功！")
            }
            else{
              this.$message.error("提交失败！")
            }
          })
          this.flagOftext = !this.flagOftext,
              this.flagOfstartCreate = !this.flagOfstartCreate
        }
        else{
          this.$message.error("提交失败！")
        }
        this.request.get("/vote/mine").then(res => {
          this.myPurchase = res.data
        })
      })

    },

    startCreate(){

      var n = this.changeBtn;
      this.changeBtn = this.$refs.btn1.$el.innerText;
      //this.$refs.btn1是取上面id为btn1的元素（说id是不严谨的）
      this.$refs.btn1.$el.innerText = n;
      this.flagOftext = !this.flagOftext;
      this.flagOfstartCreate = !this.flagOfstartCreate;
      // this.request.get("/channel/list")
    },
  },
  created() {
    this.list()
    // this.loadMyVote()
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
  transform: scale(1,1);
}


.textArea{

  width: 95%;
  height: 100px;
  background-color: white;
  margin-left: 30px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #87d7efb0, #e0d394 70%, #e7eda1b0);
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
}

.textArea div{
  margin-top: 0px;
}

.voteCreate{
  flex: 14;
  width: 100%;
  overflow-y: auto;
  position: relative;
}
.voteCreate div{
  border-radius: 15px;
  margin-top: 20px;

}

.voteCreate div:hover{
  transform: scale(1,1);
}

.voteArea div{
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 1;
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
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.voteChannel{
  flex: 6;
  width: 100%;
}

</style>