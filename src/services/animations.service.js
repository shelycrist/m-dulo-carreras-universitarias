
const emptyAnimationProps = {
  initial: {},
  animate: {},
  exit: {},
};

export const getFadeInProps = (props) => {
  if (props?.active === false) return emptyAnimationProps;

  return {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: props?.duration || 0.4,
        // @ts-ignore
        ease: props?.ease || 'easeInOut',
        delay: props?.delay || 0,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: props?.duration || 0.4,
        // @ts-ignore
        ease: props?.ease || 'easeInOut',
        delay: props?.delayExit || 0,
      },
    },
  };
};
