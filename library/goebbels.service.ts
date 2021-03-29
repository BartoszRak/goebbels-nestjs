import { Goebbels } from "@goebbels/core";
import { Inject, Injectable } from "@nestjs/common";
import { GOEBBELS_CLIENT_TOKEN } from "./goebbels.provider";

@Injectable()
export class GoebbelsService {
    constructor(@Inject(GOEBBELS_CLIENT_TOKEN) private readonly goebbels: Goebbels) {}

    redact(...args: Parameters<Goebbels['redact']>) {
        return this.goebbels.redact(...args)
    }

}