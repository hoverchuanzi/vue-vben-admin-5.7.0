<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

import type {
  CreateUserParams,
  RoleOption,
  SystemUser,
} from '#/api/system/user';

import { computed, onMounted, ref } from 'vue';

import dayjs from 'dayjs';
import {
  ElButton,
  ElCard,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import {
  createUserApi,
  getRoleOptionsApi,
  getUserPageApi,
  updateUserApi,
  updateUserStatusApi,
} from '#/api/system/user';

defineOptions({
  name: 'SystemUser',
});

const loading = ref(false);
const users = ref<SystemUser[]>([]);
const keyword = ref('');

const page = ref(1);
const pageSize = ref(10);
const total = ref(0);

const createDialogVisible = ref(false);
const editingUserId = ref<null | string>(null);

const isEditing = computed(() => editingUserId.value !== null);
const roleLoading = ref(false);
const roleOptions = ref<RoleOption[]>([]);

const createForm = ref<CreateUserParams>({
  username: '',
  password: '',
  realName: '',
  email: '',
  roleCodes: [],
});

const createFormRef = ref<FormInstance>();
const creating = ref(false);

const createRules = computed<FormRules<CreateUserParams>>(() => ({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  realName: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
  ],
  email: [
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: 'blur',
    },
  ],
  password: isEditing.value
    ? []
    : [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          min: 8,
          message: '密码不能少于 8 个字符',
          trigger: 'blur',
        },
      ],
  roleCodes: [
    {
      type: 'array',
      required: true,
      min: 1,
      message: '请至少选择一个角色',
      trigger: 'change',
    },
  ],
}));

const statusUpdatingUserId = ref<null | string>(null);

function formatDateTime(value: null | string) {
  if (!value) {
    return '-';
  }

  return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
}

async function loadUsers() {
  loading.value = true;

  try {
    const result = await getUserPageApi({
      page: page.value,
      pageSize: pageSize.value,
      keyword: keyword.value.trim(),
    });

    users.value = result.items;
    total.value = result.total;
    page.value = result.page;
    pageSize.value = result.pageSize;
  } catch {
    users.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
}

function resetCreateForm() {
  createForm.value = {
    username: '',
    password: '',
    realName: '',
    email: '',
    roleCodes: [],
  };
}

async function openCreateDialog() {
  editingUserId.value = null;
  resetCreateForm();
  createDialogVisible.value = true;

  await ensureRoleOptions();
}

async function openEditDialog(user: SystemUser) {
  editingUserId.value = user.id;

  createForm.value = {
    username: user.username,
    password: '',
    realName: user.realName,
    email: user.email ?? '',
    roleCodes: [...user.roles],
  };

  createDialogVisible.value = true;

  await ensureRoleOptions();
}

async function ensureRoleOptions() {
  if (roleOptions.value.length > 0) {
    return;
  }

  roleLoading.value = true;

  try {
    roleOptions.value = await getRoleOptionsApi();
  } finally {
    roleLoading.value = false;
  }
}

async function handleSaveUser() {
  const valid = await createFormRef.value
    ?.validate()
    .then(() => true)
    .catch(() => false);

  if (!valid) {
    return;
  }

  creating.value = true;

  try {
    if (editingUserId.value) {
      await updateUserApi(editingUserId.value, {
        realName: createForm.value.realName.trim(),
        email: createForm.value.email?.trim() || undefined,
        roleCodes: createForm.value.roleCodes,
      });

      ElMessage.success('用户修改成功');
    } else {
      await createUserApi({
        ...createForm.value,
        username: createForm.value.username.trim(),
        realName: createForm.value.realName.trim(),
        email: createForm.value.email?.trim() || undefined,
      });

      ElMessage.success('用户创建成功');
      page.value = 1;
    }

    createDialogVisible.value = false;
    await loadUsers();
  } finally {
    creating.value = false;
  }
}

async function handleToggleUserStatus(user: SystemUser) {
  const nextIsActive = !user.isActive;
  const actionText = nextIsActive ? '启用' : '禁用';

  try {
    await ElMessageBox.confirm(
      `确定要${actionText}用户“${user.username}”吗？`,
      `${actionText}用户`,
      {
        type: 'warning',
        confirmButtonText: `确定${actionText}`,
        cancelButtonText: '取消',
      },
    );
  } catch {
    return;
  }

  statusUpdatingUserId.value = user.id;

  try {
    await updateUserStatusApi(user.id, nextIsActive);

    ElMessage.success(`用户已${actionText}`);
    await loadUsers();
  } finally {
    statusUpdatingUserId.value = null;
  }
}

function handleSearch() {
  page.value = 1;
  void loadUsers();
}

function handlePageChange() {
  void loadUsers();
}

function handlePageSizeChange() {
  page.value = 1;
  void loadUsers();
}

onMounted(() => {
  void loadUsers();
});
</script>

<template>
  <div class="p-5">
    <ElCard shadow="never">
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold">用户管理</h2>
            <p class="mt-1 text-sm text-gray-500">管理系统中的用户账号</p>
          </div>
          <div class="flex gap-2">
            <ElButton type="primary" @click="openCreateDialog">
              新增用户
            </ElButton>

            <ElButton :loading="loading" @click="loadUsers"> 刷新 </ElButton>
          </div>
        </div>
      </template>
      <div class="mb-4 flex items-center gap-3">
        <ElInput
          v-model="keyword"
          clearable
          placeholder="搜索用户名、姓名或邮箱"
          style="width: 320px"
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        />
        <ElButton type="primary" :loading="loading" @click="handleSearch">
          搜索
        </ElButton>
        <span class="ml-auto text-sm text-gray-500">
          共 {{ total }} 个用户
        </span>
      </div>
      <ElTable
        v-loading="loading"
        :data="users"
        border
        stripe
        empty-text="暂无用户数据"
      >
        <ElTableColumn prop="id" label="ID" width="80" />
        <ElTableColumn prop="username" label="用户名" min-width="120" />
        <ElTableColumn prop="realName" label="姓名" min-width="120" />
        <ElTableColumn prop="email" label="邮箱" min-width="180">
          <template #default="{ row }">
            {{ row.email || '-' }}
          </template>
        </ElTableColumn>

        <ElTableColumn label="角色" min-width="160">
          <template #default="{ row }">
            <ElTag
              v-for="role in row.roles"
              :key="role"
              class="mr-1"
              type="primary"
            >
              {{ role }}
            </ElTag>

            <span v-if="row.roles.length === 0">-</span>
          </template>
        </ElTableColumn>

        <ElTableColumn label="状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.isActive ? 'success' : 'danger'">
              {{ row.isActive ? '启用' : '禁用' }}
            </ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="lastLoginAt" label="最后登录时间" min-width="200">
          <template #default="{ row }">
            {{ formatDateTime(row.lastLoginAt) }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" @click="openEditDialog(row)">
              编辑
            </ElButton>

            <ElButton
              link
              :type="row.isActive ? 'danger' : 'success'"
              :loading="statusUpdatingUserId === row.id"
              @click="handleToggleUserStatus(row)"
            >
              {{ row.isActive ? '禁用' : '启用' }}
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <div class="mt-4 flex justify-end">
        <ElPagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :page-sizes="[2, 10, 20, 50]"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handlePageSizeChange"
        />
      </div>
    </ElCard>
    <ElDialog
      v-model="createDialogVisible"
      :title="isEditing ? '编辑用户' : '新增用户'"
      width="520px"
      destroy-on-close
    >
      <ElForm
        ref="createFormRef"
        :model="createForm"
        :rules="createRules"
        label-width="90px"
      >
        <ElFormItem label="用户名" prop="username">
          <ElInput
            v-model="createForm.username"
            :disabled="isEditing"
            maxlength="50"
            placeholder="请输入用户名"
          />
        </ElFormItem>

        <ElFormItem label="姓名" prop="realName">
          <ElInput
            v-model="createForm.realName"
            maxlength="100"
            placeholder="请输入姓名"
          />
        </ElFormItem>

        <ElFormItem label="邮箱" prop="email">
          <ElInput
            v-model="createForm.email"
            maxlength="255"
            placeholder="选填"
          />
        </ElFormItem>

        <ElFormItem v-if="!isEditing" label="密码" prop="password">
          <ElInput
            v-model="createForm.password"
            type="password"
            show-password
            placeholder="至少 8 个字符"
          />
        </ElFormItem>

        <ElFormItem label="角色" prop="roleCodes">
          <ElSelect
            v-model="createForm.roleCodes"
            :loading="roleLoading"
            multiple
            placeholder="请选择角色"
            class="w-full"
          >
            <ElOption
              v-for="role in roleOptions"
              :key="role.code"
              :label="role.name"
              :value="role.code"
            />
          </ElSelect>
        </ElFormItem>
      </ElForm>

      <template #footer>
        <ElButton @click="createDialogVisible = false"> 取消 </ElButton>

        <ElButton type="primary" :loading="creating" @click="handleSaveUser">
          {{ isEditing ? '保存' : '创建' }}
        </ElButton>
      </template>
    </ElDialog>
  </div>
</template>
