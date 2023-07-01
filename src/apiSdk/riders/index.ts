import axios from 'axios';
import queryString from 'query-string';
import { RiderInterface, RiderGetQueryInterface } from 'interfaces/rider';
import { GetQueryInterface } from '../../interfaces';

export const getRiders = async (query?: RiderGetQueryInterface) => {
  const response = await axios.get(`/api/riders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRider = async (rider: RiderInterface) => {
  const response = await axios.post('/api/riders', rider);
  return response.data;
};

export const updateRiderById = async (id: string, rider: RiderInterface) => {
  const response = await axios.put(`/api/riders/${id}`, rider);
  return response.data;
};

export const getRiderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/riders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRiderById = async (id: string) => {
  const response = await axios.delete(`/api/riders/${id}`);
  return response.data;
};
