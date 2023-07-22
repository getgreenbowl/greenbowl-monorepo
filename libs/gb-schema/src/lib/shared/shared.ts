export interface Response<T> {
    data: T;
    msg: string
}

export interface ListResponse<T> {
    data: {
        count: number,
        rows: T[]
    };
    msg: string
}