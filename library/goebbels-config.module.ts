import { GoebbelsConfig } from '@goebbels/core'
import { DeepPartial } from '@goebbels/core/dist/utils'
import {
  DynamicModule,
  FactoryProvider,
  Global,
  Module,
  ModuleMetadata,
  Provider,
} from '@nestjs/common'

export type GoebbelsConfigModuleOptionsAsync = Omit<
  FactoryProvider<DeepPartial<GoebbelsConfig>>,
  'provide' | 'scope'
> &
  Partial<Pick<ModuleMetadata, 'imports'>>

export const GOEBBELS_CONFIG_TOKEN = 'GOEBBELS_CONFIG_TOKEN'
export const USER_CONFIG_TOKEN = 'USER_CONFIG_TOKEN'

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

  static forRootAsync({
    imports,
    ...restOfUserConfig
  }: GoebbelsConfigModuleOptionsAsync): DynamicModule {
    return {
      module: GoebbelsConfigModule,
      imports,
      providers: [
        this.createUserConfigProvider(restOfUserConfig),
        {
          provide: GOEBBELS_CONFIG_TOKEN,
          useExisting: USER_CONFIG_TOKEN, 
        },
      ],
      exports: [GOEBBELS_CONFIG_TOKEN],
    }
  }

  private static createUserConfigProvider({
    inject,
    useFactory,
  }: Omit<GoebbelsConfigModuleOptionsAsync, 'imports'>): FactoryProvider<
    DeepPartial<GoebbelsConfig>
  > {
    return {
      provide: USER_CONFIG_TOKEN,
      useFactory,
      inject,
    }
  }
}
