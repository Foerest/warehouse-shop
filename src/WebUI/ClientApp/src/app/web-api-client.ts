/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.9.4.0 (NJsonSchema v10.3.1.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IWarehousesClient {
    getWarehousesWithPagination(pageNumber: number | undefined, pageSize: number | undefined): Observable<PaginatedListOfWarehouse>;
    update(id: number, command: BuyWarehouseVehiclesCommand): Observable<FileResponse>;
}

@Injectable({
    providedIn: 'root'
})
export class WarehousesClient implements IWarehousesClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getWarehousesWithPagination(pageNumber: number | undefined, pageSize: number | undefined): Observable<PaginatedListOfWarehouse> {
        let url_ = this.baseUrl + "/api/Warehouses?";
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetWarehousesWithPagination(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetWarehousesWithPagination(<any>response_);
                } catch (e) {
                    return <Observable<PaginatedListOfWarehouse>><any>_observableThrow(e);
                }
            } else
                return <Observable<PaginatedListOfWarehouse>><any>_observableThrow(response_);
        }));
    }

    protected processGetWarehousesWithPagination(response: HttpResponseBase): Observable<PaginatedListOfWarehouse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PaginatedListOfWarehouse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PaginatedListOfWarehouse>(<any>null);
    }

    update(id: number, command: BuyWarehouseVehiclesCommand): Observable<FileResponse> {
        let url_ = this.baseUrl + "/api/Warehouses/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(<any>response_);
                } catch (e) {
                    return <Observable<FileResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileResponse>><any>_observableThrow(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<FileResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return _observableOf({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<FileResponse>(<any>null);
    }
}

export class PaginatedListOfWarehouse implements IPaginatedListOfWarehouse {
    items?: Warehouse[] | undefined;
    pageIndex?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;

    constructor(data?: IPaginatedListOfWarehouse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(Warehouse.fromJS(item));
            }
            this.pageIndex = _data["pageIndex"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            this.hasPreviousPage = _data["hasPreviousPage"];
            this.hasNextPage = _data["hasNextPage"];
        }
    }

    static fromJS(data: any): PaginatedListOfWarehouse {
        data = typeof data === 'object' ? data : {};
        let result = new PaginatedListOfWarehouse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        data["pageIndex"] = this.pageIndex;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data; 
    }
}

export interface IPaginatedListOfWarehouse {
    items?: Warehouse[] | undefined;
    pageIndex?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}

export abstract class DBCollection implements IDBCollection {
    id?: number;
    name?: string | undefined;

    constructor(data?: IDBCollection) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): DBCollection {
        data = typeof data === 'object' ? data : {};
        throw new Error("The abstract class 'DBCollection' cannot be instantiated.");
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        return data; 
    }
}

export interface IDBCollection {
    id?: number;
    name?: string | undefined;
}

export class Warehouse extends DBCollection implements IWarehouse {
    location?: Location | undefined;
    cars?: Car | undefined;

    constructor(data?: IWarehouse) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.location = _data["location"] ? Location.fromJS(_data["location"]) : <any>undefined;
            this.cars = _data["cars"] ? Car.fromJS(_data["cars"]) : <any>undefined;
        }
    }

    static fromJS(data: any): Warehouse {
        data = typeof data === 'object' ? data : {};
        let result = new Warehouse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["location"] = this.location ? this.location.toJSON() : <any>undefined;
        data["cars"] = this.cars ? this.cars.toJSON() : <any>undefined;
        super.toJSON(data);
        return data; 
    }
}

export interface IWarehouse extends IDBCollection {
    location?: Location | undefined;
    cars?: Car | undefined;
}

export class Location implements ILocation {
    lat?: number;
    long?: number;

    constructor(data?: ILocation) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.lat = _data["lat"];
            this.long = _data["long"];
        }
    }

    static fromJS(data: any): Location {
        data = typeof data === 'object' ? data : {};
        let result = new Location();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["lat"] = this.lat;
        data["long"] = this.long;
        return data; 
    }
}

export interface ILocation {
    lat?: number;
    long?: number;
}

export class Car implements ICar {
    location?: string | undefined;
    vehicles?: Vehicle[] | undefined;

    constructor(data?: ICar) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.location = _data["location"];
            if (Array.isArray(_data["vehicles"])) {
                this.vehicles = [] as any;
                for (let item of _data["vehicles"])
                    this.vehicles!.push(Vehicle.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Car {
        data = typeof data === 'object' ? data : {};
        let result = new Car();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["location"] = this.location;
        if (Array.isArray(this.vehicles)) {
            data["vehicles"] = [];
            for (let item of this.vehicles)
                data["vehicles"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ICar {
    location?: string | undefined;
    vehicles?: Vehicle[] | undefined;
}

export class Vehicle implements IVehicle {
    id?: number;
    make?: string | undefined;
    model?: string | undefined;
    year?: number;
    price?: number;
    licensed?: boolean;
    dateAdded?: Date;
    buy?: boolean;
    domainEvents?: DomainEvent[] | undefined;

    constructor(data?: IVehicle) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.make = _data["make"];
            this.model = _data["model"];
            this.year = _data["year"];
            this.price = _data["price"];
            this.licensed = _data["licensed"];
            this.dateAdded = _data["dateAdded"] ? new Date(_data["dateAdded"].toString()) : <any>undefined;
            this.buy = _data["buy"];
            if (Array.isArray(_data["domainEvents"])) {
                this.domainEvents = [] as any;
                for (let item of _data["domainEvents"])
                    this.domainEvents!.push(DomainEvent.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Vehicle {
        data = typeof data === 'object' ? data : {};
        let result = new Vehicle();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["make"] = this.make;
        data["model"] = this.model;
        data["year"] = this.year;
        data["price"] = this.price;
        data["licensed"] = this.licensed;
        data["dateAdded"] = this.dateAdded ? this.dateAdded.toISOString() : <any>undefined;
        data["buy"] = this.buy;
        if (Array.isArray(this.domainEvents)) {
            data["domainEvents"] = [];
            for (let item of this.domainEvents)
                data["domainEvents"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IVehicle {
    id?: number;
    make?: string | undefined;
    model?: string | undefined;
    year?: number;
    price?: number;
    licensed?: boolean;
    dateAdded?: Date;
    buy?: boolean;
    domainEvents?: DomainEvent[] | undefined;
}

export abstract class DomainEvent implements IDomainEvent {
    isPublished?: boolean;
    dateOccurred?: Date;

    constructor(data?: IDomainEvent) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.isPublished = _data["isPublished"];
            this.dateOccurred = _data["dateOccurred"] ? new Date(_data["dateOccurred"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): DomainEvent {
        data = typeof data === 'object' ? data : {};
        throw new Error("The abstract class 'DomainEvent' cannot be instantiated.");
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isPublished"] = this.isPublished;
        data["dateOccurred"] = this.dateOccurred ? this.dateOccurred.toISOString() : <any>undefined;
        return data; 
    }
}

export interface IDomainEvent {
    isPublished?: boolean;
    dateOccurred?: Date;
}

export class BuyWarehouseVehiclesCommand implements IBuyWarehouseVehiclesCommand {
    id?: number;
    name?: string | undefined;
    vehicleIds?: number[] | undefined;

    constructor(data?: IBuyWarehouseVehiclesCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            if (Array.isArray(_data["vehicleIds"])) {
                this.vehicleIds = [] as any;
                for (let item of _data["vehicleIds"])
                    this.vehicleIds!.push(item);
            }
        }
    }

    static fromJS(data: any): BuyWarehouseVehiclesCommand {
        data = typeof data === 'object' ? data : {};
        let result = new BuyWarehouseVehiclesCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        if (Array.isArray(this.vehicleIds)) {
            data["vehicleIds"] = [];
            for (let item of this.vehicleIds)
                data["vehicleIds"].push(item);
        }
        return data; 
    }
}

export interface IBuyWarehouseVehiclesCommand {
    id?: number;
    name?: string | undefined;
    vehicleIds?: number[] | undefined;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}