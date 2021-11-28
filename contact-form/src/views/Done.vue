<template>
  <div>
    <h1>受け付けました</h1>
    <td>
      <tr>
        <span>氏名</span>
        <span>{{ name }}</span>
      </tr>
      <tr>
        <span>e-mail</span>
        <span>{{ email }}}</span>
      </tr>
      <tr>
        <span>お問い合わせ内容</span>
        <span>{{ details }}}</span>
      </tr>
      <tr>
        <span>ファイル</span>
        <span>{{ files }}}</span>
      </tr>
    </td>
    <button type="button" @click="onClick">完了</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Done",
  props: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    files: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const onClick = () => {
      router.push({
        name: "Forms",
      });
    };

    return {
      onClick,
    };
  },
});
</script>
