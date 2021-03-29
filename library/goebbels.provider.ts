import { Goebbels, GoebbelsConfig } from "@goebbels/core";
import { DeepPartial } from "@goebbels/core/dist/utils";
import { Provider } from "@nestjs/common";
import { GOEBBELS_CONFIG_TOKEN } from "./goebbels-config.module";
import { GoebbelsModule } from "./goebbels.module";


export const GoebbelsProvider: Provider<GoebbelsModule> = {
    provide: Goebbels,
    useFactory: (config: DeepPartial<GoebbelsConfig>) => new Goebbels(config),
    inject: [GOEBBELS_CONFIG_TOKEN]
}