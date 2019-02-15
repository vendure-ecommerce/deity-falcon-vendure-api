import {
    ApiDataSource,
    ApiUrlPriority,
    ContextFetchResponse,
    ContextRequestOptions,
    FetchUrlParams,
    FetchUrlResult,
    GraphQLContext,
} from '@deity/falcon-server-env';
import { ConfigurableContainerConstructorParams } from '@deity/falcon-server-env/src/models/ApiDataSource';
import { ConfigurableConstructorParams } from '@deity/falcon-server-env/src/types';
import { Request } from 'apollo-server-env';
import { DocumentNode, GraphQLResolveInfo, print } from 'graphql';

export interface VendureApiConfig {
    host: string;
    port: number;
    apiPath: string;
    protocol: 'http' | 'https';
}

export type VendureApiParams = ConfigurableContainerConstructorParams & ConfigurableConstructorParams<VendureApiConfig>;

/**
 * The base class deals with the request/response housekeeping and session management whereas the VendureApiBase
 * contains the actual resolver methods.
 */
export class VendureApiBase extends ApiDataSource {

    constructor(private params: VendureApiParams) {
        super(params);
    }

    getFetchUrlPriority(url: string): number {
        return ApiUrlPriority.HIGH;
    }

    async fetchUrl(obj: object, args: FetchUrlParams, context: GraphQLContext, info: GraphQLResolveInfo): Promise<FetchUrlResult> {
        const { path } = args;
        const result: FetchUrlResult = {
            id: 0,
            path,
            type: `shop-category`,
        };
        if (path.indexOf('category/') === 0) {
            const matches = path.match(/category\/(\d+)/);
            if (matches) {
                result.id = matches[1];
                result.type = 'shop-category';
            }
        }
        if (path.indexOf('product/') === 0) {
            const matches = path.match(/product\/(\d+)/);
            if (matches) {
                result.id = matches[1];
                result.type = 'shop-category';
            }
        }
        return result;
    }

    /**
     * Make a GraphQL query via POST to the Vendure API.
     */
    protected async query<T, V extends { [key: string]: any; }>(query: DocumentNode, variables?: V): Promise<T> {
        const apiPath = this.params.config && this.params.config.apiPath;
        if (!apiPath) {
            throw new Error(`No apiPath defined in the Falcon config`);
        }
        const response = await this.post(apiPath, {
                query: print(query),
                variables,
            },
            {
                context: {
                    isAuthRequired: true,
                },
            });
        if (response.errors) {
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(response.errors[0], null, 2));
            throw new Error(response.errors[0].message);
        }
        return response.data;
    }

    willSendRequest(request: ContextRequestOptions): Promise<void> {
        const session = this.session.cookieSession;
        const sig = this.session.cookieSessionSig;
        if (session && sig) {
            request.headers.set('Cookie', `${session}; ${sig}`);
        }
        return super.willSendRequest(request);
    }

    async didReceiveResponse<TResult = any>(res: ContextFetchResponse, req: Request): Promise<TResult> {
        // TODO: implement handling for bearer-token-based auth
        const cookies = (res.headers.get('set-cookie') || '').split(/[,;]\s*/);
        const data = await super.didReceiveResponse(res, req);

        for (const part of cookies) {
            if (/^session=/.test(part)) {
                this.session.cookieSession = part;
            }
            if (/^session.sig=/.test(part)) {
                this.session.cookieSessionSig = part;
            }
        }
        return data;
    }
}
