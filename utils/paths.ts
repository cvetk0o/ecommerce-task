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
  wishlist() {
    return "/wishlist";
  },
};

export default paths;
