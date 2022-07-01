import { Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useViewportScroll } from 'framer-motion';
interface Props {
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
}

const BaseLayout = ({ header, main, footer }: Props) => {
  const [y, setY] = useState(0);
  const ref = useRef<HTMLHeadingElement>();
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <Grid
      templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
      gridTemplateRows={'auto 1fr auto'}
      minH="100vh"
      gap="1"
    >
      <GridItem
        area={'header'}
        pos="sticky"
        top="0"
        zIndex="9"
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s, background-color 0.2s"
      >
        {header}
      </GridItem>
      <GridItem area={'main'}>{main}</GridItem>
      <GridItem area={'footer'}>{footer}</GridItem>
    </Grid>
  );
};

export default BaseLayout;
