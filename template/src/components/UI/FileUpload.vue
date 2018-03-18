<template>
  <div id="app">
    <div class="container">
      <!--UPLOAD-->
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <label class="btn btn-default btn-sm center-block btn-file custom-file-upload">
                 <div class="d-none">
                    <input type="file" :disabled="isSaving"
                        @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept="image/*">
                </div>
                <i class="fa fa-camera fa-5x fa-fw" aria-hidden="true"></i>
            </label>
         </form>
        <!--SUCCESS-->
        <div v-if="isSuccess">
            <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
            <p>
                <a href="javascript:void(0)" @click="reset()">Upload again</a>
            </p>
            <ul class="list-unstyled">
                <li v-for="item in uploadedFiles" :key="item.FilePath">
                    <p>{{ item.FilePath }}</p>
                </li>
            </ul>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { upload } from "@/file-upload-service";

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

export default {
  name: "app",
  props: ["url"],
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      const self = this;
      this.currentStatus = STATUS_SAVING;
      upload(self.url, formData)
        .then(x => {
          self.uploadedFiles = [].concat(x);
          self.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          self.uploadError = err.response;
          self.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x =>
        formData.append(fieldName, fileList[x], fileList[x].name)
      );
      // save it
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style lang="scss" scoped>
.btn-file {
  position: relative;
  overflow: hidden;
}

.btn-file input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  cursor: inherit;
  display: block;
}

.custom-file-upload {
  border: 2px solid #eaeaea;
  cursor: pointer;

  &:hover {
    border-color: #000;
  }
}
</style>
