const django = {
  url: 'http://localhost:8000',
  tokenLoader: function()  {
    var djangoToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('djangoToken='))
      .split('=')[1];
    return djangoToken;
  }
}

export default django;