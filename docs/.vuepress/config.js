module.exports = {
  base: '/working-git-command/',
  title: 'Git Command',
  description: '在工作中，经常用到的git命令.',
  head: [
    ['link', { rel: 'icon', href: '/bo-bi.jpeg' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
