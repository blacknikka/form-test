<template>
  <div>
    <div>ファイルアップロード</div>
    <div>
      <label for="filename">ファイル名</label>
    </div>
    <input ref="fileupload" type="file" @change="onFileSelected" multiple/>
    <!-- <input type="button" @click="onFileClearClicked" value="クリア" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["onFileChanged"],
  setup(props, { emit }) {
    let filename = ref("");
    // const fileupload = ref<HTMLInputElement>();

    const onFileSelected = (e: Event) => {
      const target = e.target as HTMLInputElement;

      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        // filename.value = Array.from(target.files).map((file: File) => file.name).join(", ");
        emit("onFileChanged", target.files);
      }
    };

    // const onFileClearClicked = () => {
    //   console.log("onFileClearClicked")
    //   if (fileupload.value) {
    //     fileupload.value.files = null;
    //   }
    // };

    return {
      onFileSelected,
      // onFileClearClicked,
      filename,
      // fileupload,
    };
  },
});
</script>
