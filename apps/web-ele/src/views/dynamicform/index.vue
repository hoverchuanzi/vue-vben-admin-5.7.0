<script lang="ts" setup>
import type { FormData } from './api';

import { ref } from 'vue';

import { ElButton, ElCard, ElMessage } from 'element-plus';

import formListData from './api';
import FormItemRender from './components/formItemRender.vue';

defineOptions({ name: 'DynamicForm' });

type DynamicFormExpose = {
  resetFields: () => void;
  validate: () => Promise<FormData>;
};

const formRef = ref<DynamicFormExpose>();
const submittedData = ref('');
const dynamicFormData = ref<FormData>({
  name: '黄云飞',
  gender: '男',
  address: '中国',
});

async function submitForm() {
  try {
    const data = await formRef.value?.validate();
    submittedData.value = JSON.stringify(data, null, 2);
    ElMessage.success('提交成功');
  } catch {
    ElMessage.warning('请检查表单内容');
  }
}

function resetForm() {
  formRef.value?.resetFields();
  submittedData.value = '';
}
</script>

<template>
  <ElCard class="dynamic-form" header="动态表单示例">
    <FormItemRender
      ref="formRef"
      v-model:dynamic-form-data="dynamicFormData"
      :form-item-list="formListData"
    />

    <div class="actions">
      <ElButton type="primary" @click="submitForm">提交</ElButton>
      <ElButton @click="resetForm">重置</ElButton>
    </div>

    <pre v-if="submittedData" class="result">{{ submittedData }}</pre>
  </ElCard>
</template>

<style scoped>
.dynamic-form {
  margin: 16px;
}

.actions {
  padding: 0 24px 16px;
}

.result {
  padding: 16px;
  margin: 0 24px 24px;
  overflow: auto;
  color: var(--el-text-color-primary);
  background: var(--el-fill-color-light);
  border-radius: 6px;
}
</style>
