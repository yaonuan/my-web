<template>
  <div class="mod-see">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.title" placeholder="标题" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%">
      <el-table-column
        prop="pageId"
        header-align="center"
        align="center"
        width="80"
        label="编码">
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="text"
        header-align="center"
        align="center"
        label="文本">
      </el-table-column>
      <el-table-column
        prop="content"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="正文">
      </el-table-column>
      <el-table-column
        prop="spiderTime"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="爬取时间">
      </el-table-column>
      <el-table-column
        prop="spiderUrl"
        header-align="center"
        align="center"
        label="爬取地址">
      </el-table-column>
      <el-table-column
        prop="siteId"
        header-align="center"
        align="center"
        width="150"
        label="来源域名编码">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button  type="text" size="small" @click="UpdateHandle(scope.row.pageId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.pageId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <update v-if="UpdateVisible" ref="Update" @refreshDataList="getDataList"></update>
  </div>
</template>

<script>
  import API from '@/api'
  import Update from './update'
  export default {
    data () {
      return {
        dataForm: {
          title: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        UpdateVisible: false
      }
    },
    components: {
      Update
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        var params = {
          page: this.pageIndex,
          limit: this.pageSize,
          title: this.dataForm.title
        }
        API.seedata.list(params).then(({data}) => {
          console.log(data);
          if (data && data.ret === 0) {
            this.dataList = data.page
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
            this.$message.error(data.msg)
          }
          this.dataListLoading = false

        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      UpdateHandle (id) {
        this.UpdateVisible = true
        this.$nextTick(() => {
          this.$refs.Update.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.pageId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.seedata.del(ids).then(({data}) => {
            if (data && data.ret === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
