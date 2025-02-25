import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import generator from '../generator';
import { InitGeneratorSchema } from '../schema';

jest.mock('@nx/devkit', () => {
  const originalModule = jest.requireActual('@nx/devkit');

  return {
    ...originalModule,
    installPackagesTask: jest.fn(() => console.log('Imagine installing packages here...')),
  };
});

const TEST_TIMEOUT = 120000;

describe('Check strict option', () => {
  let appTree: Tree;
  const name = 'HelloWorld';
  const directory = 'apps/hello-world';
  const partialOptions: Omit<InitGeneratorSchema, 'strict'> = { name, directory, silent: true, tags: '' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  }, TEST_TIMEOUT);

  it(
    'Strict option is true',
    async () => {
      await generator(appTree, { ...partialOptions, strict: true });
      const workspaceTsConfig = appTree.read(`${directory}/tsconfig.json`);
      const buildTsConfig = appTree.read(`${directory}/tsconfig.build.json`);

      const workspaceTsConfigObj = JSON.parse(workspaceTsConfig?.toString() || '{}');
      const buildTsConfigObj = JSON.parse(buildTsConfig?.toString() || '{}');

      expect(workspaceTsConfigObj).toHaveProperty('compilerOptions.strict', true);
      expect(buildTsConfigObj).toHaveProperty('compilerOptions.strict', true);
    },
    TEST_TIMEOUT,
  );

  it(
    'Strict option is false',
    async () => {
      await generator(appTree, { ...partialOptions, strict: false });
      const workspaceTsConfig = appTree.read(`${directory}/tsconfig.json`);
      const buildTsConfig = appTree.read(`${directory}/tsconfig.build.json`);

      const workspaceTsConfigObj = JSON.parse(workspaceTsConfig?.toString() || '{}');
      const buildTsConfigObj = JSON.parse(buildTsConfig?.toString() || '{}');

      expect(workspaceTsConfigObj).toHaveProperty('compilerOptions.strict', false);
      expect(buildTsConfigObj).toHaveProperty('compilerOptions.strict', false);
    },
    TEST_TIMEOUT,
  );
});
