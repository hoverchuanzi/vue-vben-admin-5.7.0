import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    accessMode: 'backend',
    name: import.meta.env.VITE_APP_TITLE,
  },
  theme: {
    builtinType: 'green',
    colorPrimary: 'hsl(161 90% 43%)',
    radius: '0.5',
    fontSize: 15,
    mode: 'light',
  },
  transition: {
    name: 'fade',
  },
  copyright: {
    companyName: 'hover_chuanzi',
    companySiteLink: 'https://www.hover_chuanzi.com',
    date: '2026',
    enable: true,
    icp: '',
    icpLink: '',
    settingShow: true,
  },
  logo: {
    enable: true,
    fit: 'contain',
    source: 'http://www.hoverchuanzi.top/logo.webp',
  },
});
