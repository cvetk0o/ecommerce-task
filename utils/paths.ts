const paths = {
  homePage() {
    return "/";
  },
  category(slug: string) {
    return `/category/${slug}`;
  },
};

export default paths;
