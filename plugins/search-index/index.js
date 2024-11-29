const fs = require('fs');
const path = require('path');

module.exports = function searchIndexPlugin(context, options) {
  return {
    name: 'search-index-plugin',
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      const searchIndex = [];

      // Process docs
      Object.values(content.docs).forEach((doc) => {
        searchIndex.push({
          title: doc.title,
          url: doc.permalink,
          content: doc.description + ' ' + doc.content,
          type: 'doc',
        });
      });

      // Process blog posts
      Object.values(content.blog || {}).forEach((post) => {
        searchIndex.push({
          title: post.title,
          url: post.permalink,
          content: post.description + ' ' + post.content,
          type: 'blog',
        });
      });

      // Create search index file
      const searchIndexJson = JSON.stringify(searchIndex);
      const searchIndexPath = await createData(
        'searchIndex.json',
        searchIndexJson
      );

      // Inject search index into the client
      const injectedScript = `window.__searchIndex = ${searchIndexJson};`;
      await createData('searchIndex.js', injectedScript);
    },

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
              src: '/searchIndex.js',
            },
          },
        ],
      };
    },
  };
};
