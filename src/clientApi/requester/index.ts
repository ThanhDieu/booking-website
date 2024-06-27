import { paths, pathsTag } from '@/constants';
import http from '../http';
class RequesterAxios {
  /** fetch activities (server side fetch at front page) */
  getActivities = async () => {
    return await http({
      url: pathsTag.GET_ACTIVITY,
      method: 'GET',
    });
  };

  //** fetch all Home Bundle**//
  getHomeBundle: any = async () => {
    return await http({
      url: `${paths.FETCH_ALL_BUNDLE}?isHomePage=true`,
      method: 'GET',
    });
  };

  getAllBundle = async () => {
    return await http({
      url: paths.FETCH_ALL_BUNDLE,
      method: 'GET',
    })
  }

  getOfferDetail = async (id: string) => {
    return await http({
      url: `${paths.FETCH_OFFERS}/${id}`,
      method: 'GET',
    })
  }
}

const requesterAxios = new RequesterAxios();

export default requesterAxios;
