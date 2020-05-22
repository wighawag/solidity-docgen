import handlebars from 'handlebars';

const H = handlebars.create();
// TODO support user specified helpers
H.registerHelper('slug', slug);
H.registerHelper({
    eq: function (v1, v2, options) {
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
    },
    ne: function (v1, v2, options) {
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
    },
    lt: function (v1, v2, options) {
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
    },
    gt: function (v1, v2, options) {
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
    },
    lte: function (v1, v2, options) {
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    },
    gte: function (v1, v2, options) {
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    },
    and: function () {
        return [...arguments].slice(0, -1).every(Boolean);
    },
    or: function () {
        return [...arguments].slice(0, -1).some(Boolean);
    }
});

export type Template<Context> = (context: Context) => string;

export function compile(template: string): Template<unknown> {
  const compiledTemplate = H.compile(template, { noEscape: true });
  return context => compiledTemplate(context, {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
  });
}

export function slug(str: string): string {
  return str.replace(/\W/g, '-');
}
