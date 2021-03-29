import { GoebbelsConfig } from '@goebbels/core'
import { DeepPartial } from '@goebbels/core/dist/utils'
import { DynamicModule, Module } from '@nestjs/common'
import { GoebbelsConfigModule, GoebbelsConfigModuleOptionsAsync } from './goebbels-config.module'
import { GoebbelsProvider } from './goebbels.provider'
import { GoebbelsService } from './goebbels.service'

@Module({})
export class GoebbelsModule {
  static forRoot(config: DeepPartial<GoebbelsConfig> = {}): DynamicModule {
    return {
      module: GoebbelsModule,
      imports: [GoebbelsConfigModule.forRoot(config)],
    }
  }

  static forRootAsync(options: GoebbelsConfigModuleOptionsAsync): DynamicModule {
    return {
      module: GoebbelsModule,
      imports: [GoebbelsConfigModule.forRootAsync(options)]
    }
  }

  static forFeature(): DynamicModule {
      return {
          module: GoebbelsModule,
          providers: [GoebbelsProvider, GoebbelsService],
          exports: [GoebbelsService]
      }
  }
}
