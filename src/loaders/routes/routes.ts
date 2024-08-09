/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StatsController } from './../../modules/football/stats.controller';
import { expressAuthentication } from './../../modules/auth/authentication.service';
// @ts-ignore - no great way to install types from subpackage
import { iocContainer } from './../../ioc';
import type { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Period": {
        "dataType": "refEnum",
        "enums": ["week","month","season"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Position": {
        "dataType": "refEnum",
        "enums": ["GK","DEF","MID","FOR"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Stat": {
        "dataType": "refObject",
        "properties": {
            "teamName": {"dataType":"string","required":true},
            "savesTier2": {"dataType":"double","required":true},
            "lastName": {"dataType":"string","required":true},
            "savesTier1": {"dataType":"double","required":true},
            "subs": {"dataType":"double","required":true},
            "motms": {"dataType":"double","required":true},
            "points": {"dataType":"double","required":true},
            "redCards": {"dataType":"double","required":true},
            "concedes": {"dataType":"double","required":true},
            "assists": {"dataType":"double","required":true},
            "shotsTier1": {"dataType":"double","required":true},
            "shotsTier2": {"dataType":"double","required":true},
            "id": {"dataType":"double","required":true},
            "starts": {"dataType":"double","required":true},
            "goals": {"dataType":"double","required":true},
            "tacklesTier1": {"dataType":"double","required":true},
            "tacklesTier2": {"dataType":"double","required":true},
            "ownGoals": {"dataType":"double","required":true},
            "cleansheets": {"dataType":"double","required":true},
            "penSaves": {"dataType":"double","required":true},
            "firstName": {"dataType":"string","required":true},
            "penMisses": {"dataType":"double","required":true},
            "passesTier1": {"dataType":"double","required":true},
            "position": {"ref":"Position","required":true},
            "passesTier2": {"dataType":"double","required":true},
            "yellowCards": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatsResponse": {
        "dataType": "refObject",
        "properties": {
            "period": {"ref":"Period","required":true},
            "stats": {"dataType":"array","array":{"dataType":"refObject","ref":"Stat"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QueryParams": {
        "dataType": "refObject",
        "properties": {
            "weekId": {"dataType":"integer"},
            "monthId": {"dataType":"integer"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        app.get('/v1/stats/:period',
            authenticateMiddleware([{"api-auth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(StatsController)),
            ...(fetchMiddlewares<RequestHandler>(StatsController.prototype.getStats)),

            async function StatsController_getStats(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    period: {"in":"path","name":"period","required":true,"ref":"Period"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"QueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<StatsController>(StatsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getStats',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.options('/v1/stats/:period',
            authenticateMiddleware([{"api-auth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(StatsController)),
            ...(fetchMiddlewares<RequestHandler>(StatsController.prototype.getOptions)),

            async function StatsController_getOptions(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<StatsController>(StatsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getOptions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
