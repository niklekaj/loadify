import { type Tour, getTours } from '@/mockApi/index'

export const fetchTours = async (): Promise<Tour[]> => {
  try {
    const data: Tour[] = await getTours()
    return data
  } catch (error) {
    throw error
  }
}
