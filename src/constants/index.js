import {
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock
} from 'react-icons/ai';
import { FiShoppingBag, FiPieChart } from 'react-icons/fi';
import { BsBarChart } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { GiLouvrePyramid, GiBookshelf } from 'react-icons/gi';

export const LINKS = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'ecommerce',
        icon: <FiShoppingBag />
      }
    ]
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'employees',
        icon: <IoMdContacts />
      },
      {
        name: 'collections',
        icon: <BiCategory />
      },
      {
        name: 'products',
        icon: <GiBookshelf />
      },
      {
        name: 'customers',
        icon: <RiContactsLine />
      },
      {
        name: 'orders',
        icon: <AiOutlineShoppingCart />
      }
    ]
  },

  {
    title: 'Charts',
    links: [
      {
        name: 'line',
        icon: <AiOutlineStock />
      },
      {
        name: 'area',
        icon: <AiOutlineAreaChart />
      },

      {
        name: 'bar',
        icon: <AiOutlineBarChart />
      },
      {
        name: 'pie',
        icon: <FiPieChart />
      },
      {
        name: 'financial',
        icon: <RiStockLine />
      },
      {
        name: 'color-mapping',
        icon: <BsBarChart />
      },
      {
        name: 'pyramid',
        icon: <GiLouvrePyramid />
      },
      {
        name: 'stacked',
        icon: <AiOutlineBarChart />
      }
    ]
  }
];

export const ACTIONS = {
  SET_MODE: 'SET_MODE',
  SET_COLOR: 'SET_COLOR',
  SET_ACTIVE_MENU: 'SET_ACTIVE_MENU',
  SET_SCREEN_SIZE: 'SET_SCREEN_SIZE',
  SET_THEME_SETTINGS: 'SET_THEME_SETTINGS',

  SET_COLLECTIONS: 'SET_COLLECTIONS'
};
