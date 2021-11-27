<template>
  <div>
    <div>
      <label for="name">氏名</label>
      <input id="name" v-model="name" type="text" />
    </div>

    <div>
      <label for="email">メールアドレス</label>
      <input id="email" type="email" v-model="email" />
    </div>
    <div>
      <label for="details">問い合わせ内容</label>
      <textarea id="details" v-model="details" />
    </div>
    <file-selector @onFileChanged="onFileChanged" />
    <input type="submit" @click="onSubmit" value="送信" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FileSelector from "@/components/FileSelector.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Forms",
  components: {
    FileSelector,
  },
  setup() {
    const name = ref("");
    const email = ref("");
    const details = ref("");

    let files: File[] = [];

    const onSubmit = async () => {
      console.log("onSubmit");
      console.log(`${name.value} ${email.value} ${details.value}`);
      console.log(files);

      const fd = new FormData();
      fd.append("name", name.value);
      fd.append("email", email.value);
      fd.append("details", details.value);

      const blob = new Blob([files[0].name], {
        type: "text/plain",
      });
      fd.append("file", blob, files[0].name);

      const response = await fetch("http://localhost:3000/dev/hello", {
        method: "POST",
        body: fd,
      });
      console.log(await response.json());
    };

    const onFileChanged = (f: FileList) => {
      files = Array.from(f);
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
