import { Grid, GridItem } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
interface Props {
  header?: ReactNode;
  main?: ReactNode;
  footer?: ReactNode;
  children?: React.ReactNode;
}

const BaseLayout = ({
  header = <Header />,
  main,
  footer = <Footer />,
  children,
}: Props) => {
  return (
    <Grid
      templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
      gridTemplateRows={'4.5rem 1fr auto'}
      minH="100vh"
      gap="1"
    >
      <GridItem area={'header'}>{header}</GridItem>
      <GridItem area={'main'}>{children || main}</GridItem>
      <GridItem area={'footer'}>{footer}</GridItem>
    </Grid>
  );
};

export default BaseLayout;
