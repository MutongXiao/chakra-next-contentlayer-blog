async function redirect() {
  return [
    {
      source: '/blog',
      destination: '/blog/all',
      permanent: true,
    },
  ];
}

module.exports = redirect;
