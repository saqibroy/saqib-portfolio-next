import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: ['.next/**', 'node_modules/**', 'playwright-report/**', 'test-results/**'],
    rules: {
      // The legacy client layout is replaced in Phase 4; retain these checks as
      // disabled until that component is split into small client islands.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
    },
  },
];
