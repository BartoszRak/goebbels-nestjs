import { Module } from '@nestjs/common'
import { GoebbelsModule } from '../goebbels.module'
import { FakeThatUsesGoebbelsService } from './fake-that-uses-goebbels.service'

@Module({
  imports: [GoebbelsModule.forFeature()],
  providers: [FakeThatUsesGoebbelsService],
  exports: [FakeThatUsesGoebbelsService],
})
export class FakeWithGoebbelsForFeature {}
