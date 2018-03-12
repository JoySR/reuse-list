const getToken = (name = 'token') => {
  const cookie = document.cookie.replace(/\s+;\s+/, ';').split(';')
    .map(s => s.replace(/\s+=\s+/, '=').split('='));

  for (let i = 0; i < cookie.length; i += 1) {
    if (cookie[i][0] && cookie[i][0].trim() === name) {
      return cookie[i][1];
    }
  }
  return null;
};

const setToken = (name = 'token', value, days) => {
  const expiresIn = days ? days * 24 * 60 * 60 * 1000 : 0;
  const now = new Date();
  const expires = (new Date(now.getTime() + expiresIn)).toUTCString();
  document.cookie = `${name}=${encodeURI(value)};expires=${expires};domain=${document.domain};path=/;`;
};

const clearToken = (name = 'token') => {
  setToken(name, '');
};

const tokenConfig = {
  set: setToken,
  get: getToken,
  clear: clearToken,
};

export default tokenConfig;
