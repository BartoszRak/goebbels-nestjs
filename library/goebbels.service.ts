import { Goebbels } from "@goebbels/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoebbelsService {
    constructor(private readonly goebbels: Goebbels) {}

    redact(...args: Parameters<Goebbels['redact']>) {
        return this.goebbels.redact(...args)
    }

}