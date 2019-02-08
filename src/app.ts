export const dva = {
  config: {
    onError(err: any) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
