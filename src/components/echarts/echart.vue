<!-- echarts -->
<template>
  <div class="page">
    <div class="view" v-if="echartIndex==1||echartIndex==2||echartIndex==4">
      <div class="one" v-if="echartIndex==1">
        <div class="contentBox">
          <div class="tabs">
            <div class="container">
              <div class="content">
                <div v-for="(item,index) in equipmentList" :key="index"
                     :class="launch==item.value?'tabItem active':'tabItem'"
                     @click="toggleLauch(item.value,item.children,item.name)">{{ item.name }}
                </div>
                <el-upload
                    v-if="isEditc=='true'"
                    ref="upload"
                    :headers="headers"
                    style="float: right;display: inline-block"
                    :on-preview="handlePreview"
                    :action="action1"
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                    :file-list="fileList"
                    :on-success="success"
                    :on-error="errors"
                >
                  <div class="tabItem" @click="EquipmentImport" v-if="isEditc=='true'" style="float: right">导入</div>
                </el-upload>
                <div class="tabItem" style="float: right" @click="uploadTemplate" v-if="isEditc=='true'">下载模板</div>

              </div>
            </div>
          </div>
          <div class="tabs" style="padding: 0 0 5px 0">
            <div class="container">
              <div class="content">
                <div v-for="(item,index) in nowequipmentList" :key="index"
                     :class="sendIndex==index?'tabItem active':'tabItem'" @click="toggleSend(item,index)">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <!--        单个装备的区域-->
          <div class="content">
            <div class="equipmentBox">
              <div class="equipmentItem">
                <div class="box">
                  <table border="0" cellpadding="1" cellspacing="1">
                    <tr>
                      <td width="10%">装备名称</td>
                      <td>发射国家</td>
                      <td>发射时间</td>
                      <td>发射方式</td>
                      <td width="40%">装备描述</td>
                      <td v-if="isEditc=='true'" width="15%">操作</td>
                    </tr>
                    <tr v-for="(item,index) in equipList" :key="index">
                      <td>{{ item.equipName }}</td>
                      <td>{{ item.launchCountry }}</td>
                      <td>{{ item.launchTime }}</td>
                      <td>{{ item.launchWay }}</td>
                      <td>{{ item.equipDescribe }}
                        <viewer :images="item.imArr">
                          <img :src="item1" v-for="(item1,index1) in item.imArr" :key="index1"  style="width: 50px;height: 50px;cursor:pointer">
                        </viewer>
                      </td>
                      <td v-if="isEditc=='true'">
                        <el-button  type="primary" @click="tableEdit(item)">编辑</el-button>
                        <el-button  type="danger" @click="tableDel(item)">删除</el-button>
                      </td>
                    </tr>
                  </table>
                  <div class="block">
                    <div class="fullpage" style="text-align: right;margin-top: 10px">
                      <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="pageno"
                          :page-sizes="[10, 20, 30, 50]"
                          :page-size="pagesize"
                          layout="total,  prev, pager, next, jumper"
                          :total="total"
                      >
                      </el-pagination>
                    </div>
                  </div>
                  <!--                  <Pie :data="equipPie" style="width: 100%; height: 300px"/>-->
                </div>
                <div class="line"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="two" v-if="echartIndex==2">
        <div class="contentBox">
          <div class="tabs" style="padding-bottom: 5px">
            <div class="container">
              <div class="content">
                <div :class="exercise==item?'tabItem active':'tabItem'" v-for="(item,index) in maneuverClass"
                     :key="index" @click="Exercisetoggle(item)">{{ item }}
                </div>
                <el-upload
                    v-if="isEditc=='true'"
                    ref="upload"
                    :headers="headers"
                    style="float: right;display: inline-block"
                    :on-preview="handlePreview"
                    :action="action2"
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                    :file-list="fileList"
                    :on-success="success"
                    :on-error="errors"
                >
                  <div class="tabItem" @click="ExerciseImport" v-if="isEditc=='true'" style="float: right">导入</div>
                </el-upload>
                <div class="tabItem" style="float: right" @click="exerciseTemplate" v-if="isEditc=='true'">下载模板</div>
                <div class="tabItem" style="float: right" @click="addExercise" v-if="isEditc=='true'">新增</div>

              </div>
            </div>
          </div>
          <table border="0" width="100%" cellpadding="1" cellspacing="1">
            <tr>
              <td width="5%">演习时间</td>
              <td width="5%">演习国家</td>
              <td width="5%">演习地区</td>
              <td width="5%">演习级别</td>
              <td width="14%">演习目标</td>
              <td width="14%">演习场景</td>
              <td width="14%">演习单位</td>
              <td width="14%">演习人员</td>
              <td d>演习内容</td>
              <td v-if="isEditc=='true'">
                操作
              </td>
            </tr>
            <tr v-for="(item,index) in maneuversList" :key="index">
              <td>{{ item.manoeuvreTime }}</td>
              <td>{{ item.manoeuvreCountry }}</td>
              <td>{{ item.manoeuvreSite }}
                <viewer :images="item.SiteImg">
                  <img :src="item1" v-for="(item1,index1) in item.SiteImg"
                       :key="index1" style="width: 50px;height: 50px;cursor: pointer">
                </viewer>
              </td>
              <td>{{ item.manoeuvreLevel }}</td>
              <td>{{ item.manoeuvreTarget }}
                <viewer :images="item.TargetImg">
                  <img :src="item1" v-for="(item1,index1) in item.TargetImg"
                       :key="index1" style="width: 50px;height: 50px;cursor: pointer">
                </viewer>
              </td>
              <td>{{ item.manoeuvreScene }}
                <viewer :images="item.SceneImg">
                  <img :src="item1" v-for="(item1,index1) in item.SceneImg"
                       :key="index1" style="width: 50px;height: 50px;cursor: pointer">
                </viewer>
              </td>
              <td>{{ item.manoeuvreTroops }}
                <viewer :images="item.TroopsImg">
                  <img :src="item1" v-for="(item1,index1) in item.TroopsImg"
                       :key="index1" style="width: 50px;height: 50px;cursor: pointer">

                </viewer>
              </td>
              <td>{{ item.manoeuvreCrews }}
                <viewer :images="item.CrewsImg">
                  <img :src="item1" v-for="(item1,index1) in item.CrewsImg"
                       :key="index1" style="width: 50px;height: 50px;cursor: pointer">

                </viewer>
              </td>
              <td>{{ item.Content }}
                <viewer :images="item.ContentImg">
                  <img :src="item1" v-for="(item1,index1) in item.ContentImg"
                       :key="index1" style="width: 50px;height: 50px;cursor: pointer">

                </viewer>
              </td>
              <td v-if="isEditc=='true'">
                <el-button  type="primary" @click="tableEdit1(item)">编辑</el-button>
                <el-button  type="danger" @click="tableDel1(item)">删除</el-button>
              </td>
            </tr>
          </table>
          <div class="block">
            <div class="fullpage" style="text-align: right;margin-top: 10px">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageno"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="pagesize"
                  layout="total,  prev, pager, next, jumper"
                  :total="total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="four" v-if="echartIndex==4">
        <div class="contentBox">
          <div class="tabs" style="padding-bottom: 5px">
            <div class="container">
              <div class="content" style="padding-left: 0">
                <div :class="launch==1?'tabItem active':'tabItem'" @click="toggleLauch(1)">太空垃圾的威胁</div>
                <div :class="launch==2?'tabItem active':'tabItem'" @click="toggleLauch(2)">太空垃圾处理方法</div>
              </div>
            </div>
          </div>
          <div class="leftMian" style="padding-bottom: 20px;width: 100%" v-if="launch==1">
            <div class="contain">
              <!--            搜索区域-->
              <div class="searchBox">
                <!--                <div class="eHead" style="margin-top: 0;">-->
                <!--                  太空垃圾的威胁-->
                <!--                </div>-->
              </div>
              <div class="centerRegion">
                <p>太空垃圾（碎片）简介</p>
                <span>太空垃圾又称空间碎片或轨道碎片，是宇宙空间中除正在工作着的航天器以外的人造物体，包括运载火箭和航天器在发射过程中产生的碎片与报废的卫星，航天器表面材料的脱落，表面涂层老化掉下来的油漆斑块；航天器逸漏出的固体、液体材料；火箭和航天器爆炸、碰撞过程中产生的碎片。</span>
                <img class="gif" v-lazy="imgs.gif1" alt="">
                <span>据NASA的统计，截止2016年11月，地球轨道上大约有1亿块太空垃圾环绕地球运行，直径超过10厘米有27000多块，而直径超过1厘米的太空垃圾达20万个。</span>
                <img class="gif" v-lazy="imgs.gif2"></img>
              </div>
            </div>
            <div class="line"></div>
          </div>
          <div class="garbage" v-if="launch==2">
            <div class="leftMian" style="width:100%">
              <div class="contain" style="height: 100%">
                <!--            搜索区域-->
                <div class="searchBox">

                </div>
                <div class="centerRegion" >
                  <div class="left">
                    <div class="itemBox">
                      <full-page ref="fullpage" :options="options" id="fullpage" style="width: 100%">
                        <div class="section">
                          <div class="itemBoxx">
                            <div class="leftItem">
                              <p>避</p>
                              <span>加速发展现代太空监视系统，对太空垃圾进行严密的监视与跟踪，并采取有效的技术手段，使航天器及时避开太空垃圾。</span>
                            </div>
                            <div class="leftItem">
                              <img v-lazy="imgs.one" alt="">
                            </div>
                          </div>

                        </div>
                        <div class="section">
                          <div class="itemBoxx">
                            <div class="leftItem" style="background: none">
                              <img v-lazy="imgs.two" alt="">
                            </div>
                            <div class="leftItem" style="background: rgba(0, 103, 202, 0.298039215686275);">
                              <p>禁</p>
                              <span> 加速发展现代太空监视系统，对太空垃圾进行严密的监视与跟踪，并采取有效的技术手段，使航天器及时避开太空垃圾。</span>
                            </div>
                          </div>

                        </div>
                        <div class="section">
                          <div class="itemBoxx">
                            <div class="leftItem">
                              <p>清</p>
                              <span>加速发展现代太空监视系统，对太空垃圾进行严密的监视与跟踪，并采取有效的技术手段，使航天器及时避开太空垃圾。</span>
                            </div>
                            <div class="leftItem">
                              <img v-lazy="imgs.four" alt="">
                            </div>
                          </div>

                        </div>
                        <div class="section">
                          <div class="itemBoxx">
                            <div class="leftItem" style="background: none">
                              <img v-lazy="imgs.three" alt="">
                            </div>
                            <div class="leftItem" style="background: rgba(0, 103, 202, 0.298039215686275);">
                              <p>减</p>
                              <span>加速发展现代太空监视系统，对太空垃圾进行严密的监视与跟踪，并采取有效的技术手段，使航天器及时避开太空垃圾。</span>
                            </div>
                          </div>

                        </div>
                      </full-page>
                    </div>
                  </div>
                  <!--                  <div class="right">-->
                  <!--                    <img v-lazy="imgs.one" alt="">-->
                  <!--                    <img v-lazy="imgs.two" alt="">-->
                  <!--                    <img v-lazy="imgs.three" alt="">-->
                  <!--                  </div>-->
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="view active" v-if="echartIndex==3||echartIndex==5||echartIndex==6">
      <div class="three" v-if="echartIndex==3">
        <div class="contentBox">
          <div class="tabs" style="padding-bottom: 5px">
            <div class="container">
              <div class="content">
                <div v-for="(item,index) in classThreatenList" :key="index"
                     :class="Threatenindex==index?'tabItem active':'tabItem'" @click="togglethreat(item,index)">
                  {{ item.typename }}
                </div>
                <div class="tabItem" @click="delThreaten" v-if="isEditc=='true'" style="float: right">删除</div>
                <div class="tabItem" @click="editThreaten" v-if="isEditc=='true'" style="float: right">编辑</div>
                <div v-if="isEditc=='true'" class="tabItem" style="float: right" @click="threatenAdd">新增</div>
              </div>
            </div>
            <div class="container" style="margin-top: 10px;">
              <div class="content">
                <div v-for="(item,index) in sendclassThreatenList" :key="index"
                     :class="sendThreatenIndex==index?'tabItem active':'tabItem'" @click="togglesendthreat(item,index)">
                  {{ item.typename }}
                </div>
              </div>
            </div>
          </div>
          <div class="content" style="display: flex;">
            <p v-html="activeTable.contents" style="width:100%;height: calc(100vh - 280px);background-color: #fff;padding: 20px;overflow-y: scroll"></p>
          </div>
        </div>
      </div>
      <div class="five" style="position: relative" v-if="echartIndex==5">
        <div class="tabs">
          <div class="container">
            <div class="content">
              <div :class="fiveTabIndex==1?'tabItem active':'tabItem' " @click="toggleFive(1)">发射图</div>
              <div :class="fiveTabIndex==2?'tabItem active':'tabItem'" @click="toggleFive(2)">统计图</div>
              <div class="tabItem" style="float: right;" v-show="isChina" @click="wordBack">返回</div>
              <div class="tabItem" style="float: right" @click="editSatellite" v-if="fiveTab&&isEditc=='true'">编辑视图
              </div>
              <!--              <div class="tabItem" v-if="isLeft&&!fiveTab&&isEditc=='true'" style="float: right" @click="editFsc" >编辑视图</div>-->

              <el-upload
                  v-if="isLeft&&!fiveTab&&isEditc=='true'"
                  ref="upload"
                  :headers="headers"
                  style="float: right;display: inline-block"
                  :on-preview="handlePreview"
                  :action="action"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false"
                  :file-list="fileList"
                  :on-success="success"
                  :on-error="errors"
              >
                <div class="tabItem" v-if="isLeft&&!fiveTab&&isEditc=='true'" style="float: right"
                     @click="importTemplate">导入
                </div>
                <!--                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
              </el-upload>
              <div class="tabItem" v-if="isLeft&&!fiveTab&&isEditc=='true'" style="float: right" @click="downTemplate">
                下载模板
              </div>
            </div>
          </div>
        </div>
        <World v-if="fiveTab" :data="satelliteData" @china="china" ref="world" style="width: 100%; height: calc(100vh - 170px)"/>
        <div ref="left" id="leftBox" v-if="isLeft&&!fiveTab">
          <div class="leftMian">
            <div class="contain">
              <div class="title">各国太空发射统计</div>
              <!--            搜索区域-->
              <div class="searchBox">
                <div class="searchHead">
                  发射统计
                </div>
                <div class="choose">
                  <span class="lable">选择国家：</span>
                  <el-select v-model="country" multiple collapse-tags @change="change" placeholder="请选择">
                    <el-option
                        v-for="item in countryList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <span class="lable" style="margin-left: 20px">开始时间：</span>
                  <el-date-picker
                      v-model="start"
                      @change="dataPicker"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                  <span class="lable" style="margin-left: 20px">结束时间：</span>
                  <el-date-picker
                      v-model="end"
                      @change="dataPicker"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                </div>
                </div>
                <!--              折线图区域-->
                <Lines :datas="lineData" style="width: 100%;height:300px;padding-left:31px"/>
                <!--                <div id="lineChart" ref="lineChart" style="width: 100%;height:300px;padding-left:31px">-->

                <!--                </div>-->
                <!--                <div class="searchHead">-->
                <!--                  发射场统计-->
                <!--                  &lt;!&ndash;                  <span style="float: right;padding-right: 20px;cursor: pointer" @click="editFsc">编辑</span>&ndash;&gt;-->
                <!--                </div>-->
                <!--              柱状图区域-->
                <!--                <Bar :datas="lineDataAll" style="width: 100%;height:400px;padding-left:31px"/>-->
                <!--                <div id="barChart" ref="barChart" style="width: 100%;height:300px;padding-left:31px">-->

                <!--                </div>-->
              </div>
            </div>

            <!--              线-->
            <div class="line"></div>
          </div>
        </div>
      <div class="six" v-if="echartIndex==6">
        <div class="tabs">
          <div class="container">
            <div class="content" style="position: relative;width:100%;height: 100%">
              <div style="position: absolute;z-index:999;top:0;right: 20px;width: 100%">
                <div class="tabItem" style="float: right;" v-show="isChina" @click="wordBack">返回</div>
                <el-upload
                    v-if="isEditc=='true'"
                    ref="upload"
                    :headers="headers"
                    style="float: right;display: inline-block"
                    :on-preview="handlePreview"
                    :action="action3"
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                    :file-list="fileList"
                    :on-success="success"
                    :on-error="errors"
                >
                  <div class="tabItem" v-if="isEditc=='true'" style="float: right"
                       @click="deployTemplate">导入
                  </div>
                </el-upload>
                <div class="tabItem" style="float: right" @click="downdeployment" v-if="isEditc=='true'">下载模板</div>
                <div class="tabItem" style="float: right" @click="editDeploy" v-if="isEditc=='true'">编辑视图</div>
              </div>

              <World  ref="world"  :data="satelliteData" @china="china" style="width: 100%; height: calc(100vh - 60px)"/>

            </div>
          </div>
        </div>
      </div>
    </div>
      <el-dialog :title="echartIndex==6?'太空力量':'发射基地'" width="70%" :visible.sync="dialogSatellite" :close-on-click-modal="false"
                 :close-on-press-escape="false" :append-to-body="true" :modal-append-to-body="true">
        <el-button type="primary" @click="addBase" icon="el-icon-plus" v-if="echartIndex==5">新增基地</el-button>
        <el-button type="primary" @click="addBase" icon="el-icon-plus" v-if="echartIndex==6">新增力量</el-button>
        <el-table :data="satelliteData" max-height="500">
          <el-table-column property="name" :label="echartIndex==6?'力量名称':'发射基地'"></el-table-column>
          <el-table-column label="坐标位置" width="250">
            <template slot-scope="scope">
              <div class="item">
                {{ scope.row.value }}
              </div>
            </template>
          </el-table-column>
          <el-table-column property="type" label="力量类型"></el-table-column>
          <el-table-column property="altitude" label="高程"></el-table-column>
          <el-table-column property="country" label="所属国家"></el-table-column>
          <el-table-column property="baseCreateTime" label="建造时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="item">
                <el-button size="mini" type="success" @click="edit(scope.row,scope.$index)">编辑</el-button>
                <el-button size="mini" type="danger" @click="delte(scope.row,scope.$index)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
            width="40%"
            :title="isEdit?'编辑':'新增'"
            :visible.sync="innerVisible"
            :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true"
            :modal-append-to-body="true">
          <el-form :model="satelliteform">
            <el-form-item :label="echartIndex==6?'力量名称':'基地名称'" :label-width="formLabelWidth">
              <el-input v-model="satelliteform.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="echartIndex==6?'力量经度':'基地经度'" :label-width="formLabelWidth">
              <el-input v-model="satelliteform.longitude" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="echartIndex==6?'力量纬度':'基地纬度'" :label-width="formLabelWidth">
              <el-input v-model="satelliteform.latitude" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="力量类型" :label-width="formLabelWidth" v-if="echartIndex == 6">
              <el-select v-model="typename6" placeholder="请选择" @change="typechange">
                <el-option
                    v-for="item in powerType"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="高程" :label-width="formLabelWidth" v-if="echartIndex == 6">
              <el-input v-model="satelliteform.altitude" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属国家" :label-width="formLabelWidth">
              <el-input v-model="satelliteform.country" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="建造时间" :label-width="formLabelWidth" v-if="echartIndex == 6">
              <el-date-picker
                  v-model="satelliteform.baseCreateTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="echartIndex==6?'力量介绍':'基地介绍'" :label-width="formLabelWidth">
              <editor-bar
                  v-if="innerVisible"
                  v-model="detail"
                  :isClear="isClear"
              ></editor-bar>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="satelliteAdd">确 定</el-button>
          </div>
        </el-dialog>
      </el-dialog>
      <!--      发射场统计弹出层-->
      <el-dialog title="发射统计" :visible.sync="LaunchBox" :close-on-click-modal="false" :close-on-press-escape="false"
                 :append-to-body="true" :modal-append-to-body="true">
        <el-button type="primary" @click="addLauch" icon="el-icon-plus">新增国家</el-button>
        <el-table :data="lineData" max-height="500">
          <el-table-column property="name" label="国家"></el-table-column>
          <el-table-column property="count" label="发射场统计"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="item">
                <el-button size="mini" type="success" @click="editLaunch(scope.row,scope.$index)">编辑</el-button>
                <el-button size="mini" type="danger" @click="delteLaunch(scope.$index)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
            v-if="Launch"
            width="30%"
            :title="isEdit?'编辑':'新增'"
            :visible.sync="Launch"
            :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true"
            :modal-append-to-body="true">
          <el-form :model="LaunchForm">
            <el-form-item label="国家" :label-width="formLabelWidth">
              <el-input v-model="LaunchForm.country" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="发射基地数量" :label-width="formLabelWidth">
              <el-input v-model="LaunchForm.count" autocomplete="off"></el-input>
            </el-form-item>
            <div v-for="(item,index) in launchRow" :key="index" style="display: flex;margin-top: 5px">
              <el-input style="margin-right: 5px" :disabled="true" v-model="item.key"></el-input>
              <el-input v-model="item.value"></el-input>
              <!--              <el-button-->
              <!--                  style="margin-left: 5px"-->
              <!--                  icon="el-icon-minus"-->
              <!--                  circle-->
              <!--                  v-if="index != 0"-->
              <!--                  @click="del(index)"-->
              <!--              ></el-button>-->
              <!--              <el-button-->
              <!--                  style="margin-left: 5px"-->
              <!--                  icon="el-icon-minus"-->
              <!--                  circle-->
              <!--                  v-else-->
              <!--                  class="noneBtn"-->
              <!--              ></el-button>-->
              <!--              <el-button-->
              <!--                  style="margin-left: 5px"-->
              <!--                  icon="el-icon-plus"-->
              <!--                  circle-->
              <!--                  @click="add"-->
              <!--              ></el-button>-->
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="Launch = false">取 消</el-button>
            <el-button type="primary" @click="lauchYes">确 定</el-button>
          </div>
        </el-dialog>
      </el-dialog>
      <!--      饼图弹出层-->
      <el-dialog title="统计" :visible.sync="pieBox" :close-on-click-modal="false" :close-on-press-escape="false"
                 :append-to-body="true" :modal-append-to-body="true">
        <!--        <el-button type="primary" @click="addPies" icon="el-icon-plus">新增</el-button>-->
        <el-table :data="pies" max-height="500">
          <el-table-column property="name" label="名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="item">
                <el-button size="mini" type="success" @click="editPie(scope.row,scope.$index)">编辑</el-button>
                <!--                <el-button size="mini" type="danger" @click="deltePie(scope.$index)">删除</el-button>-->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
            v-if="pie"
            width="30%"
            :title="isEdit?'编辑':'新增'"
            :visible.sync="pie"
            :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true"
            :modal-append-to-body="true">
          <el-form :model="pieForm">
            <el-form-item label="饼图名称" :label-width="formLabelWidth">
              <el-input v-model="pieForm.name" autocomplete="off"></el-input>

            </el-form-item>
            <div v-for="(item,index) in pieForm.data" :key="index" style="display: flex;margin-top: 5px">
              <el-input style="margin-right: 5px" v-model="item.name"></el-input>
              <el-input v-model="item.value"></el-input>
              <el-button
                  style="margin-left: 5px"
                  icon="el-icon-minus"
                  circle
                  v-if="index != 0"
                  @click="delPie(index)"
              ></el-button>
              <el-button
                  style="margin-left: 5px"
                  icon="el-icon-minus"
                  circle
                  v-else
                  class="noneBtn"
              ></el-button>
              <el-button
                  style="margin-left: 5px"
                  icon="el-icon-plus"
                  circle
                  @click="addPie"
              ></el-button>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="pie = false">取 消</el-button>
            <el-button type="primary" @click="pieYes">确 定</el-button>
          </div>
        </el-dialog>
      </el-dialog>
      <!--      2019 年国外军事通信卫星发射活动概览表格编辑-->
      <el-dialog :title="isEdit?'编辑':'新增'" :visible.sync="tableBox" width="800px" :close-on-click-modal="false"
                 :close-on-press-escape="false" :append-to-body="true" :modal-append-to-body="true">
        <el-form :model="tableForm">
          <el-form-item label="一级分类" :label-width="formLabelWidth" >
            <el-select v-model="tableForm.equipType" placeholder="请选择">
              <el-option
                  v-for="(item,index) in equipmentList"
                  :key="index"
                  :label="item.name"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="二级分类" :label-width="formLabelWidth">
            <el-input v-model="tableForm.equipModel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="装备名称" :label-width="formLabelWidth">
            <el-input v-model="tableForm.equipName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发射国家" :label-width="formLabelWidth">
            <el-input v-model="tableForm.launchCountry" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发射时间" :label-width="formLabelWidth">
            <el-date-picker
                v-model="tableForm.launchTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发射方式" :label-width="formLabelWidth">
            <el-input v-model="tableForm.launchWay" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="装备描述" :label-width="formLabelWidth">
            <el-input v-model="tableForm.equipDescribe" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="装备描述图" :label-width="formLabelWidth">
            <UploadImg :fileList="tableForm.equipDescribeImg" @file="getFile" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tableBox = false">取 消</el-button>
          <el-button type="primary" @click="tableBoxYes()">确 定</el-button>
        </div>
      </el-dialog>
      <!--      其他国家军事通信卫星体系与能力表格-->
      <el-dialog :title="isEdit?'编辑':'新增'" :visible.sync="tableBox1" width="800px" :close-on-click-modal="false"
                 :close-on-press-escape="false" :append-to-body="true" :modal-append-to-body="true">
        <div style="height: 600px;overflow-y: scroll">
          <el-form :model="tableForm1">
            <el-form-item label="一级分类" :label-width="formLabelWidth">
              <el-input v-model="tableForm1.manoeuvreName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="演习时间" :label-width="formLabelWidth">
              <el-date-picker
                  v-model="tableForm1.manoeuvreTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="演习国家" :label-width="formLabelWidth">
              <el-input v-model="tableForm1.manoeuvreCountry" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="演习地区" :label-width="formLabelWidth">
              <el-input v-model="tableForm1.manoeuvreSite" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="演习地区图片" :label-width="formLabelWidth">
              <UploadImg :fileList="tableForm1.manoeuvreSiteImg" @file="getFile1" />
            </el-form-item>
            <el-form-item label="演习级别" :label-width="formLabelWidth">
              <el-input v-model="tableForm1.manoeuvreLevel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="演习目标" :label-width="formLabelWidth">
              <el-input v-model="tableForm1.manoeuvreTarget" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="演习目标图片" :label-width="formLabelWidth">
              <UploadImg :fileList="tableForm1.manoeuvreTargetImg" @file="getFile2" />
            </el-form-item>
            <el-form-item label="演习场景" :label-width="formLabelWidth">
              <el-input v-model="tableForm1.manoeuvreScene" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="演习场景图片" :label-width="formLabelWidth">
              <UploadImg :fileList="tableForm1.manoeuvreSceneImg" @file="getFile3" />
            </el-form-item>
            <el-form-item label="演习单位" :label-width="formLabelWidth">
              <el-input v-model="tableForm1.manoeuvreTroops" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="演习单位图片" :label-width="formLabelWidth">
              <UploadImg :fileList="tableForm1.manoeuvreTroopsImg" @file="getFile4" />
            </el-form-item>
            <el-form-item label="演习人员" :label-width="formLabelWidth">
              <el-input v-model="tableForm1.manoeuvreCrews" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="演习人员图片" :label-width="formLabelWidth">
              <UploadImg :fileList="tableForm1.manoeuvreCrewsImg" @file="getFile5" />
            </el-form-item>
            <el-form-item label="演习内容" :label-width="formLabelWidth">
              <el-input v-model="tableForm1.manoeuvreContent" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="演习内容图片" :label-width="formLabelWidth">
              <UploadImg :fileList="tableForm1.manoeuvreContentImg" @file="getFile6" />
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tableBox1 = false">取 消</el-button>
          <el-button type="primary" @click="tableBoxYes1">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="isEdit?'编辑':'新增'" :visible.sync="tableBox2" width="800px" :close-on-click-modal="false"
                 :close-on-press-escape="false" :append-to-body="true" :modal-append-to-body="true">
        <el-form :model="tableForm2"  :rules="rules" ref="ruleForm">
          <el-form-item label="一级分类" :label-width="formLabelWidth" prop="pid">
            <el-select v-model="tableForm2.pid" placeholder="请选择">
              <el-option
                  v-for="(item,index) in classThreatenList"
                  :key="index"
                  :label="item.typename"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" :label-width="formLabelWidth" prop="typename">
            <el-input v-model="tableForm2.typename" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <editor-bar
                v-model="tableForm2.contents"
                :isClear="isClear"
            ></editor-bar>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tableBox2 = false">取 消</el-button>
          <el-button type="primary" @click="tableBoxYes2('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="isEdit?'编辑':'新增'" :visible.sync="tableBox3" width="500px" :close-on-click-modal="false"
                 :close-on-press-escape="false" :append-to-body="true" :modal-append-to-body="true">
        <el-form :model="tableForm3">
          <el-form-item label="时间" :label-width="formLabelWidth">
            <el-input v-model="tableForm3.time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="参与单位" :label-width="formLabelWidth">
            <el-input v-model="tableForm3.company" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="场景" :label-width="formLabelWidth" v-show="exercise==2">
            <el-input v-model="tableForm3.scene" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主要目标" :label-width="formLabelWidth">
            <el-input v-model="tableForm3.target" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tableBox3 = false">取 消</el-button>
          <el-button type="primary" @click="tableBoxYes3">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="上传结果" :visible.sync="dialogResult" width="800px" :close-on-click-modal="false"
                 :close-on-press-escape="false" :append-to-body="true" :modal-append-to-body="true">
        <p v-html="text"></p>
        <el-table
            height="250"
            :data="data"
            style="width: 100%">
          <el-table-column
              prop="data"
              label="失败数据"
          >
          </el-table-column>
          <el-table-column
              prop="cause"
              label="失败原因"
          >
          </el-table-column>

        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogResult = false">取 消</el-button>
          <el-button type="primary" @click="dialogResult=false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import Headers from "../../common/header";
import Footers from "../../common/footer";
import Pie from "../../common/echarts/pie";
import World from "../../common/echarts/world";
import Worlds from "../../common/echarts/worlds";
import Lines from "../../common/echarts/line";
import Bar from "../../common/echarts/bar";
import UploadImg from '../../common/dialog/imgupload'
import E from 'wangeditor'
import EditorBar from "../../common/editoritem";
import "../../../node_modules/echarts/map/js/world.js";
import '../../../node_modules/echarts/map/js/china.js'
import {getUploadView, backView} from '@/api/api'
import {
  template,
  LaunchStatistics,
  getCountryList,
  equip,
  Equipments,
  mainEquipment,
  Statistics,
  maneuvers,
  maneuversList,
  manoeuvre,
  deployment,
  getdeployment,
  manoeuver,
  manoeuverAdd,
  manoeuverDel,
  mainEquipmentedit,
  mainEquipmentAdd,
  mainEquipmentDel,
  adddeployment,
  editdeployment,
  deldeployment,
  classThreaten,
  sendclassThreaten,
  editThreaten,
  addThreaten,
  deleThreaten
} from '@/api/apis'

export default {
  beforeRouteUpdate(to, from, next) {
    //next方法使URL显示正常
    next();
    //数据改变的方法（此处为自定义的数据改变方法）
    document.querySelector('.aaaaaa').style.display="none"
    this.getNum(to.params.id);
  },
  components: {
    Headers,
    Footers,
    Pie,
    World,
    Worlds,
    Lines,
    Bar,
    EditorBar,
    UploadImg
  },
  data() {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HEERE',
        menu: '#menu',
        controlArrows:true ,
        navigation: true,
        loopBottom: true,
        navigationPosition: 'right',//导航小圆点的位置
        navigationTooltips: ['firstSlide', 'secondSlide'],//导航小圆点的提示
      },
      rules:{
         pid: [
            { required: true, message: '请选择一级分类', trigger: 'change' }
          ],
          typename:[
            { required: true, message: '请输入二级分类', trigger: 'blur' },
          ]
      },
      typename6:'',
      // 太空力量的类型
      powerType:[{
        lable:'发射基地',
        value:'发射基地'
      },{
        lable:'军事基地',
        value:'军事基地',
      },{
        lable:'指挥部',
        value:'指挥部'
      }],
      activeTable:{},
      // 太空领域威胁挑战\
      // 一级分类列表
      Threatenindex:0,
      sendThreatenIndex:0,
      classThreatenList:[],
      sendclassThreatenList:[],
      // 太空力量部署图
      // 列表
      deploymentList:[],
      start:'',
      end:'',
      fooo:[],
      diqu:[],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // 战略研稀土
      maneuverClass: [],
      maneuversList: [],
      total: 0,
      equipPie: {},
      equipList: [],
      equipType: '航天器',
      equipModel: '',
      pagesize: 10,
      pageno: 1,
      dialogResult: false,
      action: '',
      action1: '',
      action2: '',
      action3: '',
      fileList: [],
      text: '',
      data: [],
      headers: {
        "X-Access-Token": window.localStorage.getItem('token')
      },
      isEditc: window.localStorage.getItem('webpack-edit'),
      isChina: false,
      timer: '',
      activity3: [{
        name: 'AN/FPS-85',
        category: '相控阵雷达',
        position: '佛罗里达州埃格林空军基地',
        count: '1',
        remarks: '——————'
      }, {
        name: '地球仪-2 (Globus-ll)',
        category: '机械雷达',
        position: '挪威瓦尔德',
        count: '1',
        country: '美国',
        remarks: '——————'
      }, {
        name: '挪威瓦尔德',
        category: '机械雷达',
        position: '澳大利亚西部',
        count: '1',
        country: '美国',
        remarks: '——————'
      }, {
        name: '地基光电深空监视 (GEODSS)系统',
        category: '地基光电',
        position: '英属印度洋迪戈加西亚岛 夏威夷毛伊岛 新墨西哥州索科罗',
        count: '3',
        country: '美国',
        remarks: '——————'
      }, {
        name: '太空监视望远镜(SST)',
        category: '地基光电',
        position: '澳大利亚西部',
        count: '1',
        country: '美国',
        remarks: '正在转移，暂未部署'
      }, {
        name: '天基太空监视-1 (SBSS-1)',
        category: '天基光电',
        position: 'LEO',
        count: '1',
        country: '美国',
        remarks: '——————'
      }, {
        name: '作战响应空间-5 (ORS-5)',
        category: '天基光电',
        position: 'LEO',
        count: '3',
        country: '美国',
        remarks: '——————'
      }, {
        name: '地球同步轨道太空态势感知计划(GSSAP)卫星',
        category: '天基光电',
        position: 'GEO',
        count: '4',
        country: '美国',
        remarks: '——————'
      }, {
        name: 'TDO卫星',
        category: '天基(手段不详)',
        position: 'LEO',
        count: '1',
        country: '美国',
        remarks: '——————'
      }, {
        name: 'ANFPS-123: ANFPS-120;ANFPS-126',
        category: '相控阵雷达',
        position: '阿拉斯加州克利尔航空站格陵兰岛图勒空军基地英国菲林代尔斯皇家航空站',
        count: '3',
        country: '美国',
        remarks: '弹道导弹预警系 统(BMEWS)'
      }, {
        name: 'AN/FPQ-16',
        category: '相控阵雷达',
        position: '北达科他州卡瓦列航空站',
        count: '环形目标指示雷达攻击特征描述系统(PARCS)',
        country: '美国',
        remarks: '——————'
      }, {
        name: '丹麦眼镜蛇',
        category: '相控阵雷达',
        position: '阿拉斯加州艾瑞克森航空站',
        count: '1',
        country: '美国',
        remarks: '——————'
      }, {
        name: 'FPS-115',
        category: '相控阵雷达',
        position: '马萨诸塞州科德角航空站加利福尼亚州比尔空军基地',
        count: '2',
        country: '美国',
        remarks: '铺路爪相控阵预警系統(PAVE)'
      }, {
        name: '“干草堆”超宽带卫星成像雷达(HUSIR):;“干草堆”辅助雷达(HAX);磨石山雷X2',
        category: '机械雷达',
        position: '马萨诸塞州韦斯托弗',
        count: '4',
        country: '美国',
        remarks: '林肯太空监视系统(LSSC) '
      }, {
        name: 'AN/FPQ.15： AN/TPQ-18',
        category: '机械雷达',
        position: '南大西洋阿森松岛',
        count: '2',
        remarks: '——'
      }, {
        name: '高级研究计划局林肯C频段观测雷达(ALCOR):高级研究计划局远程跟踪与测量雷达(ALTAIR); 毫米波雷达(MMW);目标分辨和识别实验雷达(TRADEX)',
        category: '机械雷达',
        position: '马绍尔群岛夸贾林环礁',
        count: '4',
        remarks: '毛伊岛太空监视系统(MSSS)'
      }, {
        name: '毛伊光学系统(AMOS); 毛伊光学跟踪识别设施(MOTIF);毛伊高级光电系统(AEOS)',
        category: '地基光电',
        position: '夏威夷毛伊岛',
        count: '5',
        remarks: '里根弹道导弹防御试验场(RTS)'
      },],
      activity2: [
        {
          name: '全球哨兵',
          child: [{
            time: '2014.4.22至4.26',
            company: '46人，澳大利亚、加拿大、法国、德国、英国和美国与演习，日本作为观察国。',
            scene: '',
            target: '确定提高盟国太空作战中心之间的合作水平和互操作性，能否改善各自和联合的太空态势感知能力对作战的支持能力。'
          }, {
            time: '2015.10.26至10.30',
            company: '52人，澳大利亚、加拿大、法国、德国、英国、和美国参与演习，日本正式参与演习。',
            scene: '',
            target: '确定提高盟国太空作战中心之间的合作水平和互操作性，能否改善各自和联合的太空态势感知能力对作战的支持能力。'
          }, {
            time: '2016.9.21至9.30',
            company: '澳大利亚、加拿大、法国、德国、日本 、英国和商业实体参与学习，意大利作为观察国。',
            scene: '',
            target: '确定提高盟国太空作战中心之间的合作水平和互操作性，能否改善各自和联合的太空态势感知能力对作战的支持能力。'
          }, {
            time: '2017.9.20至9.29',
            company: '英国、日本、法国、德国、美国、澳大利亚、加拿大、以及商业实体参与演习，意大利正式参与演习，西班牙和韩国作为观察国。',
            scene: '',
            target: '对盟国太空态势感知装备进行一体化指挥与控制测试，改善太空态势感知能力，谋求共同太空安全。'
          }, {
            time: '2017.9.20至9.29',
            company: '英国、日本、法国、德国、美国、澳大利亚、加拿大、以及商业实体参与演习，意大利正式参与演习，西班牙和韩国作为观察国。',
            scene: '',
            target: '军事载荷搭载'
          }]
        }, {
          name: '施里弗',
          child: [{
            time: '2001.1.21至1.26',
            company: '约250名军民航天专家，商业航天界的代表也参与其中',
            scene: '2017年，与主要战略对手夺取太空控制权',
            target: '研究太空控制和从太空使用武力所需条件，反击敌方先进太空能力的手段，评估敌方可能采取的阻碍美国及其盟国使用太空资源的方法。'
          }, {
            time: '2003.2.20至2.27',
            company: '约300多名军民航天专家。除空烟外，还有陆军、NASA、运输部等30多个机构参演。学习还邀请了商业卫星通信与图像供应商 参与。加拿大、英国和澳大利亚派员参加',
            scene: '2017年，与主要战略对手夺取太空控制权',
            target: '检验太空系统在未来军事行动中的作用，探索将太空能力整合到联合作战中，模拟验证“太空控制”等概念。'
          }, {
            time: '2005.2.5至2.11',
            company: '约350人。美国所有军种都参与其中，还包括NASA、运输部等30多个机构参演。学习还少年方世玉了商业卫星通信与图像供应商参与。加拿大、英国和澳大利亚派员参加',
            scene: '2020年，全球范围内多个地区出现多起冲突，竞争对手既有恐怖分子又有国家行为者。',
            target: '探讨在战争中使用太空技术和新型装备支援联合作战。'
          }, {
            time: '2007.3.25至9.29',
            company: '约400名航天专业人员，他们来自美国防部多家机构、多家非国防部机构。英国、加拿大、澳大利亚派员参加',
            scene: '2025年，全球性作战环境',
            target: '验证21世纪联合部队可用的太空能力、战术和技术，检验部队组织机构，促进太空政策和交战规则发展。'
          }, {
            time: '2009.3.14至3.20',
            company: '美国多家政府部门、作战部门的想着人员； 美国盟友澳大利亚、加拿大、英国也派员参与',
            scene: '2019年，在一次地区冲突中，美军及其盟军参战，战场空间内，多处太空能力与赛博能力遭到攻击，拒绝服务',
            target: '检验国家政策的执行措施，提高太空对抗态势下的决策能力，探索美军与商业部门、盟国及伙伴的协调方法，首次探索太空与赛博的结合。'
          }, {
            time: '2010.5.7至5.13',
            company: '约550名军民航天专家。他们来自美国、澳大利亚、加拿大以及英国的30个机构。若加上支持性工作人员，则共约600人参与',
            scene: '2022年，一个地区级对手对美国太空与赛博电子太空系统进行毁灭性打击',
            target: '研究太空与赛博能力集成，探索太空与赛博空间对未来威慑战略的贡献，研究联盟太空作战构想，探索一体化的规划程序，保护并实施太空与赛博空间领域的作战行动。'
          }, {
            time: '2012.4.20至4.26',
            company: '约270名军民航天专家。他们来自全美30多个机构以及澳大利亚和北约国家。盟国包括澳大利亚、加拿大和英国；法德意、丹麦、希腊、荷兰和土耳其首次参加',
            scene: '2023年，北约和澳大利亚在非洲对抗海盗联合行动',
            target: '探索如何利用太空为多国部队军事行动提供支持；检验太空与赛博空间防御一体化作战。'
          }, {
            time: '?至2015.2',
            company: '约175名军民航天专家，他们来自美国各地政府机构以及澳大利亚、加拿大和英国',
            scene: '2026年，中国“反介入/区域拒止”作战',
            target: '探索并评估未来体系机构在拥挤、降效以及军事行动受限环境下的弹性，确定未来体系结构中的作战过程、作战概念以及战术、技术和程序的发展机遇，提高 国家太空防御能力，研究未来的“反介入/区域拒止”（A2/AD）力量体系对空军作战和服务需求的影响。'
          }, {
            time: '2015.12.11至12.17',
            company: '约200名军民航天专家他们来自美国27个机构以及澳大利亚、加拿大、新西兰和英国',
            scene: '2025年，美国竞争对手在赛博空间和太空领域具备势均力敌的能力，试图通过利用这些领域实现其战略目标',
            target: '识别如何增加太空弹性，包括情报机构、非军事机构、商业机构和盟友；探究如何更好地支持军事联合行动；探索如何对未来能力加以应用，保护多作战域冲突下的太空设施。'
          }, {
            time: '2016.5.19至5.26',
            company: '约200名军民航天专家他们来自超过7个美国司令部和机构',
            scene: '2026年，美甲竞争对手在赛博空间和太空领域具备势均力敌的能力，试图通过利用这些领域实现其战略目标',
            target: '确定增强太空弹性的方法；探索如何为作战人员提供优化的八点效能，以支持聪明作战，评估如何在多领域冲突中利用未来能力保护太空事业体系。'
          }, {
            time: '2017.10.13至10.21',
            company: '约200名军民航天专家他们来自美国的27个机构以及澳大利亚、加拿大、新西兰和英国',
            scene: '2027年，美国竞争对手在赛博空间和太空领域具备势均力敌的能力，试图通过利用这些领域实现其战略目标',
            target: '检验各种联合指挥与控制框架，部署并保护空中、太空和赛博空间能力，支持全球和区域性作战行动； 通过整合“太空作战架构”，深入了解太空弹性、太空威慑和太空作战；探索太空和赛博空间在多域冲突中的作用； 以政府总动员的方式发展伙伴关系，实施联合、联盟作战。'
          }, {
            time: '2018.10.11至10.19',
            company: '共350人。美空军航天怀念部、国家侦察办公室、展柜、商务部等27家机构参演，英法德、澳大利亚、加拿大和新西兰派员参加，日本首次参演',
            scene: '2028年，美军印主怀念部辖区内某大国，利用太空与赛博空间力量，攻击美国军用、民用太空系统，冲突范围逐步扩展到全球',
            target: '利用盟友力量慑止对手将冲突延伸至太空；盟友参与太空与赛博空间作战行动后的弹性、威慑及作战能力情况； 探索综合指挥与控制框架，利用并防护空天、赛博能力，支持全球及区域作战；确定太空与赛博空间在多域冲突中的战略、战术运用； 利用军、民、商、盟友的伙伴关系遂行一体化太空与赛博作战。'
          }]
        }, {
          name: '太空旗帜',
          child: [{
            time: '2017.4.17至4.20',
            company: '2017.4.17至4.20',
            scene: '',
            target: '在竞争、降效和作战有限的领域中实现作战优势，发展太空系统维护和操作所需的作战技能以及战术、技术和程序（TTP'
          }, {
            time: '2017（具体时间不详）至8.25',
            company: '国家太空防御中心、联合太空作战中心、第50和第460太空联队（蓝方）、第527和第26太空入侵者中队（红方）、第50作战大队、第50网络作战大队、第460作战大队和第310作战大队（受训单位）',
            scene: '',
            target: '在竞争、降效和作战有限的领域中实现作战优势，发展太空系统维护和操作所需的作战技能以及战术、技术和程序（TTP）'
          }]
        }],
      activeActivity2: [{
        time: '2014.4.22至4.26',
        company: '46人，澳大利亚、加拿大、法国、德国、英国和美国与演习，日本作为观察国。',
        scene: '',
        target: '确定提高盟国太空作战中心之间的合作水平和互操作性，能否改善各自和联合的太空态势感知能力对作战的支持能力。'
      }, {
        time: '2015.10.26至10.30',
        company: '52人，澳大利亚、加拿大、法国、德国、英国、和美国参与演习，日本正式参与演习。',
        scene: '',
        target: '确定提高盟国太空作战中心之间的合作水平和互操作性，能否改善各自和联合的太空态势感知能力对作战的支持能力。'
      }, {
        time: '2016.9.21至9.30',
        company: '澳大利亚、加拿大、法国、德国、日本 、英国和商业实体参与学习，意大利作为观察国。',
        scene: '',
        target: '确定提高盟国太空作战中心之间的合作水平和互操作性，能否改善各自和联合的太空态势感知能力对作战的支持能力。'
      }, {
        time: '2017.9.20至9.29',
        company: '英国、日本、法国、德国、美国、澳大利亚、加拿大、以及商业实体参与演习，意大利正式参与演习，西班牙和韩国作为观察国。',
        scene: '',
        target: '对盟国太空态势感知装备进行一体化指挥与控制测试，改善太空态势感知能力，谋求共同太空安全。'
      }, {
        time: '2017.9.20至9.29',
        company: '英国、日本、法国、德国、美国、澳大利亚、加拿大、以及商业实体参与演习，意大利正式参与演习，西班牙和韩国作为观察国。',
        scene: '',
        target: '军事载荷搭载'
      }],
      // 2019年发射航天器领域分布统计
      activity: [{
        name: 'WGS-lO',
        time: '20190301',
        country: '美国',
        category: '宽带通信',
        trajectory: 'GEO',
        remarks: ''
      }, {
        name: 'Meridian-8',
        time: '20190301',
        country: '美国',
        category: '固定广播/移动通信',
        trajectory: 'GEO',
        remarks: ''
      }, {
        name: 'Blagovest-14L',
        time: '20190301',
        country: '美国',
        category: '宽带通信',
        trajectory: 'GEO',
        remarks: ''
      }, {
        name: 'AEHF-5',
        time: '20190301',
        country: '美国',
        category: '宽带通信',
        trajectory: 'GEO',
        remarks: ''
      }, {
        name: 'Tiba-1',
        time: '20190301',
        country: '美国',
        category: '宽带通信',
        trajectory: 'GEO',
        remarks: ''
      }],
      activity1: [{
        country: '阿联酋',
        name: 'Yahsat-1A',
        time: '2011/4/22',
        performance: '1路 Ka 频段转发器',
        remarks: '军商两用'
      }, {
        country: '阿联酋',
        name: 'Yahsat-1B',
        time: '2011/4/22',
        performance: '21 Ka 频段转发器',
        remarks: '军事载荷搭载'
      }, {
        country: '巴西',
        name: 'Star One-C1',
        time: '2003/6/11',
        performance: '1路 X 频段转发器',
        remarks: '军商两用'
      }, {
        country: '巴西',
        name: 'Star One-C2',
        time: '2003/6/11',
        performance: '1路 X 频段转发器',
        remarks: '军商两用'
      }, {
        country: '巴西',
        name: 'Star One-C3',
        time: '2003/6/11',
        performance: 'SGDC-1',
        remarks: '军民共用'
      }, {
        country: '加拿大',
        name: 'Anik-G1',
        time: '2013/4/15',
        performance: '3路X频段转发器',
        remarks: '军事载荷搭载'
      }, {
        country: '加拿大',
        name: 'M3MSat',
        time: '2016/6/22',
        performance: '军事载荷搭载',
        remarks: '军民共用'
      }, {
        country: '韩国',
        name: 'Koreasat-5',
        time: '2006/8/22',
        performance: '8路SHF和4路Ka频段转发器',
        remarks: '军事载荷搭载'
      }, {
        country: '韩国',
        name: 'M3MSat',
        time: '2016/6/22',
        performance: '军事载荷搭载',
        remarks: '军事载荷搭载'
      }, {
        country: '墨西哥',
        name: 'MexSat-3',
        time: '2012/12/19',
        performance: '12路C 和 12 Ku 频段转发器',
        remarks: '军民商公用'
      }, {
        country: '墨西哥',
        name: 'MexSat-2',
        time: '2015/10/2',
        performance: 'L频段和 Ku 频段转发器，122 个点波束',
        remarks: '军民商公用'
      }, {
        country: '以色列',
        name: 'AMOS-4',
        time: '2013/8/31',
        performance: '8路Ku和4路Ka频段转发器',
        remarks: '军方租用'
      }],

      // 编辑视图的下标 适用于所有的新增和修改
      activeIndex: 0,
      // 是否为编辑？ true---编辑  false---新增 适用于所有的新增和修改
      isEdit: false,
      // 编辑表格的弹出层
      tableBox: false,
      tableBox1: false,
      tableBox2: false,
      tableBox3: false,
      // 编辑表格弹出层的form
      tableForm: {
       equipName:'',
        launchCountry:'',
        launchTime:'',
        launchWay:'',
        equipDescribe:'',
        equipDescribeImg:[]
      },
      tableForm1: {
        id:'',
        manoeuvreName:'',
        manoeuvreTime:'',
        manoeuvreCountry: '',
        manoeuvreSite:'',
        manoeuvreSiteImg:'',
        manoeuvreLevel:'',
        manoeuvreTarget:'',
        manoeuvreTargetImg:'',
        manoeuvreScene:'',
        manoeuvreSceneImg:'',
        manoeuvreTroops:'',
        manoeuvreTroopsImg:'',
        manoeuvreCrews:'',
        manoeuvreCrewsImg:'',
        manoeuvreContent:'',
        manoeuvreContentImg:''
      },
      tableForm2: {
        name: '',
        sendname: '',
        content: '',
      },
      tableForm3: {
        time: '',
        company: '',
        scene: '',
        target: ''
      },
      clickPie: [],
      pieBox: false,
      pie: false,
      isClear: false,
      detail: "",
      // 发射场统计
      LaunchForm: {
        count: '',
        country: ''
      },
      launchRow: [
        {
          key: '1月',
          value: 20
        },
        {
          key: '2月',
          value: 20
        },
        {
          key: '3月',
          value: 20
        },
        {
          key: '4月',
          value: 20
        },
        {
          key: '5月',
          value: 20
        },
        {
          key: '6月',
          value: 20
        },
        {
          key: '7月',
          value: 20
        },
        {
          key: '8月',
          value: 20
        }
      ],
      launchCountry: [{
        name: '中国',
        value: 200,
        child: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
      }, {
        name: '德国',
        value: 10,
        child: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
      }, {
        name: '美国',
        value: 120,
        child: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
      }, {
        name: '日本',
        value: 120
      },
        {
          name: '朝鲜',
          value: 120
        }, {
          name: '韩国',
          value: 120
        }, {
          name: '俄罗斯',
          value: 130
        }, {
          name: '加拿大',
          value: 130
        }, {
          name: '意大利',
          value: 130
        }, {
          name: '法国',
          value: 140
        }, {
          name: '印度',
          value: 140
        }, {
          name: '瑞士', value: 140
        }, {name: '泰国', value: 140}, {name: '越南', value: 140}, {
          name: '马来西亚',
          value: 150
        }, {name: '缅甸', value: 160}],
      // 发射场的弹出层开关、
      LaunchBox: false,
      Launch: false,
      // 饼图的单个表单数据
      pieForm: {
        name: '',
        data: []
      },
      // 编辑发射基地的form
      satelliteform: {
        // 基地名称
        name: '',
        // 经度
        longitude: '',
        // 纬度
        latitude: '',
        // 基地的介绍/详情
        detail: '',
        // 所属国家
        country: '',
        altitude:'',
        baseCreateTime:''
      },
      // 卫星发射基地的弹出层
      dialogSatellite: false,
      // 太空发射统计图tab控制
      fiveTab: true,
      // 内层弹出层
      innerVisible: false,
      // 卫星发射基地的表格数据
      satelliteData: [
        {
          name: "多哈",
          value: [51.511744, 25.292405],
          country: '中国',
          content: '<h2>基本介</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'
        }, {
          name: "约翰内斯堡",
          value: [28.047305, -26.204103],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "基辅",
          value: [30.5234, 50.450099],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "萨格勒布",
          value: [15.981919, 45.815008],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "克拉科夫",
          value: [19.940063, 50.100353],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "日内瓦",
          value: [6.143158, 46.204389],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "马尼拉",
          value: [120.98453, 14.58865],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "酒泉卫星发射基地",
          value: [100.316, 40.58],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "西昌卫星发射中心",
          value: [102.013, 28.144],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "太原卫星发射基地",
          value: [111.362, 38.505],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "文昌卫星发射基地",
          value: [109.48, 19.19],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'

        },
        {
          name: "中国东方航天港",
          value: [133.04, 42.44],
          country: '中国',
          content: '<h2>基本介绍</h2><p>肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°\'28.31° 北纬80°90\'03.48\'\'西经。</p><p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p><h2>基地组成</h2><p>肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p><h2>发射中心</h2><p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责 装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B". 美国联合通讯社、路透社、CNN等一些世界主要媒 体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p><p style="text-align: center;"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"><img src="http://192.168.1.27:8080/img/details.1c8ff7a9.jpg" alt="" width="30%"></p>'
        }],
      fiveTabIndex: 1,
      // 太空主要装备tab
      sendIndex: 1,
      equipmentList: [
        {
          name: '航天器',
          value: '航天器',
          children: [{
            name: '太空装备（航天器）统计分析',
            value: 1
          }]
        }, {
          name: '观测卫星',
          value: '观测卫星',
          children: [{
            name: '太空装备（对地观测卫星）统计分析',
            value: 1
          }, {
            name: '太空装备（对外观测卫星）历年总数统计分析',
            value: 2
          }]
        }, {
          name: '导航卫星',
          value: '导航卫星',
          children: [{
            name: '太空装备（导航卫星统计分析）',
            value: 1
          }]
        }, {
          name: '通信卫星',
          value: '通信卫星',
          children: [{
            name: '太空装备（通信卫星）统计分析',
            value: 1
          }, {
            name: '太空装备（通信卫星）统计分析',
            value: 2
          }, {
            name: '太空装备（通信卫星）历年总数统计分析',
            value: 3
          }]
        }
      ],

      // 太空威胁挑战图
      threatenList: [{
        name: '发射统计',
        value: 1
      }, {
        name: '感知系统',
        value: 2
      }],
      obj1: {
        name: '2019年发射航天器领域分布统计',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)'],
        data: [
          {value: 178, name: '载人航天器'},
          {value: 119, name: '对地观测卫星'},
          {value: 13, name: '科学与技术试验卫星'},
          {value: 15, name: '通信卫星'},
          {value: 163, name: '空间探测器'},
          {value: 20, name: '导航卫星'},
        ],
      },
      pies: [{
        name: '2019年发射航天器领域分布统计',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)'],
        data: [
          {value: 178, name: '载人航天器'},
          {value: 119, name: '对地观测卫星'},
          {value: 13, name: '科学与技术试验卫星'},
          {value: 15, name: '通信卫星'},
          {value: 163, name: '空间探测器'},
          {value: 20, name: '导航卫星'},
        ],
      }, {
        name: '航天器发射情况',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)', 'rgba(211, 87, 225, 1)'],
        data: [
          {value: 3236, name: '载人航天器'},
          {value: 2451, name: '对地观测卫星'},
          {value: 503, name: '科学与技术试验卫星'},
          {value: 629, name: '通信卫星'},
          {value: 1883, name: '空间探测器'},
          {value: 3111, name: '导航卫星'},
          {value: 2000, name: '非卫星'},
        ],
      }, {
        name: '2019 年国外对地观测卫星成功发射数量',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)', 'rgba(211, 87, 225, 1)'],
        data: [
          {value: 3236, name: '雷达对地成像卫星'},
          {value: 2451, name: '光学对地成像卫星'},
          {value: 503, name: '其他环境监测卫星'},
          {value: 629, name: '射频信号接收定位卫星'},
          {value: 1883, name: '气象环境探测卫星'},
          {value: 3111, name: '电子侦察卫星'},
          {value: 2000, name: '雷达成像侦查卫星'},
          {value: 2500, name: '光学成像侦察卫星'},
        ],
      }, {
        name: '2019 年国外对地观测卫星成功发射数量',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)', 'rgba(211, 87, 225, 1)'],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 503, name: '印度'},
          {value: 629, name: '日本'},
          {value: 1883, name: '欧洲'},
          {value: 3111, name: '其他国家或组织'},
        ],
      }, {
        name: '截至 2019 年底国外对地观测卫星在轨数量(按卫星类型统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '海洋环境探测卫星'},
          {value: 2451, name: '气象环境探测卫星'},
          {value: 503, name: '雷达对地成像卫星'},
          {value: 629, name: '光学对地成像卫星'},
          {value: 1883, name: '其他环境监测卫星'},
          {value: 3111, name: '气象环境监测卫星'},
          {value: 1234, name: '海洋环境监测卫星'},
          {value: 2345, name: '电子侦察卫星'},
          {value: 3421, name: '雷达成像侦察卫星'},
          {value: 3878, name: '光学成像侦察卫星'},
          {value: 4100, name: '射频信号接收定位卫星'},
          {value: 3121, name: '其他环境探测卫星'},
        ],
      }, {
        name: '截至 2019 年底国外军用对地观测卫星在轨数量(按卫星所属国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)', 'rgba(211, 87, 225, 1)'],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 503, name: '印度'},
          {value: 629, name: '日本'},
          {value: 1883, name: '欧洲'},
          {value: 883, name: '以色列'},
          {value: 3111, name: '其他国家或组织'},
        ],
      }, {
        name: '2019 年国外导航卫星在轨数量(按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '美国'},
          {value: 2451, name: '俄罗斯'},
        ],
      }, {
        name: '2019 年国外导航卫星在轨运行并提供导航服务数量(按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
        ],
      }, {
        name: '俄罗斯、美国在轨导航卫星组成',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: 'GLONASS-K'},
          {value: 2451, name: 'GLONASS-M'},
        ],
      }, {
        name: '2019 年国外民商用通信中继卫星在轨数量 按轨道统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: 'HEO'},
          {value: 2451, name: 'MEO'},
          {value: 1234, name: 'LEO'},
          {value: 4321, name: 'GEO'},
        ],
      }, {
        name: '2019 年国外通信卫星成功发射数量(按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
          {value: 1403, name: '其他国家'},
        ],
      }, {
        name: '截至 2019 年底国外军用通信中继卫星在轨数量(按轨道类型统计）',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
          {value: 1403, name: '其他国家'},
        ],
      }, {
        name: '截至 2019 年底国外军用通信中继卫星在轨数量(按国家分布情况)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
          {value: 1403, name: '其他国家'},
        ],
      }, {
        name: '截至 2019 年底国外军用通信中继卫星在轨数量(按用途分布情况)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '通信广播'},
          {value: 2451, name: '收据中继'},
        ],
      }, {
        name: '截至 2019 年底国外在轨通信卫星数量〈按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
          {value: 1403, name: '其他国家'},
        ],
      }, {
        name: '\n' +
            '截至 2019 年底国外预警监视卫星在轨数量(按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '加拿大'},
          {value: 503, name: '欧洲'},
        ],
      }, {
        name: '截至 2019 年底国外预警监视卫星在轨数量(按类型统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '空目标监测卫星'},
          {value: 2451, name: '导弹预警卫星'},
        ],
      },],
      obj2: {
        name: '航天器发射情况',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)', 'rgba(211, 87, 225, 1)'],
        data: [
          {value: 3236, name: '载人航天器'},
          {value: 2451, name: '对地观测卫星'},
          {value: 503, name: '科学与技术试验卫星'},
          {value: 629, name: '通信卫星'},
          {value: 1883, name: '空间探测器'},
          {value: 3111, name: '导航卫星'},
          {value: 2000, name: '非卫星'},
        ],
      },
      obj3: {
        name: '2019 年国外对地观测卫星成功发射数量',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)', 'rgba(211, 87, 225, 1)'],
        data: [
          {value: 3236, name: '雷达对地成像卫星'},
          {value: 2451, name: '光学对地成像卫星'},
          {value: 503, name: '其他环境监测卫星'},
          {value: 629, name: '射频信号接收定位卫星'},
          {value: 1883, name: '气象环境探测卫星'},
          {value: 3111, name: '电子侦察卫星'},
          {value: 2000, name: '雷达成像侦查卫星'},
          {value: 2500, name: '光学成像侦察卫星'},
        ],
      },
      obj4: {
        name: '2019 年国外对地观测卫星成功发射数量',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)', 'rgba(211, 87, 225, 1)'],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 503, name: '印度'},
          {value: 629, name: '日本'},
          {value: 1883, name: '欧洲'},
          {value: 3111, name: '其他国家或组织'},
        ],
      },
      obj5: {
        name: '截至 2019 年底国外对地观测卫星在轨数量(按卫星类型统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '海洋环境探测卫星'},
          {value: 2451, name: '气象环境探测卫星'},
          {value: 503, name: '雷达对地成像卫星'},
          {value: 629, name: '光学对地成像卫星'},
          {value: 1883, name: '其他环境监测卫星'},
          {value: 3111, name: '气象环境监测卫星'},
          {value: 1234, name: '海洋环境监测卫星'},
          {value: 2345, name: '电子侦察卫星'},
          {value: 3421, name: '雷达成像侦察卫星'},
          {value: 3878, name: '光学成像侦察卫星'},
          {value: 4100, name: '射频信号接收定位卫星'},
          {value: 3121, name: '其他环境探测卫星'},
        ],
      },
      obj6: {
        name: '截至 2019 年底国外军用对地观测卫星在轨数量(按卫星所属国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)', 'rgba(211, 87, 225, 1)'],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 503, name: '印度'},
          {value: 629, name: '日本'},
          {value: 1883, name: '欧洲'},
          {value: 883, name: '以色列'},
          {value: 3111, name: '其他国家或组织'},
        ],
      },
      obj7: {
        name: '2019 年国外导航卫星在轨数量(按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '美国'},
          {value: 2451, name: '俄罗斯'},
        ],
      },
      obj8: {
        name: '2019 年国外导航卫星在轨运行并提供导航服务数量(按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
        ],
      },
      obj9: {
        name: '俄罗斯、美国在轨导航卫星组成',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: 'GLONASS-K'},
          {value: 2451, name: 'GLONASS-M'},
        ],
      },
      obj10: {
        name: '2019 年国外民商用通信中继卫星在轨数量 按轨道统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: 'HEO'},
          {value: 2451, name: 'MEO'},
          {value: 1234, name: 'LEO'},
          {value: 4321, name: 'GEO'},
        ],
      },
      obj11: {
        name: '2019 年国外通信卫星成功发射数量(按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
          {value: 1403, name: '其他国家'},
        ],
      },
      obj12: {
        name: '截至 2019 年底国外军用通信中继卫星在轨数量(按轨道类型统计）',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
          {value: 1403, name: '其他国家'},
        ],
      },
      obj13: {
        name: '截至 2019 年底国外军用通信中继卫星在轨数量(按国家分布情况)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
          {value: 1403, name: '其他国家'},
        ],
      },
      obj14: {
        name: '截至 2019 年底国外军用通信中继卫星在轨数量(按用途分布情况)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '通信广播'},
          {value: 2451, name: '收据中继'},
        ],
      },
      obj15: {
        name: '截至 2019 年底国外在轨通信卫星数量〈按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '印度'},
          {value: 629, name: '日本'},
          {value: 503, name: '欧洲'},
          {value: 1403, name: '其他国家'},
        ],
      },
      obj16: {
        name: '\n' +
            '截至 2019 年底国外预警监视卫星在轨数量(按国家统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '俄罗斯'},
          {value: 2451, name: '美国'},
          {value: 1883, name: '加拿大'},
          {value: 503, name: '欧洲'},
        ],
      },
      obj17: {
        name: '截至 2019 年底国外预警监视卫星在轨数量(按类型统计)',
        color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)',
          'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)',
          'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)',
          'rgba(211, 87, 225, 1)', 'rgba(185, 225, 87, 1)',
          'rgba(224, 225, 87, 1)', 'rgba(120, 225, 87, 1)',
          'rgba(87, 215, 225, 1)', 'rgba(179, 87, 225, 1)',

        ],
        data: [
          {value: 3236, name: '空目标监测卫星'},
          {value: 2451, name: '导弹预警卫星'},
        ],
      },
      nowequipmentList: [],
      echartIndex: 1,
      isLeft: false,
      // 战略演习
      exercise: 1,
      // 发射
      launch: '航天器',
      isActive: "",
      myChart: "",
      dialogFormVisible: false,
      imgs: {
        one: require('@/assets/images/u88.png'),
        two: require('@/assets/images/u89.png'),
        three: require('@/assets/images/u90.png'),
        four: require('@/assets/images/sky.png'),
        gif1: require('@/assets/images/u66.gif'),
        gif2: require('@/assets/images/u68.gif'),
      },
      send: "",
      form: {
        date: 2020,
      },
      formLabelWidth: "120px",
      date: "",
      country: '',
      countryList: [],
      lineDataAll: [],
      lineData: [
        {
          name: "美国", // 年份
          type: "line",
          // true //可以让我们的折线显示带有弧度
          smooth: false,
          data:
          // 两个数组是因为有两条线
              [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          // 国家的全部发射基地数量
          count: 12

        },
        {
          name: "俄罗斯", // 年份
          type: "line",
          //true //可以让我们的折线显示带有弧度
          smooth: false,
          data:
          // 两个数组是因为有两条线
              [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
          // 国家的全部发射基地数量
          count: 12

        },
        {
          name: "日本", // 年份
          type: "line",
          // true 可以让我们的折线显示带有弧度
          smooth: false,
          data:
          // 两个数组是因为有两条线
              [13, 15, 12, 17, 11, 37, 108, 81, 53, 54, 52, 110],
          // 国家的全部发射基地数量
          count: 12

        },
        {
          name: "法国", // 年份
          type: "line",
          //     true 可以让我们的折线显示带有弧度
          smooth: false,
          data:
          // 两个数组是因为有两条线
              [123, 185, 192, 117, 181, 167, 198, 121, 143, 164, 176, 138],
          // 国家的全部发射基地数量
          count: 12

        },
        {
          name: "印度", // 年份
          type: "line",
          //     true 可以让我们的折线显示带有弧度
          smooth: false,
          data:
          // 两个数组是因为有两条线
              [223, 275, 212, 297, 121, 27, 198, 121, 243, 264, 276, 238],
          // 国家的全部发射基地数量
          count: 12

        },
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.action = window._CONFIG['baseURL'] + 'satelliteLaunching/importExcel'
    this.action1 = window._CONFIG['baseURL'] + 'mainEquipment/importExcel'
    this.action2 = window._CONFIG['baseURL'] + 'strategyManoeuvre/importExcel'
    this.action3 = window._CONFIG['baseURL'] + 'spaceStrength/importExcel'
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    var that = this;
    this.getNum();
    window.onresize = function () {
      that.myChart.resize();
    };
    // this.initEcharts1();
    // this.initEcharts2();
    // this.initEcharts3();
  },
  filters: {
    arrformat(arr) {
      if(arr.length==0) {
        return []
      }else {
        var list = []
        for(var i = 0 ; i < arr.length; i++) {
          list.push(arr[i].url)
        }
        return list
      }
    }
  },
  methods: {
    componentsReady() {
      this.$refs.fullpage.init()
    },
    typechange(val) { 
      this.typename6 = val
    },
    // 新增太空领域威胁二级
    threatenAdd() {
      this.tableBox2 = true
      this.isEdit = false
      this.tableForm2 = {
        pid:'',
        hasChild:'0',
        typename:'',
        contents:''
      }
    },
    // 删除太空领域威胁二级
    delThreaten() {
      if(this.activeTable.typename) {
        this.$confirm('此操作将永久删除'+this.activeTable.typename+', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleThreaten({id: this.activeTable.id}).then((res)=>{
          var {data} = res
          if(data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getclassThreaten()
          }
        })

      }).catch(() => {

      })
      }else {
        this.$message.error('一级分类不可删除！')
      }
      
    },
    // 编辑太空领域威胁
    editThreaten(data) {
      if(this.activeTable.id) {
        this.tableBox2 = true
        this.isEdit = true
        console.log(this.activeTable.id)
        this.tableForm2 = {
          id: this.activeTable.id,
          pid:this.activeTable.pid,
          hasChild:'0',
          typename:this.activeTable.typename,
          contents:this.activeTable.contents
        }
      }else {
        this.$message.error('一级分类不允许编辑')
      }
      
    },
    // 获取太空领域威胁挑战的一级分类
    getclassThreaten() {
      classThreaten().then((res)=>{
        var {data} = res
        if(data.code == 200) {
          this.classThreatenList = data.result.records
          this.getSendThreaten(data.result.records[this.Threatenindex].id)
        }
      })
    },
    // 点击一级分类
    togglethreat(data,index) {
      this.Threatenindex = index
      this.sendThreatenIndex = 0
      this.getSendThreaten(data.id)
    },
    // 点击二级分类
    togglesendthreat(data,index) {
      this.sendThreatenIndex = index
      this.activeTable = this.sendclassThreatenList[index]
    },
    // 二级分类
    getSendThreaten(id) {
      sendclassThreaten({
        pid: id
      }).then((res)=>{
        var {data} = res
        if(data.code == 200) {
          if(data.result.length == 0) {
            this.sendclassThreatenList = data.result
            this.activeTable = {}
          }else {
            this.sendclassThreatenList = data.result
            this.activeTable = data.result[this.sendThreatenIndex]
          }

        }
      })
    },
    // 获取太空力量部署图的列表
    getdeploymentList() {
      getdeployment().then((res)=>{
        var { data } = res
        if(data.code == 200) {
          console.log(data)
          var datas = data.result
          var arr = []
          for(var i = 0 ; i < datas.length; i++) {
            datas[i].name= datas[i].baseName,
            datas[i].value= [datas[i].longitude, datas[i].latitude]
            datas[i].country= datas[i].countryArea
            datas[i].content= datas[i].baseIntroduce
          }
          this.satelliteData = datas
        }
      })
    },
    getFile(file) {
      this.tableForm.equipDescribeImg = file
    },
    getFile1(file){
      this.tableForm1.manoeuvreSiteImg = file
    },
    getFile2(file) {
      this.tableForm1.manoeuvreTargetImg = file
    },
    getFile3(file) {
      this.tableForm1.manoeuvreSceneImg = file
    },
    getFile4(file) {
      this.tableForm1.manoeuvreTroopsImg = file
    },
    getFile5(file) {
      this.tableForm1.manoeuvreCrewsImg = file
    },
    getFile6(file) {
      console.log(file)
      this.tableForm1.manoeuvreContentImg = file
    },
    // 太空发射编辑
    equipEdit(obj) {
      this.tableBox = true
      console.log(obj)
    },
    // 太空发射删除
    epuipDelete(obj) {

    },
    // 下载战略演习的模板
    exerciseTemplate() {
      manoeuvre().then((data) => {
        var datas = data.data
        if (!datas) {
          this.$message.warning("文件下载失败")
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([datas], {type: 'application/vnd.ms-excel'}), '太空战略演习导入模板.xls')
        } else {
          let url = window.URL.createObjectURL(new Blob([datas], {type: 'application/vnd.ms-excel'}))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '太空战略演习导入模板.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象
        }
      })
    },
    // 获取所有的战略演习图
    getmaneuvers() {
      maneuvers().then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.maneuverClass = data.result
          this.exercise = data.result[0]
          this.geteManeuversList()
        }
      })
    },
     // 获取所有的战略演习图
    getmaneuverss() {
      maneuvers().then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.maneuverClass = data.result
          this.geteManeuversList()
        }
      })
    },
    Exercisetoggle(str) {
      this.exercise = str
      this.pageno =1
      this.geteManeuversList()
    },
    geteManeuversList() {
      maneuversList({
        manoeuvreName: this.exercise,
        pageNo: this.pageno,
        pageSize: this.pagesize
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          var datas = data.result.records
          for(var i =0  ;i<datas.length;i++) {
            var obj = datas[i]
            for(var key in obj) {
              if(key.indexOf('Img')!=-1) {
                if(obj[key] == ''&&!obj[key]) {
                  obj[key] = []
                  if(key.indexOf('Content')!=-1) {
                    obj['ContentImg'] = []
                  }else if(key.indexOf('Crews')!=-1) {
                    obj['CrewsImg'] = []
                  }else if(key.indexOf('Scene')!=-1) {
                    obj['SceneImg'] = []
                  }else if(key.indexOf('Site')!=-1) {
                    obj['SiteImg'] = []
                  }else if(key.indexOf('Target')!=-1) {
                    obj['TargetImg'] = []
                  }else if(key.indexOf('Troops')!=-1) {
                    obj['TroopsImg'] = []
                  }
                }else {
                  var arr = []
                  var arr1 = []
                  var str = obj[key].split(',')
                  for(var j = 0;j< str.length;j++) {
                    arr.push({
                      name:'',
                      url:str[j]
                    })
                    arr1.push(str[j])
                  }
                  obj[key] = arr
                  if(key.indexOf('Content')!=-1) {
                    obj['ContentImg']=arr1
                  }else if(key.indexOf('Crews')!=-1) {
                    obj['CrewsImg']=arr1
                  }else if(key.indexOf('Scene')!=-1) {
                    obj['SceneImg']=arr1
                  }else if(key.indexOf('Site')!=-1) {
                    obj['SiteImg']=arr1
                  }else if(key.indexOf('Target')!=-1) {
                    obj['TargetImg']=arr1
                  }else if(key.indexOf('Troops')!=-1) {
                    obj['TroopsImg']=arr1
                  }
                }
              }
            }
          }
          this.maneuversList = datas
          this.total = data.result.total
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val
      if(this.echartIndex==2) {
        this.geteManeuversList()
      }else if(this.echartIndex == 1) {
        this.getmainEquipment()

      }
    },
    handleCurrentChange(val) {
      this.pageno = val
       if(this.echartIndex==2) {
        this.geteManeuversList()
      }else if(this.echartIndex == 1) {
        this.getmainEquipment()

      }
    },

    // 文件上传成功
    success(response, file, fileList) {
      this.$refs.upload.clearFiles()
      if (response.success) {
        this.$message({
          type: 'success',
          message: response.message
        })
        if(this.echartIndex ==1) {
          this.getequips()
        }
        if(this.echartIndex ==2) {
          this.getmaneuvers()
        }
        if(this.echartIndex == 6 ) {
          this.getdeploymentList()
        }
        if (response.result.list) {
          this.dialogResult = true
        }
        let result = response.result
        //整体情况
        this.text =
            '<a style="font-weight: 600">您上传的'
            +
            '</a>表格文件共有 <a style="font-weight: 600;color:#ffba40"> ' +
            result.Size +
            ' </a>条数据,  成功  <a style="font-weight: 600;color:#3B78EE"> ' +
            result.successSize +
            ' </a>条数据, 失败<a style="font-weight: 600;color:#f56c6c">  ' +
            result.errorSize +
            '</a> 条数据'
        //情况列表
        let list = result.list
        this.data = []
          for (let i = 0; i < list.length; i++) {
            let temp = {}
            //数据
            temp.data =list[i].errorData||list[i].launchCountry
            temp.cause = list[i].errorCause||'数据库已有重复数据，请勿重复输入'
            //原因
            this.data.push(temp)
          }

      } else {
        this.$refs.upload.clearFiles()
        this.$message.error(response.message)
      }
    },
    // 文件上传失败
    errors(error, file, fileList) {
      this.$refs.upload.clearFiles()
      console.log(error)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeAvatarUpload(file) {
      let fileName = file.name;
      let pos = fileName.lastIndexOf(".");
      let lastName = fileName.substring(pos, fileName.length);
      if (
          lastName.toLowerCase() !== ".xls"
      ) {
        this.$message.error("文件必须为.xls 类型");
        this.$refs.upload.clearFiles()
      }
    },
    handlePreview(file) {
    },
    uploadTemplate() {
      Equipments().then((data) => {
        var datas = data.data
        if (!data) {
          this.$message.warning("文件下载失败")
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([datas], {type: 'application/vnd.ms-excel'}), '太空装备导入模板.xls')
        } else {
          let url = window.URL.createObjectURL(new Blob([datas], {type: 'application/vnd.ms-excel'}))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '太空装备导入模板.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象
        }
      })
    },
    EquipmentImport() {

    },
    ExerciseImport() {

    },
    // 下载模板
    downTemplate() {
      template().then((data) => {
        var datas = data.data
        if (!datas) {
          this.$message.warning("文件下载失败")
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([datas], {type: 'application/vnd.ms-excel'}), '太空发射导入模板.xls')
        } else {
          let url = window.URL.createObjectURL(new Blob([datas], {type: 'application/vnd.ms-excel'}))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '太空发射导入模板.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象
        }
      })
    },
    downdeployment() {
      deployment().then((data) => {
        var datas = data.data
        if (!datas) {
          this.$message.warning("文件下载失败")
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([datas], {type: 'application/vnd.ms-excel'}), '太空力量部署导入模板.xls')
        } else {
          let url = window.URL.createObjectURL(new Blob([datas], {type: 'application/vnd.ms-excel'}))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '太空力量部署导入模板.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象
        }
      })
    },
    // 导入
    importTemplate() {

    },
    // 力量部署图导入
    deployTemplate() {

    },
    // 根据一级分类获取二级分类
    getequip() {
      equip({type: this.equipType}).then((res) => {
        var {data} = res
        if (data.code == 200) {
          var datas = data.result
          this.nowequipmentList = datas
          this.sendIndex = 0
          this.equipModel = datas[0]
          this.getmainEquipment()
          this.getStatistic()
        }
      })
    },
     // 根据一级分类获取二级分类
    getequips() {
      equip({type: this.equipType}).then((res) => {
        var {data} = res
        if (data.code == 200) {
          var datas = data.result
          this.nowequipmentList = datas
          this.equipModel = datas[this.sendIndex]
          this.getmainEquipment()
          this.getStatistic()
        }
      })
    },
    // 根据一级分类和二级分类获取分页下的所有数据
    getmainEquipment() {
      mainEquipment({
        type: this.equipType,
        model: this.equipModel,
        pageNo: this.pageno,
        pageSize: this.pagesize,
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          var datas = data.result.records
          for(var i =0  ;i<datas.length;i++) {
            var obj = datas[i]
            for(var key in obj) {
              if(key.indexOf('Img')!=-1) {
                var arr = []
                var arrr = []
                if(obj[key] == ''||!obj[key]) {
                  obj[key] = []
                  obj.imArr = []
                }else {
                  if(obj[key]) {
                    var str = obj[key].split(',')
                    for(var j = 0;j< str.length;j++) {
                      arr.push({
                        name:'',
                        url:str[j]
                      })
                      arrr.push(str[j])
                    }
                    obj[key] = arr
                    obj.imArr = arrr
                  }else{
                    obj.imArr = []
                  }
                }
              }
            }
          }
          this.equipList = datas
          this.total = data.result.total
        }
      })
    },
    // 装备图的统计图
    getStatistic() {
      Statistics({
        type: this.equipType,
        model: this.equipModel
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          var obj = {
            name: '统计图',
            color: ['rgba(255, 162, 109, 1)', 'rgba(0, 121, 254, 1)', 'rgba(255, 180, 175, 1)', 'rgba(75, 216, 99, 1)', 'rgba(238, 203, 95, 1)', 'rgba(225, 103, 87, 1)'],
            data: data.result
          }
          this.equipPie = obj
        }
      })
    },
    //获取太空发射统图
    getFashe() {
       // 发送请求
        LaunchStatistics({
          launchTime_begin: null,
          launchTime_end: null
        }).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.lineData = data.result
            var datas = data.result
            var arr = []
            var lineData = []
            for (var key in datas) {
              var obj = {
                value: key,
                lable: key
              }
              arr.push(obj)
              var ydata = []
              var xdata = []
              for (var keys in datas[key]) {
                xdata.push(keys)
                ydata.push(datas[key][keys])
              }
              var obj = {
                name: key, // 年份
                type: "line",
                // true //可以让我们的折线显示带有弧度
                smooth: false,
                data: ydata,
                xdata: xdata,
                // 国家的全部发射基地数量
                count: 0
              }
              lineData.push(obj)
            }
            this.countryList = arr
            this.lineData = lineData
            this.lineDataAll = JSON.parse(JSON.stringify(lineData))
          }
        })
    },
    // 统计图时间选择
    dataPicker() {
      if(this.start==''&&this.end=='') {

      }else {
        // 发送请求
        LaunchStatistics({
          launchTime_begin: this.start,
          launchTime_end: this.end
        }).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.lineData = data.result
            var datas = data.result
            var arr = []
            var lineData = []
            for (var key in datas) {
              var obj = {
                value: key,
                lable: key
              }
              arr.push(obj)
              var ydata = []
              var xdata = []
              for (var keys in datas[key]) {
                xdata.push(keys)
                ydata.push(datas[key][keys])
              }
              var obj = {
                name: key, // 年份
                type: "line",
                // true //可以让我们的折线显示带有弧度
                smooth: false,
                data: ydata,
                xdata: xdata,
                // 国家的全部发射基地数量
                count: 0
              }
              lineData.push(obj)
            }
            this.countryList = arr
            this.lineData = lineData
            this.lineDataAll = JSON.parse(JSON.stringify(lineData))
          }
        })
      }

    },
    // 获取所有的统计图国家
    getCountry() {
      getCountryList().then((res) => {
        var {data} = res
        if (data.code == 200) {
          var datas = data.result
          var arr = []
          for (var i = 0; i < datas.length; i++) {
            var obj = {
              value: datas[i],
              lable: datas[i],
            }
            arr.push(obj)
          }
          this.countryList = arr
        }
      })
    },
    tableAdd() {
      this.isEdit = false
      this.tableBox = true
      this.tableForm = {
        name: '',
        time: '',
        country: '',
        category: '',
        trajectory: '',
        remarks: ''
      }
    },
    tableAdd1() {
      this.isEdit = false
      this.tableBox1 = true
      this.tableForm1 = {
        country: "",
        name: "",
        performance: "",
        remarks: "",
        time: ""
      }
    },
    // 打开编辑表格弹出层
    tableEdit(datas) {
      this.isEdit = true
      this.tableBox = true
      var data = JSON.parse(JSON.stringify(datas))
      this.tableForm={
        id: data.id,
        equipType:data.equipType,
        equipModel:data.equipModel,
        equipName: data.equipName,
        launchCountry:data.launchCountry,
        launchTime:data.launchTime,
        launchWay:data.launchWay,
        equipDescribe:data.equipDescribe,
        equipDescribeImg:data.equipDescribeImg
      }
    },
    tableDel(data) {
      this.$confirm('此操作将永久删除该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        mainEquipmentDel({
          id:data.id
        }).then((res)=>{
          var {data} = res
          if(data.code == 200) {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.getmainEquipment()
            this.getequips()
          }
        })
      }).catch(() => {

      });
    },
    // 编辑表格1
    tableBoxYes() {
      var formdata = this.tableForm
      for(var key in formdata) {
        if(key.indexOf('Img')!=-1) {
          if(formdata[key].length==0) {
            formdata[key] = ''
          }else {
            var str = ''
            for(var i = 0 ; i < formdata[key].length;i++) {
              str+=formdata[key][i].url+','
            }
            str=str.slice(0,str.length-1)
            formdata[key] = str
          }
        }
      }
      if (this.isEdit) {
        mainEquipmentedit(formdata).then((res) => {
          var {data} = res
          if (data.code == 200) {
            // 关闭第二层的编辑/新增弹窗
            if (this.isEdit) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
            }
            this.tableBox = false
            this.getequips()

            // this.getsatellite()
            // 刷新当前的视图
          }
        })
      } else {
        mainEquipmentAdd(formdata).then((res) => {
          var {data} = res
          if (data.code == 200) {
            // 关闭第二层的编辑/新增弹窗
            if (this.isEdit) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
            }
            this.tableBox = false
            // this.getsatellite()
            // 刷新当前的视图
            this.getequips()
          }
        })
      }
      this.tableBox = false
      this.getmainEquipment()
      this.getequips()
        
     

    },
    // 获取第一个表格的数据（2019 年国外军事通信卫星发射活动概览）
    getTableBox() {
      getUploadView({
        key: '2019 年国外军事通信卫星发射活动概览',
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (data.result == null) {
            this.activity = []

          } else {
            this.activity = data.result
          }

        }
      })
    },
    // 获取第二个表格（其他国家军事通信卫星体系与能力）
    getTableBox1() {
      getUploadView({
        key: '其他国家军事通信卫星体系与能力',
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (data.result == null) {
            this.activity1 = []
          } else {
            this.activity1 = data.result
          }
        }
      })
    },
    // 修改/编辑第二个表格的数据（其他国家军事通信卫星体系与能力）
    tableBoxYes1() {
      var formdata = this.tableForm1
      for(var key in formdata) {
        if(key.indexOf('Img')!=-1) {
          if(formdata[key].length==0) {
            formdata[key] = ''
          }else {
            var str = ''
            for(var i = 0 ; i < formdata[key].length;i++) {
              str+=formdata[key][i].url+','
            }
            str=str.slice(0,str.length-1)
            formdata[key] = str
          }
        }
      }
      if (this.isEdit) {
        manoeuver(formdata).then((res) => {
          var {data} = res
          if (data.code == 200) {
            // 关闭第二层的编辑/新增弹窗
            if (this.isEdit) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
            }
            this.tableBox1 = false
            this.getmaneuverss()
            // this.getsatellite()
            // 刷新当前的视图
          }
        })

      } else {
        manoeuverAdd(formdata).then((res) => {
          var {data} = res
          if (data.code == 200) {
            // 关闭第二层的编辑/新增弹窗
            if (this.isEdit) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
            }
            this.tableBox1 = false
            // this.getsatellite()
            // 刷新当前的视图
          }
        })
      }
      this.tableBox1 = false
      this.geteManeuversList()
    },
    // 修改太空战略演习table
    tableBoxYes3() {
      if (this.isEdit) {
        this.activity2[this.exercise - 1].child[this.activeIndex] = this.tableForm3
      } else {
        this.activity2[this.exercise - 1].child.push(this.tableForm3)
      }
      getUploadView({
        key: '太空战略演习',
        value: this.activity2
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (this.isEdit) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
          }
          // 关闭第二层的编辑/新增弹窗
          this.tableBox3 = false
          // this.getsatellite()
          // 刷新当前的视图
          this.getTableBox3()
        }
      })
    },
    getTableBox3() {
      getUploadView({
        key: '太空战略演习',
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (data.result == null) {
            this.activity2 = []
            this.activeActivity2 = []
          } else {
            this.activity2 = data.result
            this.activeActivity2 = data.result[this.exercise - 1].child
          }
        }
      })
    },
    tableEdit1(datas) {
      this.isEdit = true
      this.tableBox1 = true
      var data = JSON.parse(JSON.stringify(datas))
      this.tableForm1 = {
        id:data.id,
        manoeuvreName:data.manoeuvreName,
        manoeuvreTime:data.manoeuvreTime,
        manoeuvreCountry: data.manoeuvreCountry,
        manoeuvreSite:data.manoeuvreSite,
        manoeuvreSiteImg:data.manoeuvreSiteImg,
        manoeuvreLevel:data.manoeuvreLevel,
        manoeuvreTarget:data.manoeuvreTarget,
        manoeuvreTargetImg:data.manoeuvreTargetImg,
        manoeuvreScene:data.manoeuvreScene,
        manoeuvreSceneImg:data.manoeuvreSceneImg,
        manoeuvreTroops:data.manoeuvreTroops,
        manoeuvreTroopsImg:data.manoeuvreTroopsImg,
        manoeuvreCrews:data.manoeuvreCrews,
        manoeuvreCrewsImg:data.manoeuvreCrewsImg,
        manoeuvreContent:data.manoeuvreContent,
        manoeuvreContentImg:data.manoeuvreContentImg
      }
    },
    tableDel1(data) {
      this.$confirm('此操作将永久删除该行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        manoeuverDel({
          id:data.id
        }).then((res)=>{
          var {data} = res
          if(data.code == 200) {
            this.$message({
              type: 'success',
              message: data.message
            })
          }
          this.geteManeuversList()
          this.getmaneuverss()
        })
      }).catch(() => {

      });

    },
    tableEdit2(index) {
      this.isEdit = true
      this.activeIndex = index
      this.tableBox2 = true
      this.tableForm2 = this.activity3[index]
    },
    tableDel2(index) {
      this.activity3.splice(index, 1)
      getUploadView({
        key: '美国天、地基太空态势感知系统',
        value: this.activity3
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.$message({
            type: 'success',
            message: '刪除成功'
          })
          this.tableBox2 = false
          // 刷新当前列表
          this.getTableBox2()
        }
      })
    },
    addtableEdit() {
      this.isEdit = false
      this.tableBox2 = true
      this.tableForm2 = {
        name: '',
        category: '',
        position: '',
        count: '',
        remarks: ''
      }
    },
    // 获取表格数据（美国天、地基太空态势感知系统）
    getTableBox2() {
      getUploadView({
        key: '美国天、地基太空态势感知系统',
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (data.result == null) {
            this.activity3 = []
          } else {
            this.activity3 = data.result
          }
        }
      })
    },
    // 美国天、地基太空态势感知系统编辑./新增
    tableBoxYes2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
if (this.isEdit) {
        var form = {
          id: this.tableForm2.id,
          contents: this.tableForm2.contents,
          pid: this.tableForm2.pid,
          typename: this.tableForm2.typename,
          hasChild: ''
        }
        editThreaten(form).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.tableBox2 = false
            this.getclassThreaten()
          }else {
            this.$message.info(data.message)
          }
        })
      } else {
        var form = {
          contents: this.tableForm2.contents,
          pid: this.tableForm2.pid,
          typename: this.tableForm2.typename,
          hasChild: '0'
        }
        addThreaten(form).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.tableBox2 = false
            this.getclassThreaten()
          } else {
            this.$message.error(data.message)
          }
        })
      }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    tableEdit3(index) {
      this.isEdit = true
      this.activeIndex = index
      this.tableBox3 = true
      this.tableForm3 = this.activeActivity2[index]
    },
    tableDel3(index) {
      this.activeActivity2.splice(index, 1)
      this.activity2[this.exercise - 1].child = this.activeActivity2
      getUploadView({
        key: '太空战略演习',
        value: this.activity2
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.$message({
            type: 'success',
            message: '刪除成功'
          })
          // 关闭第二层的编辑/新增弹窗
          // this.getsatellite()
          // 刷新当前的视图
          this.getTableBox3()
        }
      })
    },
    // 新增战略演习
    addExercise() {
      this.isEdit = false
      this.tableBox1 = true
      this.tableForm1 = {
        manoeuvreName:'',
        manoeuvreTime:'',
        manoeuvreCountry: '',
        manoeuvreSite:'',
        manoeuvreSiteImg:[],
        manoeuvreLevel:'',
        manoeuvreTarget:'',
        manoeuvreTargetImg:[],
        manoeuvreScene:'',
        manoeuvreSceneImg:[],
        manoeuvreTroops:'',
        manoeuvreTroopsImg:[],
        manoeuvreCrews:'',
        manoeuvreCrewsImg:[],
        manoeuvreContent:'',
        manoeuvreContentImg:[]
      }
    },
    // 编辑饼图
    editPies() {
      this.pieBox = true
    },

    // 获取饼图
    getPie() {
      getUploadView({
        key: '饼图',
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (data.result == null) {
            this.pies = []
            this.obj1 = []
            this.obj2 = []
            this.obj3 = []
            this.obj4 = []
            this.obj5 = []
            this.obj6 = []
            this.obj7 = []
            this.obj8 = []
            this.obj9 = []
            this.obj10 = []
            this.obj11 = []
            this.obj12 = []
            this.obj13 = []
            this.obj14 = []
            this.obj15 = []
            this.obj16 = []
            this.obj17 = []
          } else {
            this.pies = data.result
            this.obj1 = this.pies[0]
            this.obj2 = this.pies[1]
            this.obj3 = this.pies[2]
            this.obj4 = this.pies[3]
            this.obj5 = this.pies[4]
            this.obj6 = this.pies[5]
            this.obj7 = this.pies[6]
            this.obj8 = this.pies[7]
            this.obj9 = this.pies[8]
            this.obj10 = this.pies[9]
            this.obj11 = this.pies[10]
            this.obj12 = this.pies[11]
            this.obj13 = this.pies[12]
            this.obj14 = this.pies[13]
            this.obj15 = this.pies[14]
            this.obj16 = this.pies[15]
            this.obj17 = this.pies[16]
          }
          // 关闭第二层的编辑/新增弹窗
          this.pies = data.result
          this.obj1 = this.pies[0]
          this.obj2 = this.pies[1]
          this.obj3 = this.pies[2]
          this.obj4 = this.pies[3]
          this.obj5 = this.pies[4]
          this.obj6 = this.pies[5]
          this.obj7 = this.pies[6]
          this.obj8 = this.pies[7]
          this.obj9 = this.pies[8]
          this.obj10 = this.pies[9]
          this.obj11 = this.pies[10]
          this.obj12 = this.pies[11]
          this.obj13 = this.pies[12]
          this.obj14 = this.pies[13]
          this.obj15 = this.pies[14]
          this.obj16 = this.pies[15]
          this.obj17 = this.pies[16]
          // this.getsatellite()
          // 刷新当前的视图

        }
      })
    },
    // 新增饼图弹窗
    addPies() {
      this.pieForm = {
        name: [],
        data: [{
          key: '',
          value: ''
        }]
      }
      this.pie = true
    },
    editPie(obj, index) {
      this.isEdit = true
      this.activeIndex = index
      this.pieForm = obj
      this.pie = true
    },
    deltePie(index) {
      this.pies.splice(index, 1)
      getUploadView({
        key: '饼图',
        value: this.pies
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.$message({
            type: 'success',
            message: '刪除成功'
          })
          // this.getsatellite()
          // 刷新当前的视图
          this.getPie()
        }
      })
    },
    // 新增/编辑饼图
    pieYes() {
      if (this.isEdit) {
        this.pies[this.activeIndex] = this.pieForm
      } else {
        this.pies.push(this.pieForm)
      }
      getUploadView({
        key: '饼图',
        value: this.pies
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (this.isEdit) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
          }
          // 关闭第二层的编辑/新增弹窗
          this.pie = false
          // this.getsatellite()
          // 刷新当前的视图
          this.getPie()
        }
      })
    },
    // 搜索条件删除
    del(index) {
      this.launchRow.splice(index, 1);
    },
    // 搜索条件增加
    add() {
      this.launchRow.push({
        key: "",
        value: "",
      });
    },
    delPie(index) {
      this.pieForm.data.splice(index, 1)
    },
    // 搜索条件增加
    addPie() {
      this.pieForm.data.push({
        name: "",
        value: "",
      });
    },
    wordBack() {
      this.$refs.world.init()
      this.isChina = false
    },
    china() {
      this.isChina = true
    },
    editLaunch(obj, index) {
      this.isEdit = true
      this.activeIndex = index
      this.Launch = true
      // this.launchRow = []
      // this.launchRow.push(obj)
      this.LaunchForm.country = obj.name
      this.LaunchForm.count = obj.count
      var data = obj.data
      this.launchRow = []
      for (var i = 0; i < data.length; i++) {
        var obj = {
          key: i + 1 + '月',
          value: data[i]
        }
        this.launchRow.push(obj)
      }
    },
    delteLaunch(index) {
      this.lineData.splice(index, 1)
      getUploadView({
        key: '统计图',
        value: this.lineData
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.$message({
            type: 'success',
            message: '刪除成功'
          })
          // 关闭第二层的编辑/新增弹窗
          this.Launch = false
          // this.getsatellite()
          // 刷新当前的视图
          // this.getStatistics()

        }
      })
    },
    // 获取统计图
    getStatistics() {
      getUploadView({
        key: '统计图',
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (data.result == null) {
            this.lineData = []
            this.lineDataAll = []
            var arr = []
            for (var i = 0; i < data.result.length; i++) {
              arr.push({
                lable: data.result[i].name,
                value: data.result[i].name,
              })
            }
            this.countryList = arr
            // 关闭第二层的编辑/新增弹窗
            this.Launch = false
          } else {
            this.lineData = data.result
            this.lineDataAll = data.result
            var arr = []
            for (var i = 0; i < data.result.length; i++) {
              arr.push({
                lable: data.result[i].name,
                value: data.result[i].name,
              })
            }
            this.countryList = arr
            // 关闭第二层的编辑/新增弹窗
            this.Launch = false
          }
        }
      })
    },
    // 编辑修改发射统计（柱状图，折线图）
    lauchYes() {
      if (this.isEdit) {
        var arr = []
        for (var i = 0; i < this.launchRow.length; i++) {
          arr.push(this.launchRow[i].value)
        }
        var obj = {
          name: this.LaunchForm.country, // 年份
          type: "line",
          // true //可以让我们的折线显示带有弧度
          smooth: false,
          data: arr, // 两个数组是因为有两条线
          // 国家的全部发射基地数量
          count: this.LaunchForm.count
        }
        this.lineData[this.activeIndex] = obj
      } else {
        var arr = []
        for (var i = 0; i < this.launchRow.length; i++) {
          arr.push(this.launchRow[i].value)
        }
        var obj = {
          name: this.LaunchForm.country, // 年份
          type: "line",
          // true //可以让我们的折线显示带有弧度
          smooth: false,
          data: arr, // 两个数组是因为有两条线
          // 国家的全部发射基地数量
          count: this.LaunchForm.count
        }
        this.lineData.push(obj)

      }
      getUploadView({
        key: '统计图',
        value: this.lineData
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (this.isEdit) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
          }
          // 关闭第二层的编辑/新增弹窗
          this.Launch = false
          // this.getsatellite()
          // 刷新当前的视图
          // this.getStatistics()

        }
      })
    },

    // 编辑发射场统计
    editFsc() {
      this.LaunchBox = true
    },
    editchange(val) {
      console.log(val)
    },
    init() {
      this.$nextTick(() => {
        console.log(document.getElementById('div1'))
        const editor = new E(document.getElementById('div1'))
        // 或者 const editor = new E( document.getElementById('div1') )
        editor.create()
        editor.txt.html('')
      })

    },
    // 获取发射基地的列表
    getsatellite() {
      if (this.echartIndex == 5) {
        var formData = {
          key: '发射图'
        }
      } else {
        var formData = {
          key: '部署图'
        }
      }
      getUploadView(formData).then((res) => {
        var {data} = res
        if (data.code == 200) {
          if (data.result == null) {
            this.satelliteData = []
          } else {
            this.satelliteData = data.result
          }
        }
      })
    },
    // 打开编辑/新建基地
    edit(obj, index) {
      this.activeIndex = index
      this.isEdit = true
      this.innerVisible = true
      this.satelliteform.name = obj.name
      this.satelliteform.longitude = obj.value[0]
      this.satelliteform.latitude = obj.value[1]
      this.satelliteform.altitude = obj.altitude
      this.satelliteform.baseCreateTime = obj.baseCreateTime
      this.satelliteform.country = obj.country
      if(obj.id) {
        this.satelliteform.id = obj.id
      }
      this.satelliteform.baseCreateTime = obj.baseCreateTime
      this.satelliteform.altitude = obj.altitude
      this.satelliteform.type = obj.type
      this.typename6 =  obj.type
      this.detail = obj.content
      // this.init()
    },
    delte(data,index) {
      if(this.echartIndex == 5) {
        this.satelliteData.splice(index, 1);
        if (this.echartIndex == 5) {
          var formData = {
            key: '发射图',
            value: this.satelliteData
          }
        } else {
          var formData = {
            key: '部署图',
            value: this.satelliteData
          }
        }
        getUploadView(formData).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '刪除成功'
            })
            // 关闭第二层的编辑/新增弹窗
            this.innerVisible = false
            this.getsatellite()
            // 刷新当前的视图

          }
        })
      }else {
          var id = data.id
          deldeployment({
            id:id
          }).then((res)=>{
            var {data} = res
            if(data.code == 200) {
              this.$message({
                type:'success',
                message: data.message
              })
              this.getdeploymentList()
            }else {
              this.$message({
                type:'info',
                message: data.message
              })
            }
          })
      }

    },
    // 打开新建基地
    satelliteAdd() {
      if(this.echartIndex == '5') {
        var obj = {
          name: this.satelliteform.name,
          value: [this.satelliteform.longitude, this.satelliteform.latitude],
          country: this.satelliteform.country,
          content: this.detail
        }
      }else {
        if(this.isEdit) {
          var obj = {
            baseName: this.satelliteform.name,
            longitude: this.satelliteform.longitude,
            latitude:this.satelliteform.latitude,
            countryArea: this.satelliteform.country,
            baseIntroduce: this.detail,
            altitude:this.satelliteform.altitude,
            id: this.satelliteform.id,
            baseCreateTime:this.satelliteform.baseCreateTime,
            type:this.typename6,
          }
        }else {
          var obj = {
            baseName: this.satelliteform.name,
            longitude: this.satelliteform.longitude,
            latitude:this.satelliteform.latitude,
            countryArea: this.satelliteform.country,
            baseIntroduce: this.detail,
            altitude:this.satelliteform.altitude,
            baseCreateTime:this.satelliteform.baseCreateTime,
            type:this.typename6,
          }
        }
      }
      if (this.isEdit&&this.echartIndex==5) {
        this.satelliteData[this.activeIndex] = obj
      }else if(this.isEdit&&this.echartIndex==6){
        editdeployment(obj).then((res)=>{
          console.log(res)
          var {data} = res
          if(data.code == 200) {
              this.$message({
                type:'success',
                message:data.message
              })
            this.innerVisible = false
            this.getdeploymentList()
          }else {
            this.$message.error(data.message)
          }
        })
      } else if(this.echartIndex==5) {
        this.satelliteData.push(obj)
      } else {
        adddeployment(obj).then((res)=>{
          var {data} = res
          if(data.code == 200) {
            this.$message({
              type:'success',
              message:data.message
            })
            this.innerVisible = false
            this.getdeploymentList()
          }else {
            this.$message.error(data.message)
          }
        })
      }
      if (this.echartIndex == 5) {
        var formData = {
          key: '发射图',
          value: this.satelliteData
        }
        getUploadView(formData).then((res) => {
          var {data} = res
          if (data.code == 200) {
            if (this.isEdit) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
            }
            // 关闭第二层的编辑/新增弹窗
            this.innerVisible = false
            this.getsatellite()
            // 刷新当前的视图

          }
        })
      } else {

      }


    },
    // 新增基地
    addBase() {
      this.innerVisible = true
      this.isEdit = false
      this.satelliteform.name = ''
      this.satelliteform.longitude = ''
      this.satelliteform.latitude = ''
      this.satelliteform.altitude = ''
      this.satelliteform.country = ''
      this.satelliteform.type = ''
      this.satelliteform.baseCreateTime = ''
      this.typename6 = ''
      this.detail = ''
    },
    // 新增国家统计
    addLauch() {
      this.isEdit = false
      this.Launch = true
      // this.launchRow = []
      // this.launchRow.push(obj)
      this.LaunchForm.country = ''
      this.LaunchForm.count = ''
      this.launchRow = []
      for (var i = 0; i < 12; i++) {
        var obj = {
          key: i + 1 + '月',
          value: ''
        }
        this.launchRow.push(obj)
      }
    },
    // 编辑发射卫星坐标
    editSatellite() {
      this.dialogSatellite = true
    },
    editDeploy() {
      this.dialogSatellite = true
    },
    // 切换发射图的tab
    toggleFive(index) {
      if(index==1) {
        this.fiveTab = true
      }else{
        this.fiveTab = false
      }
      this.fiveTabIndex = index
      if (this.fiveTabIndex == 2) {
        this.getCountry()
        this.dataPicker()
        // this.getStatistics()
      }
    },
    change() {
      var lineData = this.lineDataAll
      var selectCountry = this.country
      if(selectCountry.length == 0) {
        this.lineData = lineData
      }else {
        var arr = []
        for (var i = 0; i < selectCountry.length; i++) {
          for (var j = 0; j < lineData.length; j++) {
            if (lineData[j].name == selectCountry[i]) {
              arr.push(lineData[j])
            }
          }
        }
        this.lineData = arr
      }


    },
    // 切换发射
    toggleLauch(index, arr, name) {
      this.sendIndex = 1
      this.launch = index
      this.equipType = name
      this.pageno = 1
      this.getequip()
      if (index == 4) {
        this.getTableBox()
      }
      if (this.echartIndex == 3 && index == 2) {
        this.getTableBox2()
      }
    },
    toggleSend(index, indexx) {
      this.sendIndex = indexx
      this.equipModel = index
      this.getmainEquipment()
      this.pageno = 1
      this.getStatistic()
      if (index == 1 && this.launch == 4) {
        this.getTableBox()
      }
      if (index == 3 && this.launch == 4) {
        this.getTableBox1()
      }
    },
    // 切换战略演习
    toggle(index) {
      this.exercise = index
      this.activeActivity2 = this.activity2[index - 1].child
    },
    // 获取图表参数，展示相应的图表
    getNum() {
      this.isActive = this.$route.params.id;
      this.echartIndex = this.$route.params.id
      document.querySelector('.aaaaaa').style.display='none'
       
      if (this.isActive == 1) {
        this.getequip()
        // this.getPie()
      } else if (this.isActive == 2) {
        this.getmaneuvers()
        // this.getTableBox3()
      } else if (this.isActive == 3) {
        this.getclassThreaten()
        // this.getPie()
      } else if (this.isActive == 4) {
        this.launch =1
      } else if (this.isActive == 5) {
        this.getsatellite()
        this.getFashe()
        this.isLeft = true
      } else if (this.isActive == 6) {
        // this.getsatellite()
        this.getdeploymentList()
      }
      
    },
  },
};
</script>
<style scoped>
.page {
  background-color: #f2f2f2;
}

/* @import url(); 引入css类 */
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.content {
  padding: 0 20px;
  margin: 0 auto;
  overflow: hidden;
}

div {
  box-sizing: border-box;
}


ul {
  padding-top: 10px;
}

ul {
  margin: 0 auto;
}

.tabs {
  padding: 20px 0;
}

.tabs .tabItem.active {
  background-color: #3B78EE;
}

.two .content {
  padding: 0;
}

.tabs .tabItem {
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  margin-right: 5px;
  text-align: center;
  cursor: pointer;
  color: #FFF;
  font-size: 30px;
  display: inline-block;
  background-color: #08516A;
  z-index:999
}

.tabs .tabItem:first-child {

}

.tabs li a {
  color: #333;
  font-size: 16px;
  text-decoration: none;
}

table {
  text-align: center;
  border: 1px solid rgba(10, 71, 135, .4)
}

table td {
  min-height: 30px;
}

table tr:nth-child(1) td {
  font-size: 28px;
}

table tr td {
  font-size: 26px;
}

.one .view {
  height: 100%;
  background-size: 100% 100%;
}
.one table {
  height: calc(100vh - 280px);
  overflow-y: scroll;
}
.view.active {
  height: calc(100vh - 75px);
}
.view {
  background: #1B2631;
  min-height: 100vh;
}

#leftBox .contain {
  width: 100%;
  height: 100%;
  padding: 22px;
}

#leftBox .contain .title {
  font-weight: 500;
  font-size: 30px;
  color: #FFFFFF
}

#leftBox {
  width: 100%;
  padding: 20px 20px;
  margin: 0 auto;
  border: none;
  border-radius: 0px;
}

.leftMian {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(0, 6, 17, 0.4);;
}

.leftMian:before, .leftMian:after, .line:before, .line:after, .equipmentItem .box:before, .equipmentItem .box:after {
  position: absolute;
  content: "";
  clear: both;
  width: 21px;
  height: 21px;
  border: 2px solid rgba(0, 183, 196, 1);
}

.leftMian:before, .equipmentItem .box:before {
  left: 0;
  top: 0;
  border-right: none;
  border-bottom: none;
}

.leftMian:after, .equipmentItem .box:after {
  right: 0;
  top: 0;
  border-left: none;
  border-bottom: none;
}

.line:before {
  left: 0;
  bottom: 0;
  border-right: none;
  border-top: none;
}

.line:after {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

.searchHead {
  margin-top: 22px;
  width: 100%;
  height: 66px;
  background: rgba(4, 54, 81, 1);
  padding-left: 31px;
  line-height: 66px;
  font-weight: 400;
  color: #FFFFFF;
  font-size: 28px;
}

.choose {
  width: 100%;
  padding-left: 31px;
  display: flex;
  line-height: 40px;
  margin-top: 10px;
}

.choose span {
  display: inline-block;
  width: 80px;
  font-weight: 400;
  font-style: normal;
  color: #FFFFFF;
  font-size: 14px;
}

/*装备*/
.equipmentBox {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.equipmentItem {
  position: relative;
  display: inline-block;
  float: left;
  width: 100%;
  background: rgba(0, 6, 17, 0.4);
}

.eHead {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 31px;
  color: #fff;
  font-size: 30px;
  background: rgba(0, 155, 196, 0.43921568627451);
}

.echartTitle {
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  padding: 0 31px;
  color: #fff;
  margin-top: 20px;
  font-size: 28px;
  margin-bottom: 20px;
}

.echartTitle .tabItem {
  float: right;
  padding: 10px 15px;
  margin-right: 5px;
  text-align: center;
  cursor: pointer;
  color: #FFF;
  font-size: 32px;
  display: inline-block;
  background-color: #08516A;
}

.toggleCate {
  width: 100%;
  padding-left: 31px;
  margin-top: 20px;
}

.toggleCate .itemToggle {
  display: inline-block;
  margin-right: 5px;
  text-align: center;
  color: #fff;
  padding: 5px;
  font-size: 22px;
  background: #345791;
}

.toggleCate .itemToggle.active {
  background: #3B78EE;
}

.tableBox {
  width: 100%;
  padding: 0 20px;
}

table {
  width: 100%;
  color: #fff;
  font-weight: 400;
  font-style: normal;
  font-size: 28px;
  color: #FFFFFF;
  background: rgba(10, 47, 87, .4);
  border: 1px solid rgba(10, 71, 135, .4);
  border-left: none;
  border-bottom: none;
}

table tr:first-child {
  background: rgba(10, 71, 135, .4);
  height: 38px;
}

table td {
  padding: 10px;
  border: 2px solid rgba(10, 71, 135, .6);
  border-right: none;
  border-top: none;
}

.one .contentBox {
  height: 100%;
  padding: 0px 0px 20px 0;
}

.two .contentBox {
  padding: 0 20px 20px 20px;
}

.four .contentBox {
  width: 100%;
  padding: 0px 20px 0px 20px;
  height: 100%;
}

.four .leftMian {
  width: 90%;
  margin: 0 auto;
}

.contentBox {
  height: 100%;
  /*width: 1700px;*/
  margin: 0 auto;
}

.contentBox .tabs .container {
  position: relative;
}
.three {
  height: 100%;
}
.three .contentBox {
  width: 100%;
  padding: 0px 0 20px 0;
}



.three .leftMian {
  width: 100%;
}

.three .searchHead {
  margin-top: 0;
}

.centerRegion {
  width: 100%;
  padding: 20px 20px;
  color: #fff;
}

.centerRegion p {
  font-size: 24px;
  color: #FFFFFF;
}

.centerRegion span {
  font-size: 20px;
  display: block;
  line-height: 40px;
  text-indent: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.gif {
  display: block;
  margin: 0 auto;
  width: 497px;
  height: 312px;
}

/*太空威胁右侧*/
.garbage {
  width: 100%;
  margin: 0 auto;
}

.garbage .centerRegion {
  display: flex;
}

.garbage .centerRegion .left {
  flex: 1;
}

.garbage .centerRegion .itemBox {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-between;
  overflow: hidden;
}
.garbage .centerRegion .itemBoxx {
  display: flex;
  width: 100%;
}
.garbage .centerRegion .left .leftItem {
  display: inline-block;
  padding: 25px 10px;
  margin: 10px;
  text-align: center;
  /*height: 220px;*/
  background: inherit;
  padding: 20px;
  background-color: rgba(0, 103, 202, 0.298039215686275);
  flex: 1;
}

.garbage .centerRegion .left .leftItem img {
  width: 100%;
  height: 100%;
}

.garbage .centerRegion .left .leftItem:nth-child(2), .garbage .centerRegion .left .leftItem:nth-child(4), .garbage .centerRegion .left .leftItem:nth-child(5), .garbage .centerRegion .left .leftItem:nth-child(7) {
  background: none;
}

.leftItem p {
  margin: 0;
  font-weight: 650;
  font-style: normal;
  font-size: 40px;
}

.garbage .centerRegion .right {
  width: 315px;
}

.garbage .centerRegion .right img {
  width: 100%;
  margin-top: 20px;
  height: 220px;
}

.five {
  height: 100%;
}

/deep/ .noneBtn {
  opacity: 0;
}

/deep/ .el-pagination span {
  color: #fff !important;
}

.el-pagination__jump {
  color: #fff;
}
.six {
  background:#1B2631;
}
.six .tabs {
  padding: 0;
  height: calc(100vh - 60px);
}
.fullpage {
  padding: 0 10px;
}
.fullpage,/deep/.btn-prev,/deep/.btn-next,/deep/.el-pager li {
  background: rgb(16,25,36) !important;
}
.el-pagination {
  color:#fff
}
/deep/.el-pager .number.active {
  color:#409EFF
}
/deep/.el-pagination .btn-next, /deep/.el-pagination .btn-prev  {
  color:#fff
}
/deep/.viewer-zoom-in {
  display: none !important;
}
img {
  margin-right: 5px;
}
</style>