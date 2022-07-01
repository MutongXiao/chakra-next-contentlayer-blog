import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  config: {},
  fonts: {
    heading: 'dengxian, Inter, sans-serif',
    body: 'dengxian, Inter, sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        width: '100vw',
        minH: '100vh',
        scrollBehavior: 'smooth',
        overflowX: 'hidden',
        overflowY: 'overlay',
        color: mode('gray.700', 'whiteAlpha.900')(props),
        '.deleted': {
          color: '#ff8383 !important',
          fontStyle: 'normal !important',
        },
        '.inserted': {
          color: '#b5f4a5 !important',
          fontStyle: 'normal !important',
        },
      },
      'body::-webkit-scrollbar': {
        width: '14px',
      },
      'body::-webkit-scrollbar-thumb': {
        borderRadius: '7px',
        backgroundColor: mode('gray.300', 'whiteAlpha.300')(props),
      },
      'body::-webkit-scrollbar-thumb:hover': {
        backgroundColor: mode('gray.400', 'whiteAlpha.400')(props),
      },
      'body::-webkit-scrollbar-track': {
        borderRadius: '7px',
        background: mode('rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 0)')(props),
      },
    }),
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      textAlign: 'center',
      fontWeight: 'bold',
      letterSpacing: '-0.015em',
      lineHeight: '1.24',
      fontSize: { base: '2rem', md: '3.5rem' },
    },
    'heading-2': {
      fontFamily: 'heading',
      textAlign: 'center',
      fontWeight: 'bold',
      letterSpacing: '-0.015em',
      lineHeight: '1.24',
      fontSize: { base: '1.75rem', md: '2.75rem' },
    },
    caps: {
      textTransform: 'uppercase',
      fontSize: 'sm',
      letterSpacing: 'widest',
      fontWeight: 'bold',
    },
  },
  mdx: {
    h1: {
      mt: '0.22rem',
      mb: '.25rem',
      lineHeight: 1.2,
      fontWeight: 'bold',
      fontSize: '1.875rem',
      letterSpacing: '-.025em',
    },
    h2: {
      mt: '3rem',
      mb: '0.25rem',
      lineHeight: 1.3,
      fontWeight: 'semibold',
      fontSize: '1.5rem',
      letterSpacing: '-.025em',
      '& + h3': {
        mt: '1.5rem',
      },
      '&::before': {
        content: '"✒️"',
        fontSize: '1.25rem',
        mr: '2px',
      },
    },
    h3: {
      mt: '2.5rem',
      // mb: "0.5rem",
      lineHeight: 1.25,
      fontWeight: 'semibold',
      fontSize: '1.25rem',
      letterSpacing: '-.025em',
      '&::before': {
        content: '"✏️"',
        fontSize: '1rem',
        mr: '2px',
      },
    },
    h4: {
      mt: '2.5rem',
      lineHeight: 1.375,
      fontWeight: 'semibold',
      fontSize: '1.125rem',
      '&::before': {
        content: '"📌"',
        fontSize: '1rem',
        mr: '2px',
      },
    },
    h5: {
      mt: '2.5rem',
      lineHeight: 1.375,
      fontWeight: 'semibold',
      fontSize: '1.125rem',
      '&::before': {
        content: '"🏷️"',
        fontSize: '1rem',
        mr: '2px',
      },
    },
    a: {
      color: 'teal.500',
      fontWeight: 'semibold',
      transition: 'color 0.15s',
      transitionTimingFunction: 'ease-out',
      _hover: {
        color: 'teal.600',
      },
    },
    p: {
      mt: '0.6rem',
      lineHeight: 1.7,
      'blockquote &': {
        mt: 0,
      },
    },
    hr: {
      my: '4rem',
    },
    blockquote: {
      bg: 'orange.100',
      borderWidth: '1px',
      borderColor: 'orange.200',
      rounded: 'lg',
      px: '1.25rem',
      py: '1rem',
      my: '1.5rem',
    },
    ul: {
      mt: '0.5rem',
      ml: '1.25rem',
      'blockquote &': { mt: 0 },
      '& > * + *': {
        mt: '0.25rem',
      },
    },
    code: {
      rounded: 'sm',
      px: '1',
      fontSize: '0.875em',
      py: '2px',
      lineHeight: 'normal',
    },
  },
});

export default customTheme;
