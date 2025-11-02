export const truckColumns = [
    {
        field: "license",
        headerName: "License",
        flex: 1,
    },
    {
        field: "driver_name",
        headerName: "Driver Name",
        flex: 1,
    },
    {
        field: "capacity",
        headerName: "Capacity",
        flex: 0.75,
    },
    {
        field: "registration",
        headerName: "Registration",
        flex: 0.75,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.registration}`}>
                    {params.row.registration}
                </div>
            );
        },
    },
];

export const facilityColumns = [
    {
        field: "facilityName",
        headerName: "Facility Name",
        flex: 1,
    },
    {
        field: "address",
        headerName: "Address",
        flex: 1,
    },
    {
        field: "city",
        headerName: "City",
        flex: 1,
    },
    {
        field: "facilityState",
        headerName: "State",
        flex: 0.5,
    },
    {
        field: "zipCode",
        headerName: "ZIP Code",
        flex: 1,
    },
];

export const tripColumns = [
    {
        field: "truck",
        headerName: "Truck",
        flex: 1,
    },
    {
        field: "originFacility",
        headerName: "Origin Facility",
        flex: 1,
    },
    {
        field: "destinationFacility",
        headerName: "Destination Facility",
        flex: 1,
    },
    {
        field: "startDate",
        headerName: "Start Date",
        sortComparator: (v1, v2, param1, param2) =>
            new Date(param1.api.getCellValue(param1.id, "startDate")) -
            new Date(param2.api.getCellValue(param2.id, "startDate")),
        flex: 1,
    },
    {
        field: "endDate",
        headerName: "End Date",
        sortComparator: (v1, v2, param1, param2) =>
            new Date(param1.api.getCellValue(param1.id, "endDate")) -
            new Date(param2.api.getCellValue(param2.id, "endDate")),
        flex: 1,
    },
    {
        field: "earnings",
        headerName: "Earnings",
        flex: 0.5,
    },
];
