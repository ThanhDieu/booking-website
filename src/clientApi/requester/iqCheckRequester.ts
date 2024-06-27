import serverIQCheck from "../serverIQCheck";

class IQCheckRequester {
  fetchOverall = async(id: string) => {
    return await serverIQCheck({
      url: `/businesses/${id}/results/summary`,
      method: 'GET'
    });
  }

  fetchReviews = async(id: string) => {
    return await serverIQCheck({
      url: `/businesses/${id}/results/feedbacks`,
      method: 'GET'
    });
  }
}

const iqCheckRequester = new IQCheckRequester();

export default iqCheckRequester;
