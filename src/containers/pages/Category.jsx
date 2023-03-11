import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import Footer from "components/navegation/Footer";
import Navbar from "components/navegation/Navbar";

import BlogCateHeader from "components/blog/BlogCateHeader";
import BlogList from 'components/blog/BlogList'

import Layout from "hocs/layouts/Layout";

// categories es un action de redux
import { get_categories } from "redux/actions/categories/categories";
import { get_blog_list_category, get_blog_list_category_page } from "redux/actions/blog/blog";

import { connect } from "react-redux";

function Category({
  get_categories,
  categories,
  get_blog_list_category,
  get_blog_list_category_page,
  posts,
  count,
  next,
  previous,
}) {

    const params = useParams()
    const slug = params.slug

  useEffect(() => {
    window.scrollTo(0, 0);
    get_categories();
    get_blog_list_category(slug);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Prototype | Category: {slug}</title>
        <meta
          name="description"
          content="Prototipo pagina web react y django (con fines educativos)"
        />
        <meta
          name="keywords"
          content="react & django, react y django, full stack web developer"
        />
        <meta name="robots" content="all" />
        <link rel="canonical" href="" />
        <meta name="author" content="Richi" />
        <meta name="publisher" content="Richi" />

        {/* Social Media Tags */}
        <meta property="og:title" content="Prototype" />
        <meta
          property="og:description"
          content="Prototipo pagina web react y django (con fines educativos)."
        />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />

        <meta name="twitter:title" content="Prototype" />
        <meta
          name="twitter:description"
          content="Prototipo pagina web react y django (con fines educativos)."
        />
        <meta name="twitter:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />
      <div className="pt-28">
        <BlogCateHeader categories={categories&&categories} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl my-10">
            <BlogList
              posts={posts && posts}
              get_blog_list_page={get_blog_list_category_page}
              count={count}
            />
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,

  posts: state.blog.blog_list_category,
  count: state.blog.count,
  next: state.blog.next,
  previous: state.blog.previous,
});

export default connect(mapStateToProps, {
  get_categories,
  get_blog_list_category,
  get_blog_list_category_page,
})(Category);
