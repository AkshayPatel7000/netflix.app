// eslint-disable-next-line no-undef
export default URLS = {
  LOGIN: 'https://reseller.iitv.in/index.php/api/activate?activationkey=',
  GET_CATEGORIES: ({username = '', password = '', action = ''}) =>
    `/player_api.php?username=${username}&password=${password}&action=${action}`,

  GET_MOVIES_SERIES: ({
    username = '',
    password = '',
    action = '',
    category_id = '',
  }) =>
    `/player_api.php?username=${username}&password=${password}&action=${action}&category_id=${category_id}`,

  GET_MOVIE_DETAILS: ({
    username = '',
    password = '',
    action = 'get_vod_info',
    vod_id = '',
  }) =>
    `/player_api.php?username=${username}&password=${password}&action=${action}&vod_id=${vod_id}`,
  GET_SERIES_DETAILS: ({
    username = '',
    password = '',
    action = 'get_series_info',
    series_id = '',
  }) =>
    `/player_api.php?username=${username}&password=${password}&action=${action}&series_id=${series_id}`,
};
export const HEADERS = {
  URLENCODED: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
};
