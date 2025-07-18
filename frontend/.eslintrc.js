module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false, // هذا بيمنع أخطاء Babel
    ecmaFeatures: {
      jsx: true, // ✅ تفعيل دعم JSX
    },
  },
};
