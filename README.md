# `@goebbels/nestjs`
![Goebbels version](https://img.shields.io/npm/v/@goebbels/nestjs)
![Goebbels license](https://img.shields.io/npm/l/@goebbels/nestjs)
![Goebbels downloads per month](https://img.shields.io/npm/dt/@goebbels/nestjs)

**`@goebbels/nestjs` repository: https://github.com/BartoszRak/goebbels-nestjs**
**`@goebbels/nestjs` package: https://www.npmjs.com/package/@goebbels/nestjs**

**Raw goebbels (`@goebbels/core`): https://www.npmjs.com/package/@goebbels/core*

## For what?
For providing `@goebbels/core` functionalities through NestJS ecosystem.

## Installation
`yarn add @goebbels/nestjs` or `npm install @goebbels/nestjs`

**Declarations/types are included in this package*

## Usage

### Usage instruction
 1. ### Iniaitlize goebbels root module.
    Without any config:
    ```ts
    import { Module } from '@nestjs/common'
    import { GoebbelsModule } from '@goebbels/nestjs'
    
    @Module({
     imports: [GoebbelsModule.forRoot()]
    })
    export class AppModule {}
    ```
    `OR` with overriding config:
    ```ts
    import { Module } from '@nestjs/common'
    import { GoebbelsModule } from '@goebbels/nestjs'
    
    @Module({
     imports: [GoebbelsModule.forRoot({
         depth: 10,
         detection: {
             text: [new RegExp('[a-Z]{6}', 'gmi')]
         }
     })]
    })
    export class AppModule {}
    ```
    `OR` async 
    ```ts
    import { Module } from '@nestjs/common'
    import { GoebbelsModule } from '@goebbels/nestjs'
    
    @Module({
     imports: [GoebbelsModule.forRootAsync({
         imports: [SomeMyModule],
         useFactory: (service: SomeMyService) => ({
             depth: service.getDepth(),
             detection: {
                 text: service.getTextDetectors()
             }
         })
         inject: [SomeMyService]
     })]
    })
    export class AppModule {}
    ```
2. #### Provider goebbels with feature module
    ```ts
    import { Module } from '@nestjs/common'
    import { GoebbelsModule } from '@goebbels/nestjs'
    
    @Module({
        imports: [GoebbelsModule.forFeature()],
        providers: [UsersService],
        exports: [UsersService]
    })
    export class UsersModule {}
    ```
3. #### Use provided GoebbelsService
    ```ts
    import { Module, Inject, Injectable } from '@nestjs/common'
    import { GoebbelsService } from '@goebbels/nestjs'
    
    @Injectable()
    export class UsersService {
        constructor(@Inject(GoebbelsService) private readonly goebbels: GoebbelsService) {}
        
        redactUserName(firstName: string, lastName: string): string {
            return this.goebbels.redact(`${firstName} ${lastName}`)
        }
    }
    ```
## License
License: `MIT`
Author: `Bartosz Rak`
