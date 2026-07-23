<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';

import type { Component } from 'vue';

import type { DynamicFormItem, FormData } from '../api';

import { computed, reactive, ref, watch } from 'vue';

import {
  ElCheckbox,
  ElCol,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElRate,
  ElRow,
} from 'element-plus';

defineOptions({ name: 'FormItemRender' });

const props = withDefaults(
  defineProps<{
    dynamicFormData?: FormData;
    formItemList?: DynamicFormItem[];
  }>(),
  {
    dynamicFormData: () => ({}),
    formItemList: () => [],
  },
);

const emit = defineEmits<{
  'update:dynamicFormData': [value: FormData];
}>();

const formRef = ref<FormInstance>();
const localFormData = reactive<FormData>({});

const componentMappings: Record<DynamicFormItem['type'], Component> = {
  checkbox: ElCheckbox,
  date: ElDatePicker,
  input: ElInput,
  number: ElInputNumber,
  rate: ElRate,
};

const rules = computed<FormRules>(() => {
  return Object.fromEntries(
    props.formItemList
      .filter((item) => item.rules?.length)
      .map((item) => [item.field, item.rules]),
  );
});

function createFormData() {
  return Object.fromEntries(
    props.formItemList.map((item) => [
      item.field,
      props.dynamicFormData[item.field] ?? item.defaultValue,
    ]),
  );
}

function syncFormData() {
  const nextData = createFormData();

  Object.keys(localFormData).forEach((key) => {
    if (!(key in nextData)) delete localFormData[key];
  });
  Object.assign(localFormData, nextData);
}

function updateField(field: string, value: unknown) {
  localFormData[field] = value;
  emit('update:dynamicFormData', { ...localFormData });
}

async function validate() {
  await formRef.value?.validate();
  return { ...localFormData };
}

function resetFields() {
  Object.assign(
    localFormData,
    Object.fromEntries(
      props.formItemList.map((item) => [item.field, item.defaultValue]),
    ),
  );
  formRef.value?.clearValidate();
  emit('update:dynamicFormData', { ...localFormData });
}

watch(() => [props.formItemList, props.dynamicFormData], syncFormData, {
  deep: true,
  immediate: true,
});

defineExpose({ resetFields, validate });
</script>

<template>
  <div class="form-wrapper">
    <ElForm
      ref="formRef"
      :model="localFormData"
      :rules="rules"
      label-width="100px"
    >
      <ElRow :gutter="20">
        <template v-for="formItem in props.formItemList" :key="formItem.field">
          <ElCol v-if="formItem.visible !== false" :span="formItem.span ?? 24">
            <ElFormItem :label="formItem.label" :prop="formItem.field">
              <component
                :is="componentMappings[formItem.type]"
                :disabled="formItem.disabled"
                :model-value="localFormData[formItem.field]"
                :placeholder="formItem.placeholder"
                v-bind="formItem.componentProps"
                @update:model-value="updateField(formItem.field, $event)"
              />
            </ElFormItem>
          </ElCol>
        </template>
      </ElRow>
    </ElForm>
  </div>
</template>

<style scoped>
.form-wrapper {
  padding: 24px;
}

.form-wrapper :deep(.el-input),
.form-wrapper :deep(.el-input-number),
.form-wrapper :deep(.el-date-editor) {
  width: 100%;
}
</style>
