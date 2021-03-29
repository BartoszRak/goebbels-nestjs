import { DynamicModule, Module } from '@nestjs/common'
import {
  createFakeCustomConfigProvider,
  FakeCustomConfig,
  FAKE_CUSTOM_CONFIG_TOKEN,
} from './fake-custom-config.provider'

@Module({})
export class FakeCustomConfigModule {
  static forRoot(config: FakeCustomConfig): DynamicModule {
    const fakeConfigProvider = createFakeCustomConfigProvider(config)
    return {
      module: FakeCustomConfigModule,
      providers: [fakeConfigProvider],
      exports: [FAKE_CUSTOM_CONFIG_TOKEN],
    }
  }
}
