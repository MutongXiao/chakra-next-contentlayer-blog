async function redirect() {
  return [
    {
      source: '/blog',
      destination: '/blog/overview/all',
      permanent: true,
    },
  ];
}

module.exports = redirect;
