import { Provider } from "@nestjs/common";

export const FAKE_CUSTOM_CONFIG_TOKEN = 'FAKE_CUSTOM_CONFIG_TOKEN';

export interface FakeCustomConfig {
  depthOfRedacting: number,
  textDetectors: RegExp[]
}

export const createFakeCustomConfigProvider = (
  config: FakeCustomConfig,
): Provider<FakeCustomConfig> => ({
  provide: FAKE_CUSTOM_CONFIG_TOKEN,
  useValue: config,
});