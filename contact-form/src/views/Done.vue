<template>
  <div>
    <h1>受け付けました</h1>
    <table>
      <tr>
        <td>氏名</td>
        <td>{{ name }}</td>
      </tr>
      <tr>
        <td>e-mail</td>
        <td>{{ email }}</td>
      </tr>
      <tr>
        <td>お問い合わせ内容</td>
        <td>{{ details }}</td>
      </tr>
      <tr>
        <td>ファイル</td>
        <td>{{ files }}</td>
      </tr>
    </table>
    <button type="button" @click="onClick">完了</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useRouter } from "vue-router";
import { contactKey } from "@/store/contact/contact";
import { ContactStore } from "@/store/contact/types";

export default defineComponent({
  name: "Done",
  setup() {
    const contactStore = inject<ContactStore>(contactKey);
    if (!contactStore) {
      throw new Error("contact key is not provided");
    }

    const router = useRouter();

    const onClick = () => {
      router.push({
        name: "Forms",
      });
    };

    const contact = contactStore.getContact();
    const { name, email, details, files } = contact;

    return {
      onClick,
      name,
      email,
      details,
      files,
    };
  },
});
</script>
