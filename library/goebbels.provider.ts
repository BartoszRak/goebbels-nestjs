import { Goebbels, GoebbelsConfig } from "@goebbels/core";
import { DeepPartial } from "@goebbels/core/dist/utils";
import { Provider } from "@nestjs/common";
import { GOEBBELS_CONFIG_TOKEN } from "./goebbels-config.module";


export const GOEBBELS_CLIENT_TOKEN = 'GOEBBELS_CLIENT_TOKEN'

export const GoebbelsProvider: Provider<Goebbels> = {
    provide: GOEBBELS_CLIENT_TOKEN,
    useFactory: ( config: DeepPartial<GoebbelsConfig>) => new Goebbels(config),
    inject: [GOEBBELS_CONFIG_TOKEN],
}