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
        v-model="emailValue"
        @input="emailHandleChange"
      />
      <span>{{ emailErrorMessage }}</span>
    </div>
    <div>
      <label for="details">問い合わせ内容</label>
      <textarea id="details" v-model="details" />
    </div>
    <file-selector @onFileChanged="onFileChanged" />
    <input
      type="submit"
      @click="onSubmit"
      :disabled="!formIsValid"
      value="送信"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
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
      meta: nameMeta,
    } = useField<string>("name", yup.string().required());

    const {
      errorMessage: emailErrorMessage,
      value: emailValue,
      handleChange: emailHandleChange,
      meta: emailMeta,
    } = useField<string>("email", yup.string().required().email());

    const formIsValid = computed(() => {
      return (
        nameMeta.dirty && nameMeta.valid && emailMeta.dirty && emailMeta.valid
      );
    });

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
      formIsValid,
      nameValue,
      nameErrorMessage,
      nameHandleChange,
      nameMeta,
      emailValue,
      emailErrorMessage,
      emailHandleChange,
      emailMeta,
      details,
      onSubmit,
      onFileChanged,
    };
  },
});
</script>
