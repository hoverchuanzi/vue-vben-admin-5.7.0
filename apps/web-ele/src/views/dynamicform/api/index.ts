import type { FormItemRule } from 'element-plus';

export type FormData = Record<string, unknown>;
export type FormItemType = 'checkbox' | 'date' | 'input' | 'number' | 'rate';

export interface DynamicFormItem {
  componentProps?: Record<string, unknown>;
  defaultValue?: unknown;
  disabled?: boolean;
  field: string;
  label: string;
  placeholder?: string;
  rules?: FormItemRule[];
  span?: number;
  type: FormItemType;
  visible?: boolean;
}

const formListData: DynamicFormItem[] = [
  {
    field: 'name',
    label: '姓名',
    type: 'input',
    visible: true,
    disabled: true,
    defaultValue: '黄云飞',
    span: 8,
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  },
  {
    field: 'gender',
    label: '性别',
    type: 'input',
    defaultValue: '男',
    span: 8,
  },
  {
    field: 'address',
    label: '家庭住址',
    type: 'input',
    defaultValue: '四川省资阳市雁江区',
    span: 8,
  },
  {
    field: 'birthDate',
    label: '出生日期',
    type: 'date',
    defaultValue: '2000-01-01',
    span: 8,
    componentProps: { format: 'YYYY-MM-DD', valueFormat: 'YYYY-MM-DD' },
  },
  {
    field: 'joinDate',
    label: '入职时间',
    type: 'date',
    defaultValue: '2020-01-01',
    span: 8,
    componentProps: { format: 'YYYY-MM-DD', valueFormat: 'YYYY-MM-DD' },
  },
  {
    field: 'height',
    label: '身高(cm)',
    type: 'number',
    defaultValue: 180,
    span: 8,
    componentProps: { min: 0 },
  },
  {
    field: 'education',
    label: '学历',
    type: 'input',
    defaultValue: '本科',
    span: 8,
  },
  {
    field: 'rate',
    label: '评级',
    type: 'rate',
    defaultValue: 5,
    span: 8,
  },
  {
    field: 'salary',
    label: '员工工资',
    type: 'number',
    defaultValue: 15_000,
    span: 8,
    componentProps: { min: 0 },
  },
  {
    field: 'salaryExtra',
    label: '员工绩效',
    type: 'number',
    defaultValue: 5000,
    span: 8,
    componentProps: { min: 0 },
  },
  {
    field: 'phone',
    label: '手机号码',
    type: 'input',
    defaultValue: '13800000000',
    span: 8,
    rules: [
      { required: true, message: '请输入手机号码', trigger: 'blur' },
      { pattern: /^1\d{10}$/, message: '手机号码格式不正确', trigger: 'blur' },
    ],
  },
];

export default formListData;
