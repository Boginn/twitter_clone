export default {
  avatarSize(breakpoint) {
    switch (breakpoint) {
      case 'xs':
        return 30;
      case 'sm':
        return 35;
      case 'md':
        return 40;
      case 'lg':
        return 40;
      case 'xl':
        return 45;
    }
    return 100;
  },
  iconSize(breakpoint) {
    switch (breakpoint) {
      case 'xs':
        return 15;
      case 'sm':
        return 18;
      case 'md':
        return 20;
      case 'lg':
        return 22;
      case 'xl':
        return 22;
    }
    return 100;
  },
};
