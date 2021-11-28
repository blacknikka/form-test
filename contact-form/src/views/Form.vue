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
import axios from "axios";

interface IContactResponse {
  name: string;
  email: string;
  details: string;
  files: string[];
  event: string;
}

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
      const fd = new FormData();
      fd.append("name", nameValue.value);
      fd.append("email", emailValue.value);
      fd.append("details", details.value);

      Array.from(files).forEach((f) => {
        // append each file
        fd.append("files", f, f.name);
      });

      axios
        .post<IContactResponse>("http://localhost:3000/dev/contact", fd, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result.data);
        });
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
