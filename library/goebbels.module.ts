import { GoebbelsConfig } from '@goebbels/core'
import { DeepPartial } from '@goebbels/core/dist/utils'
import { DynamicModule, Module } from '@nestjs/common'
import { GoebbelsConfigModule } from './goebbels-config.module'
import { GoebbelsProvider } from './goebbels.provider'

@Module({})
export class GoebbelsModule {
  static forRoot(config: DeepPartial<GoebbelsConfig>): DynamicModule {
    return {
      module: GoebbelsModule,
      imports: [GoebbelsConfigModule.forRoot(config)],
    }
  }

  static forFeature(): DynamicModule {
      return {
          module: GoebbelsModule,
          providers: [GoebbelsProvider],
          exports: [GoebbelsProvider]
      }
  }
}
