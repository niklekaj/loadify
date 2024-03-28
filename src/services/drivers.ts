import { type Driver, getDrivers } from '@/mockApi/index'

export const fetchDrivers = async (): Promise<Driver[]> => {
    try {
        const data: Driver[] = await getDrivers();
        return data;
    } catch (error) {
        throw error;
    }
};