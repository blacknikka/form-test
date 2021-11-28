<template>
  <div>
    <form @submit.prevent="onSubmit">
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
      <input type="submit" :disabled="!formIsValid" value="送信" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject } from "vue";
import { useField } from "vee-validate";
import FileSelector from "@/components/FileSelector.vue";
import * as yup from "yup";
import { contactKey } from "@/store/contact/contact";
import { ContactPost, ContactStore } from "@/store/contact/types";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Forms",
  components: {
    FileSelector,
  },
  setup() {
    const contactStore = inject<ContactStore>(contactKey);
    if (!contactStore) {
      throw new Error("contact key is not provided");
    }

    const router = useRouter();

    const details = ref("");

    let files: File[] = [];

    const {
      errorMessage: nameErrorMessage,
      value: nameValue,
      handleChange: nameHandleChange,
      meta: nameMeta,
    } = useField<string>("name", yup.string().required("お名前は必須です"));

    const {
      errorMessage: emailErrorMessage,
      value: emailValue,
      handleChange: emailHandleChange,
      meta: emailMeta,
    } = useField<string>(
      "email",
      yup
        .string()
        .required("emailは必須です")
        .email("正しいEmailアドレスを入力してください")
    );

    const formIsValid = computed(() => {
      return (
        nameMeta.dirty && nameMeta.valid && emailMeta.dirty && emailMeta.valid
      );
    });

    const onSubmit = async () => {
      const contact: ContactPost = {
        name: nameValue.value,
        email: emailValue.value,
        details: details.value,
        files: files,
      };
      const result = await contactStore.postContact(contact);
      console.log(result);

      router.push({
        name: "Confirm",
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
