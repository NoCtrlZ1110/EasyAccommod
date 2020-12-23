export interface GetListApartmentInput {
    title: string;
    dateFrom?: Date;
    dateTo?: Date;
    status?: number;
    skipCount?: number;
    maxResultCount?: number;
}