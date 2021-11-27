<template>
  <div>
    <div>
      <label for="name">氏名</label>
      <input
        id="name"
        v-model="nameValue"
        type="text"
        @input="nameHandleChange"
      />
      <span>{{ nameErrorMessage }}</span>
    </div>

    <div>
      <label for="email">メールアドレス</label>
      <input
        id="email"
        type="email"
        v-model="email"
        @input="emailHandleChange"
      />
      <span>{{ emailErrorMessage }}</span>
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
import { useField } from "vee-validate";
import FileSelector from "@/components/FileSelector.vue";
import * as yup from "yup";

export default defineComponent({
  name: "Forms",
  components: {
    FileSelector,
  },
  setup() {
    const details = ref("");

    let files: File[] = [];

    const {
      errorMessage: nameErrorMessage,
      value: nameValue,
      handleChange: nameHandleChange,
    } = useField<string>("name", yup.string().required());

    const {
      errorMessage: emailErrorMessage,
      value: emailValue,
      handleChange: emailHandleChange,
    } = useField<string>("email", yup.string().required().email());

    const onSubmit = async () => {
      console.log("onSubmit");
      console.log(`${nameValue.value} ${emailValue.value} ${details.value}`);
      console.log(files);

      const fd = new FormData();
      fd.append("name", nameValue.value);
      fd.append("email", emailValue.value);
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
      nameValue,
      nameErrorMessage,
      nameHandleChange,
      emailValue,
      emailErrorMessage,
      emailHandleChange,
      details,
      onSubmit,
      onFileChanged,
    };
  },
});
</script>
