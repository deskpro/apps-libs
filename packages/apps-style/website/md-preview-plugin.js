module.exports = (md, options) => {
  const orig = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, instance) => {
    const fence = tokens[idx];
    if (!fence) {
      return orig.apply(instance, [tokens, idx, options, env, instance]);
    }

    const lang = fence.params || null;

    if (lang === 'html @render') {
      return '<div class="dp-style-wrapper dp-Body">' + fence.content + '</div>';
    }

    const sourceCode = orig.apply(instance, [tokens, idx, options, env, instance]);

    if (lang === 'html @preview') {
      return '<div class="html-with-preview">' +
        '<div class="rendered dp-style-wrapper dp-Body">' + fence.content + '<div class="code-collapsed-toggle">toggle code</div></div>' +
        '<div class="source collapsed">' + sourceCode + '</div>' +
        '</div>';
    }

    return sourceCode;
  };
};
