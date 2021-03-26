import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<Props> = ({ items }) => {
  const router = useRouter();

  return (
    <Breadcrumb mb={10}>
      {items.map((item, index) => (
        <BreadcrumbItem
          key={`${item.name}-${index}`}
          isLastChild={items.length - 1 === index}
          isCurrentPage={router.asPath === item.href}
        >
          <BreadcrumbLink as={Link} href={item.href}>
            {item.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
