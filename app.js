// Choose once per page load; independent visits can occasionally pick the same logo.
const logoVariants = [
  'angel', 'anniversary', 'bee', 'black-cat', 'bunny-girl', 'cow',
  'cowherd', 'cowhide', 'default', 'detective', 'devil', 'feiyun',
  'flower-headdress', 'ghost-sheet', 'guanghu', 'leopard', 'maimai',
  'original-color', 'original-cowhide', 'pumpkin-head', 'soul',
  'weaver-girl', 'witch',
];
const selectedLogo = `./assets/images/maayuan/maayuan-${logoVariants[Math.floor(Math.random() * logoVariants.length)]}.png`;
const brandLogo = document.querySelector('.brand-logo');
brandLogo.addEventListener('error', () => {
  brandLogo.src = './assets/images/maayuan/maayuan-default.png';
}, { once: true });
brandLogo.src = selectedLogo;

// Set image to an approved local asset URL to replace a generic icon.
const linkGroups = [
  {
    title: '主要功能', note: '探索 MaaYuan', icon: 'box', primary: true,
    links: [
      { title: 'MaaYuan | 官方站', description: '安装下载与常见问题，一站搞定', url: 'https://maayuan.com/', icon: 'sparkles', tone: 'gold', image: './assets/images/links/maayuan.png' },
      // 暂时隐藏 YuanHub，恢复时取消下一行注释即可。
      // { title: 'YuanHub | 鸢鸢相抱 工具站', description: '六边形全能工具平台，满足殿下日常需求', url: 'https://hub.maayuan.com/', icon: 'garden', tone: 'sage', image: null },
      { title: 'MaaYuan Share | 作业站', description: '可制作/分享/下载MaaYuan的作业平台', url: 'https://share.maayuan.com/', icon: 'book', tone: 'clay', image: './assets/images/links/maayuan-share.png' },
    ],
  },
  {
    title: '期待关注', note: '把日常分享给你', icon: 'heart',
    links: [
      { title: '小红书 | 麻圆（不识字版）', description: '关注麻圆，掌握第一手图文动态', url: 'https://www.xiaohongshu.com/user/profile/685e3301000000001b0229ed', icon: 'notebook', tone: 'rose', image: './assets/images/links/xiaohongshu.jpg', crop: [1085, 1080, 270, 270, 530] },
      { title: 'B站 | 麻圆_不识字版', description: '更多视频讲解让殿下看一遍就上手', url: 'https://space.bilibili.com/3690998968355771', icon: 'video', tone: 'rose', image: './assets/images/links/bilibili.jpg', crop: [1095, 1080, 280, 250, 560] },
      { title: 'GitHub | MaaYuan', description: 'Make MaaYuan great again', url: 'https://github.com/syoius/MaaYuan', icon: 'code', tone: 'stone', image: './assets/images/links/github.jpg', crop: [1080, 1163, 310, 10, 450] },
    ],
  },
  {
    title: '加入交流', note: '相遇，也一起共建', icon: 'users',
    links: [
      { title: 'QQ群 | Maa鸢官方交流①群', url: 'https://qm.qq.com/q/ORc2ANqg24', icon: 'chat', tone: 'sage', image: './assets/images/links/qq.jpg', crop: [1080, 1080, 140, 140, 800] },
      { title: 'QQ频道 | Maa鸢', url: 'https://pd.qq.com/s/4e4angw4z3', icon: 'hash', tone: 'sage', image: './assets/images/links/qq-channel.jpeg', crop: [846, 500, 110, 155, 190] },
    ],
  },
];

// Small generic line icons; these are not platform or MaaYuan logos.
const iconPaths = {
  box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.3l8 4.5"/>',
  sparkles: '<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3ZM20 2v4m-2-2h4"/>',
  garden: '<path d="M12 21V11M12 16C4 16 3 10 3 6c7 0 9 4 9 10ZM12 12c0-6 3-9 9-9 0 6-3 9-9 9ZM7 21h10"/>',
  book: '<path d="M12 6c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Zm0 0v15M6 9l3 1m-3 3 3 1m6-4 3-1m-3 5 3-1"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  notebook: '<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M9 3v18M3 7h4m-4 5h4m-4 5h4m5-9h5m-5 4h5"/>',
  video: '<rect x="3" y="6" width="18" height="15" rx="3"/><path d="m8 2 4 4 4-4m-6 10 5-3-5-3v6Z"/>',
  code: '<path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16"/>',
  users: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m1-17a4 4 0 0 1 0 8m3 9v-2a7 7 0 0 0-3-5"/>',
  chat: '<path d="M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-.8L3 21l1.8-5A9 9 0 1 1 21 11Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',
  hash: '<path d="M10 3 8 21M16 3l-2 18M4 9h17M3 15h17"/>',
  arrow: '<path d="m9 5 7 7-7 7"/>',
};

function icon(name) {
  const wrapper = document.createElement('span');
  wrapper.className = 'icon';
  wrapper.setAttribute('aria-hidden', 'true');
  wrapper.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false">${iconPaths[name]}</svg>`;
  return wrapper;
}

function createCard(link, index) {
  const card = document.createElement('a');
  card.className = 'link-card';
  card.href = link.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.style.setProperty('--delay', `${index * 25}ms`);
  const badge = document.createElement('span');
  badge.className = `card-badge tone-${link.tone}`;
  if (link.image) {
    const image = document.createElement('img');
    image.src = link.image;
    image.alt = ''; // Adjacent link title already identifies the destination.
    if (link.crop) {
      // Original width/height, then the square icon region x/y/size; no source image edits.
      const [width, height, x, y, size] = link.crop;
      image.className = 'cropped-logo';
      image.style.width = `${width / size * 100}%`;
      image.style.height = `${height / size * 100}%`;
      image.style.left = `${-x / size * 100}%`;
      image.style.top = `${-y / size * 100}%`;
    }
    badge.append(image);
  } else {
    badge.append(icon(link.icon));
  }
  const content = document.createElement('span');
  content.className = 'card-content';
  const title = document.createElement('span');
  title.className = 'card-title';
  title.textContent = link.title;
  content.append(title);
  if (link.description) {
    const description = document.createElement('span');
    description.className = 'card-description';
    description.textContent = link.description;
    content.append(description);
  }
  const arrow = icon('arrow');
  arrow.classList.add('card-arrow');
  card.append(badge, content, arrow);
  return card;
}

const container = document.querySelector('#links');
let cardIndex = 0;
linkGroups.forEach((group, index) => {
  const section = document.createElement('section');
  section.className = `link-section${group.primary ? ' primary' : ''}`;
  section.setAttribute('aria-labelledby', `group-${index}`);
  const heading = document.createElement('div');
  heading.className = 'section-heading';
  const title = document.createElement('h2');
  title.id = `group-${index}`;
  title.append(icon(group.icon), document.createTextNode(group.title));
  const note = document.createElement('span');
  note.className = 'section-note';
  note.textContent = group.note;
  heading.append(title, note);
  const list = document.createElement('ul');
  list.className = 'card-list';
  group.links.forEach(link => {
    const item = document.createElement('li');
    item.append(createCard(link, cardIndex++));
    list.append(item);
  });
  section.append(heading, list);
  container.append(section);
});
