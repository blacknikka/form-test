<template>
  <div>
    <div>ファイルアップロード</div>
    <div>
      <label for="filename">ファイル名</label>
    </div>
    <input type="file" @change="onFileSelected" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["onFileChanged"],
  setup(props, { emit }) {
    let filename = ref("");

    const onFileSelected = (e: Event) => {
      const target = e.target as HTMLInputElement;

      if (target.files) {
        const file = target.files[0];
        console.log(file);
        filename.value = file.name;
        emit("onFileChanged", target.value);
      }
    };

    return {
      onFileSelected,
      filename,
    };
  },
});
</script>
