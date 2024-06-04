import "server-only";

const dictionaries: {
  [key: string]: (filename: string) => any;
} = {
  en: async (filename: string) =>
    import(`../../dictionaries/en/${filename}.json`).then(
      (module) => module.default,
    ),
  jp: async (filename: string) =>
    import(`../../dictionaries/jp/${filename}.json`).then(
      (module) => module.default,
    ),
};

export const getDictionary = async (locale: string, filename: string) =>
  dictionaries[locale](filename);
