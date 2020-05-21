<template>
  <div class="imgContent">
    <div class="imagePreview">
      <v-img
        v-if="!uploadedImage && isCreate"
        class="white--text align-end"
        height="200px"
        :src="image"
      />
      <v-img
        v-if="!uploadedImage && !isCreate"
        class="white--text align-end"
        height="200px"
        :src="image"
        :key="index"
      />
      <v-img v-if="uploadedImage" class="white--text align-end" :src="uploadedImage" />
      <v-file-input
        v-model="uploadedImageFile"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        placeholder="Pick an image"
        prepend-icon="mdi-camera"
        label="Profile Picture"
        @change="onFileChange"
      ></v-file-input>
    </div>
  </div>
</template>

<script>
import API_URL from "@/common/config";
import { FETCH_USER_PHOTO } from "../../store/actions.type";
import { mapGetters } from "vuex";

export default {
  props: {
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    image: require("@/assets/image/no_image.png"),
    API_URL: API_URL,
    uploadedImageFile: null,
    uploadedImage: "",
    index: 0,
    rules: [
      value =>
        !value ||
        value.size < 50000000 ||
        "Image should be less than 50 MB, sorry"
    ]
  }),
  mounted() {
    this.getImage();
  },
  watch: {
    uploadedImageFile: function(val) {
      if (!val) {
        this.uploadedImage = "";
      }
    },
    isCreate: function(val) {
      if (val) {
        this.index++;
        this.getImage();
      }
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    onFileChange(file) {
      if (!file || file.name.lastIndexOf(".") <= 0) {
        this.uploadImage = "";
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.addEventListener("load", () => {
        this.uploadedImage = fr.result;
        this.$emit("uploadImage", file);
      });
    },
    resetUploadedImage() {
      this.uploadedImageFile = null;
    },
    getImage() {
      if (!this.user.userId) return;
      this.$store
        .dispatch(FETCH_USER_PHOTO, this.user.userId)
        .then(() => {
          this.image = this.API_URL + "users/" + this.user.userId + "/photo";
        })
        .catch(() => {
          this.image = null;
        });
    }
  }
};
</script>

<style scoped>
.imgContent {
  width: 90%;
  max-width: 300px;
  margin: auto;
  margin-bottom: 40px;
}
.imagePreview {
  height: 30vh;
  background: rgb(240, 240, 240);
  overflow: hidden;
  border-radius: 10px;
  background-position: center center;
  background-size: cover;
  margin-bottom: 30px;
  position: relative;
}
.fileUpload {
  text-align: center;
  position: absolute;
  height: 25px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  color: rgb(134, 134, 134);
  padding: 20px;
}
</style>
