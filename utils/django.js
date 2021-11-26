const django = {
  url: 'http://localhost:8000',
  tokenLoader: function() {
    var djangoToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('djangoToken='))
      .split('=')[1];
    return djangoToken;
  },
  deleteToken: function() {
    var cookies = document.cookie;
    console.log('bad cookies', cookies);
    var djangoToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('djangoToken='))
      .split('=')[1];
    var previousCookies = cookies.slice(0, cookies.indexOf(`djangoToken=${djangoToken}`));
    console.log('previousCookies', previousCookies);
    var followingCookies = cookies.slice(cookies.indexOf(`djangoToken=${djangoToken}`) + `djangoToken=${djangoToken}`.length);
    console.log('followingCookies', followingCookies);
    var newCookies = previousCookies + followingCookies;
    console.log('new cookies', newCookies);
    document.cookie = newCookies;
  }
}

export default django;