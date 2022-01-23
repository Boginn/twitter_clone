const api = 'https://localhost:44343/api';

const routes = {
  home: [
    {
      name: 'Home',
      path: '/',
      icon: 'bx:bx-home-circle',
      color: 'vuegrey',
    },
    {
      name: 'Explore',
      path: '/explore',
      icon: 'akar-icons:hashtag',
      color: 'vuegrey',
    },

    {
      name: 'Notifications',
      path: '/notifications',
      icon: 'ion:notifications-outline',
      color: 'vuegrey',
    },

    {
      name: 'Messages',
      path: '/messages',
      icon: 'ep:message',
      color: 'vuegrey',
    },
    {
      name: 'Bookmarks',
      path: '/bookmarks',
      icon: 'bi:bookmark',
      color: 'vuegrey',
    },
    {
      name: 'Lists',
      path: 'lists',
      icon: 'fluent:clipboard-bullet-list-ltr-20-regular',
      color: 'vuegrey',
    },
    {
      name: 'Profile',
      path: 'profile',
      icon: 'ant-design:user-outlined',
      color: 'vuegrey',
    },
    {
      name: 'More',
      path: 'more',
      icon: 'fluent:more-circle-32-regular',
      color: 'vuegrey',
    },
  ],
};

const options = {
  generic: {
    dots: {
      name: 'More',
      icon: 'bx:bx-dots-horizontal-rounded',
    },
  },
  tweet: {
    width: 15,
    icons: [
      {
        name: 'Reply',
        path: '',
        icon: 'akar-icons:chat-bubble',
      },
      {
        name: 'Retweet',
        path: '',
        icon: 'ps:retweet-1',
      },
      {
        name: 'Like',
        path: '',
        icon: 'ant-design:heart',
        iconAlternative: 'ant-design:heart-filled',
      },
      {
        name: 'Share',
        path: '',
        icon: 'akar-icons:share-box',
      },
    ],
  },
  post: {
    width: 22,
    icons: [
      {
        name: 'Media',
        path: '',
        icon: 'iconoir:media-image',
      },
      {
        name: 'Gif',
        path: '',
        icon: 'fluent:gif-16-regular',
      },
      {
        name: 'Poll',
        path: '',
        icon: 'bx:bx-poll',
      },
      {
        name: 'Emoji',
        path: '',
        icon: 'fluent:emoji-16-regular',
      },
      {
        name: 'Schedule',
        path: '',
        icon: 'akar-icons:schedule',
      },

      {
        name: 'Location',
        path: '',
        icon: 'akar-icons:location',
      },
    ],
  },
};

const colors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
  'grey',
];

const more = {
  trending: [
    { value: 'Not interested in this' },
    { value: 'This trend is harmful or spammy' },
  ],
  tweet: [{ value: 'Follow' }, { value: 'Block' }, { value: 'Report' }],
  ownedTweet: [{ value: 'Delete' }],
};

const rules = {
  name: [
    (v) => !!v || 'A name is required',
    (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ],
  post: [
    (v) => !!v || '',
    (v) => (v && v.length <= 280) || 'Must not exceed 280 characters.',
  ],
  reply: [
    (v) => !!v || '',
    (v) => (v && v.length <= 280) || '280 characters maximum.',
  ],
  default: [(v) => !!v || 'Item is required'],
};

export default {
  api,
  routes,
  options,
  colors,
  more,
  rules,
};
