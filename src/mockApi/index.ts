export interface Driver {
    id: number;
    name: string;
    location: string;
  }
  
  export interface Tour {
    id: number;
    customer: string;
    shipmentDate: string;
    locationFrom: string;
    locationTo: string;
    assignedDriver: number | null;
  }

  export async function getDrivers(): Promise<Driver[]> {
    const drivers = await (await import("./mockData/drivers.json")).default;
    return drivers;
  }
  
  export async function getTours(): Promise<Tour[]> {
    const tours: Tour[] = await (
      await import("./mockData/tours.json")
    ).default;

    return tours;
  }