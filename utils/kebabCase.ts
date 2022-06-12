import slugger from 'github-slugger';

const kebabCase = (str: string) => slugger.slug(str);

export default kebabCase;
