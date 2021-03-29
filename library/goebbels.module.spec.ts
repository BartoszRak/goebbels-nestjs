import { INestApplication, ModuleMetadata } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { GOEBBELS_CONFIG_TOKEN } from './goebbels-config.module'
import { GoebbelsModule } from './goebbels.module'
import { FakeCustomConfigModule } from './__fakes__/fake-custom-config.module'
import {
  FakeCustomConfig,
  FAKE_CUSTOM_CONFIG_TOKEN,
} from './__fakes__/fake-custom-config.provider'
import { FakeThatUsesGoebbelsService } from './__fakes__/fake-that-uses-goebbels.service'
import { FakeWithGoebbelsForFeature } from './__fakes__/fake-with-goebbels-for-feature.module'

let app: INestApplication

describe('when root module is initialized', () => {
  const mockedFakeCustomConfig: FakeCustomConfig = {
    depthOfRedacting: 13,
    textDetectors: [new RegExp('[0-9]{3}[a-z]{3}')],
  }

  describe.each<[string, ModuleMetadata]>([
    [
      'when using forRoot() and attempting to use module that uses goebbels module at the top level',
      {
        imports: [
          GoebbelsModule.forRoot({
            depth: 10,
            detection: {
              text: [new RegExp('.{10}', 'gmi')],
            },
          }),
          GoebbelsModule.forFeature(),
        ],
        providers: [FakeThatUsesGoebbelsService],
      },
    ],
    [
      'when using forRoot() and attempting to use module that uses goebbels module at the low level',
      {
        imports: [
          GoebbelsModule.forRoot({
            depth: 10,
            detection: {
              text: [new RegExp('.{10}', 'gmi')],
            },
          }),
          FakeWithGoebbelsForFeature,
        ],
      },
    ],
    [
      'when using forRootAsync() and module that uses goebbels module at the low level',
      {
        imports: [
          GoebbelsModule.forRootAsync({
            imports: [FakeCustomConfigModule.forRoot(mockedFakeCustomConfig)],
            useFactory: ({
              depthOfRedacting,
              textDetectors,
            }: FakeCustomConfig) => ({
              depth: depthOfRedacting,
              detection: {
                text: textDetectors,
              },
            }),
            inject: [FAKE_CUSTOM_CONFIG_TOKEN],
          }),
          FakeWithGoebbelsForFeature,
        ],
      },
    ],
    [
      'when using forRootAsync() and module that uses goebbels module at the top level',
      {
        imports: [
          GoebbelsModule.forRootAsync({
            imports: [FakeCustomConfigModule.forRoot(mockedFakeCustomConfig)],
            useFactory: ({
              depthOfRedacting,
              textDetectors,
            }: FakeCustomConfig) => ({
              depth: depthOfRedacting,
              detection: {
                text: textDetectors,
              },
            }),
            inject: [FAKE_CUSTOM_CONFIG_TOKEN],
          }),
          GoebbelsModule.forFeature(),
        ],
        providers: [FakeThatUsesGoebbelsService],
      },
    ],
  ])('%p', (_, moduleMetadata) => {
    let fakeService: FakeThatUsesGoebbelsService
    beforeEach(async () => {
      const mockedModule = await Test.createTestingModule(
        moduleMetadata,
      ).compile()
      app = await mockedModule.createNestApplication().init()
      fakeService = app.get(FakeThatUsesGoebbelsService)
    })

    it('gives access to goebbels configuration', () => {
      expect(app.get(GOEBBELS_CONFIG_TOKEN)).toMatchSnapshot()
    })

    describe('when calling a service in module that uses goebbels module', () => {
      it('returns a redacted data', () => {
        expect(
          fakeService.redactTexts('James', '123abc', '1hjkl'),
        ).toMatchSnapshot()
      })
    })
  })
})

describe('when root module is not initialized', () => {
  describe('when module is initialized with forFeature()', () => {
    it('throws a compilation error', async () => {
      await expect(
        Test.createTestingModule({
          imports: [GoebbelsModule.forFeature()],
        }).compile(),
      ).rejects.toMatchInlineSnapshot(`
              [Error: Nest can't resolve dependencies of the GOEBBELS_CLIENT_TOKEN (?). Please make sure that the argument GOEBBELS_CONFIG_TOKEN at index [0] is available in the GoebbelsModule context.

              Potential solutions:
              - If GOEBBELS_CONFIG_TOKEN is a provider, is it part of the current GoebbelsModule?
              - If GOEBBELS_CONFIG_TOKEN is exported from a separate @Module, is that module imported within GoebbelsModule?
                @Module({
                  imports: [ /* the Module containing GOEBBELS_CONFIG_TOKEN */ ]
                })
              ]
            `)
    })
  })
})
