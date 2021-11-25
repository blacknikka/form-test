<template>
  <form @submit.prevent="exec" enctype="multipart/form-data">
    <div>
      <label for="name">氏名</label>
      <input id="name" v-model="name" type="text" />
    </div>

    <div>
      <label for="email">メールアドレス</label>
      <input id="email" v-model="email" />
    </div>
    <div>
      <label for="details">問い合わせ内容</label>
      <textarea id="details" v-model="details" />
    </div>
    <file-uploader @onFileChanged="onFileChanged" />
    <input type="submit" @click="onSubmit" />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FileUploader from "@/components/FileUploader.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Forms",
  components: {
    FileUploader,
  },
  setup() {
    const name = ref("");
    const email = ref("");
    const details = ref("");

    const onSubmit = () => {
      console.log("onSubmit");
    };

    const onFileChanged = (e: Event) => {
      console.log("onFileChanged");
    };

    return {
      name,
      email,
      details,
      onSubmit,
      onFileChanged,
    };
  },
});
</script>
