<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="feedback-add">
    <el-form-item label="选择产品" prop="product">
      <el-select v-model="ruleForm.product" placeholder="请选择产品">
        <el-option
          v-for="item in productSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="问题类型" prop="problem">
      <el-select v-model="ruleForm.problem" placeholder="请选择问题类型">
        <el-option
          v-for="item in problemSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="ruleForm.contact" placeholder="请输入电话号码或邮箱"></el-input>
    </el-form-item>
    <el-form-item label="详细描述" prop="desc" class="ui-textarea">
      <el-input
        type="textarea"
        maxlength="400"
        v-model="ruleForm.desc"
        @input="textareaInputs"
        placeholder="问题描述越详细，越有助于帮您解决问题~400字以内"
      ></el-input>
      <span class="maxlength">{{currentWordNumber}}/400</span>
    </el-form-item>
    <el-form-item>
      <el-upload
        ref="upload"
        action="#"
        multiple
        :limit="limit"
        :file-list="ruleForm.imgFileList"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-change="OnChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        accept="image/jpeg, image/png"
        :auto-upload="false"
      >
        <i class="el-icon-plus"></i>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，最多上传5张且单张图片不超过5M</div> -->
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        product: "", // 选择产品
        problem: "", // 问题类型
        contact: "", // 联系方式
        desc: "", // 详情描述
        imgFileList: []//绑定用户上传的图片List
      },
      productSelect: [
        {
          value: 10,
          label: "其他",
        },
        {
          value: 20,
          label: "软件问题",
        },
        {
          value: 30,
          label: "硬件问题",
        },
      ],
      problemSelect: [
        {
          value: 10,
          label: "其他",
        },
        {
          value: 20,
          label: "使用咨询",
        },
        {
          value: 30,
          label: "软件升级",
        },
        {
          value: 40,
          label: "软件体验",
        },
        {
          value: 50,
          label: "设备操作",
        },
        {
          value: 60,
          label: "账号问题",
        },
        {
          value: 70,
          label: "系统设置",
        },
      ],
      currentWordNumber: 0,

      rules: {
        product: [{ required: true, message: "请选择产品", trigger: "change" }],
        problem: [
          { required: true, message: "请选择问题类型", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写问题描述", trigger: "blur" }],
      },
      uploadUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      limit: 9,
      hideUpload: false, //是否显示上传图片的加号
      imgInfoList: [], //包含图片的id,name,size的集合
      imgNameList: [], //后端返回的上传图片的name集合，传到后端
      imgSize: [], //后端返回的上传图片的imgSize集合，传到后端
      deleteImgFileList: [], //存已被删除了的图片的id
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //字数限制
    textareaInputs(e) {
      // 获取输入框的内容
      var value = this.ruleForm.desc;
      // 获取输入框内容的长度
      var len = parseInt(value.length);

      //最多字数限制
      if (len > 400) return;
      // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
      this.currentWordNumber = len; //当前字数
    },
    //点击上传图片
    submitUpload() {
      let formData = new FormData(); //  用FormData存放上传文件
      this.ruleForm.imgFileList.forEach((file) => {
        console.log(file.raw);
        console.log(file.size);
        formData.append("file", file.raw);
      });
      this.$http({
        url: this.uploadUrl,
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(({ data }) => {
        if (data && data.code === 0) {
          for (var i = 0; i < data.imgNameList.length; i++) {
            this.imgNameList.push(data.imgNameList[i].name);
            this.imgSize.push(data.imgNameList[i].size);
          }
          this.ruleFormSubmit();
          this.$refs.upload.clearFiles();
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    //预览图片时
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    OnChange(file, fileList) {
      const isType = file.type === "image/jpeg" || "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        fileList.pop();
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
        fileList.pop();
      }
      this.ruleForm.imgFileList.push(file);
      this.hideUpload = fileList.length >= this.limit;
    },
    //删除图片时
    handleRemove(file, fileList) {
      if (file.id) {
        console.log("删除了已被上传过的图片");
        console.log(file.id);
        this.deleteImgFileList.push(file.id);
      }
      this.ruleForm.imgFileList = fileList;
      this.hideUpload = fileList.length >= this.limit;
    },
    //文件超出个数限制时
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 9 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //获取图片信息
    getImgInfo(id) {
      this.$http({
        url: this.$http.adornUrl("/sys/sysgroup/queryImgByGroupId"),
        method: "get",
        params: this.$http.adornParams({
          id: id,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          if (data.imgInfoList.length === 9) {
            this.hideUpload = true;
          }
          for (var i = 0; i < data.imgInfoList.length; i++) {
            this.ruleForm.imgFileList.push({
              url: window.SITE_CONFIG.imgUrl + data.imgInfoList[i].fileName,
              name: data.imgInfoList[i].fileName,
              size: data.imgInfoList[i].imgSize,
              id: data.imgInfoList[i].id,
            });
          }
        }
      });
    },

    init(id) {
      this.ruleForm.imgFileList = [];
      this.imgNameList = [];
      this.imgSize = [];
      this.deleteImgFileList = [];
      this.ruleForm.id = id || 0;
      this.hideUpload = false;
      this.uploadUrl = this.$http.adornUrl(
        `/sys/sysgroup/upload?token=${this.$cookie.get("token")}`
      );
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
        if (this.ruleForm.id) {
          //回显图片
          this.getImgInfo(id);
          this.$http({
            url: this.$http.adornUrl(`/sys/sysgroup/info/${this.ruleForm.id}`),
            method: "get",
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.ruleForm.groupName = data.sysGroupEntity.groupName;
              this.ruleForm.groupManager = data.sysGroupEntity.groupManager;
              this.ruleForm.telephone = data.sysGroupEntity.telephone;
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./feedback-add.less";
</style>