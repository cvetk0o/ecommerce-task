const paths = {
  homePage() {
    return "/";
  },
  category(slug: string) {
    return `/category/${slug}`;
  },
  cart() {
    return "/cart";
  },
};

export default paths;
