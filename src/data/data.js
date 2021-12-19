const routes = {
  home: [
    {
      name: 'Home',
      path: 'home',
      icon: 'bx:bx-home-circle',
      color: 'vuegrey',
    },
    {
      name: 'Explore',
      path: 'explore',
      icon: 'akar-icons:hashtag',
      color: 'vuegrey',
    },

    {
      name: 'Notifications',
      path: 'notifications',
      icon: 'ion:notifications-outline',
      color: 'vuegrey',
    },

    {
      name: 'Messages',
      path: 'messages',
      icon: 'ep:message',
      color: 'vuegrey',
    },
    {
      name: 'Bookmarks',
      path: 'bookmarks',
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
        icon: 'akar-icons:heart',
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

export default {
  routes,
  options,
};
