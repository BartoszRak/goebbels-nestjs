import { Inject, Injectable } from "@nestjs/common";
import { GoebbelsService } from "../goebbels.service";


@Injectable()
export class FakeThatUsesGoebbelsService {
    constructor(@Inject(GoebbelsService) private readonly goebbels: GoebbelsService) {}

    redactTexts(...texts: string[]) {
        return this.goebbels.redact(texts)
    }
}