export interface PackageInterface {
    _id: string;
    packageId: string;
    title: string;
    description: string;
    tasks: string[];
    startDate: string | undefined;
    endDate: string | undefined;
    createdBy: {
        _id: string;
        name: string;
        email: string;
    };
}
