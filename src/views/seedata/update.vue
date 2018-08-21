<template>
	<el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
     <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="文本" prop="text">
        <el-input v-model="dataForm.text" placeholder="文本"></el-input>
      </el-form-item>
      <el-form-item label="正文" prop="content">
        <el-input v-model="dataForm.content" placeholder="正文"></el-input>
      </el-form-item>
       <el-form-item label="爬取时间" prop="spiderTime">
        <el-input v-model="dataForm.spiderTime" placeholder="爬取时间"></el-input>
      </el-form-item>
      <el-form-item label="爬取地址" prop="spiderUrl">
        <el-input v-model="dataForm.spiderUrl" placeholder="爬取地址"></el-input>
      </el-form-item>
      <el-form-item label="源域编码" prop="siteId">
        <el-input v-model="dataForm.siteId" placeholder="来源域名编码"></el-input>
      </el-form-item>
      
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
	import API from '@/api'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          title: '',
          text: '',
          content: '',
          spiderTime: '',
          spiderUrl: '',
          siteId: '',
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
          if (this.dataForm.id) {
            this.visible = true
            API.seedata.info(this.dataForm.id).then(({data}) => {
              if (data && data.ret === 0) {
                this.dataForm.title = data.pageInfoEntity.title
                this.dataForm.text = data.pageInfoEntity.text
                this.dataForm.content = data.pageInfoEntity.content
                this.dataForm.spiderTime = data.pageInfoEntity.spiderTime
                this.dataForm.spiderUrl = data.pageInfoEntity.spiderUrl
                this.dataForm.siteId = data.pageInfoEntity.siteId
              }
            })
          }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var params = {
              'pageId': this.dataForm.id,
              'title': this.dataForm.title,
              'text': this.dataForm.text,
              'content': this.dataForm.content,
              'spiderTime': this.dataForm.spiderTime,
              'spiderUrl': this.dataForm.spiderUrl,
              'siteId': this.dataForm.siteId
            }
            var tick =  API.seedata.update(params)
            tick.then(({data}) => {
              if (data && data.ret === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>