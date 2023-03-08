/**
 * To be able to run `ts-node` from the `scripts` block in `package.json`
 *     For example:
 *         "scripts": {
 *             "cicd": "ts-node cicd/deploy.ts"
 *         }
 * We need to change `tsconfig.json` file and add the `ts-node` section to transform modules to commonjs
 * https://typestrong.org/ts-node/docs/configuration/
 */
import { Chance } from 'chance';

const chance = new Chance();

console.log('Sample script for CI/CD', chance.guid());
