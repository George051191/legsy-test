/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios';

import { baseUrl, mockData } from '../services/constants';
import { setCurrentGoods } from '../store/allSlice';

import { AppThunk } from '../services/store-types';
import {
  TCategoryData, TPhotos, TSuppliersId,
} from '../services/types';

const getDataThunk: AppThunk = () => async (dispatch) => {
  try {
    const suppliersId: AxiosResponse<TSuppliersId> = await axios.get(`${baseUrl}/get_supplier_cards?supplier_id=31460`);
    const goods: AxiosResponse<TCategoryData[]> = await axios.post(`${baseUrl}/cards_detail`, {
      nm_ids: suppliersId.data,
    });
    const photos: AxiosResponse<TPhotos> = await axios.post(`${baseUrl}/cards_photo`, {
      nm_ids: suppliersId.data,
    });
    const FullDataCategory = goods.data.map((el) => {
      const photo = photos.data[el.id];
      const priceU = el.priceU / 100;
      return { ...el, priceU ,mockData, photo };
    });
    dispatch(setCurrentGoods(FullDataCategory));
  } catch (error) {
    console.log(error);
  }
};

export default getDataThunk;
