import FileUpload from '@/components/UI/FileUpload';

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
const GlobalComponents = {
  install(Vue) {
    Vue.component('file-upload', FileUpload);
  }
};

export default GlobalComponents;
