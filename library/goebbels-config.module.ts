import { GoebbelsConfig } from '@goebbels/core'
import { DeepPartial } from '@goebbels/core/dist/utils'
import { DynamicModule, Global, Module, Provider } from '@nestjs/common'

export const GOEBBELS_CONFIG_TOKEN = 'GOEBBELS_CONFIG_TOKEN'

@Global()
@Module({})
export class GoebbelsConfigModule {
  static forRoot(config: DeepPartial<GoebbelsConfig>): DynamicModule {
    const goebbelsConfigProvider: Provider<DeepPartial<GoebbelsConfig>> = {
      provide: GOEBBELS_CONFIG_TOKEN,
      useValue: config,
    }
    return {
      module: GoebbelsConfigModule,
      providers: [goebbelsConfigProvider],
      exports: [GOEBBELS_CONFIG_TOKEN],
    }
  }
}
