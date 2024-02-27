export interface IMenu {
  id: number;
  name: string;
  link: string;
  children: IMenu[];
  icon: string;
}
export const Menu = [
  {
    id: 1,
    name: 'Analytics',
    link: '/',
    children: [],
    icon: 'show_chart',
  },
  {
    id: 2,
    name: 'Menu',
    link: '/items',
    children: [],
    icon: 'menu_book',
  },
  {
    id: 3,
    name: 'Customers',
    link: '/app-users',
    children: [],
    icon: 'group',
  },
  {
    id: 4,
    name: 'Subscription',
    link: '/subscription',
    children: [],
    icon: 'loyalty',
  },
  {
    id: 5,
    name: 'Order List',
    link: '/order-list',
    children: [],
    icon: 'list_alt',
  },
  {
    id: 6,
    name: 'Review',
    link: '/reviews',
    children: [],
    icon: 'reviews',
  },
];
