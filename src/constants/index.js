import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { BsFilePost } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { GiBookshelf } from 'react-icons/gi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';

export const THEME_COLORS = [
  {
    name: 'blue-theme',
    color: '#1a97f5',
  },
  {
    name: 'green-theme',
    color: '#03c9d7',
  },
  {
    name: 'purple-theme',
    color: '#7352ff',
  },
  {
    name: 'red-theme',
    color: '#ff5c8e',
  },
  {
    name: 'indigo-theme',
    color: '#1e4db7',
  },
  {
    color: '#fb9678',
    name: 'orange-theme',
  },
];

export const LINKS = [
  {
    name: 'dashboard',
    icon: <FiShoppingBag />,
  },
  {
    name: 'employees',
    icon: <IoMdContacts />,
  },
  {
    name: 'collections',
    icon: <BiCategory />,
  },
  {
    name: 'products',
    icon: <GiBookshelf />,
  },
  {
    name: 'customers',
    icon: <RiContactsLine />,
  },
  {
    name: 'orders',
    icon: <AiOutlineShoppingCart />,
  },
  {
    name: 'posts',
    icon: <BsFilePost />,
  },
];

export const CONTEXT_MENU_ITEMS = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
];

export const COLLECTIONS_COLUMNS = [
  {
    field: '_id',
    headerText: 'ID',
  },
  {
    field: 'name',
    headerText: 'Name',
  },
  {
    field: 'mainCollection',
    headerText: 'Main Collection',
  },
  {
    field: 'parentCollection',
    headerText: 'Parent Collection',
  },
];

export const EMPLOYEE_COLUMNS = [
  {
    field: '_id',
    headerText: 'ID',
  },
  {
    field: 'name',
    headerText: 'Name',
  },
  {
    field: 'email',
    headerText: 'Email',
  },
  {
    field: 'role',
    headerText: 'Role',
  },
  {
    field: 'active',
    headerText: 'Status',
  },
];

export const PRODUCT_COLUMNS = [
  {
    field: '_id',
    headerText: 'ID',
  },
  {
    field: 'name',
    headerText: 'Name',
  },
  {
    field: 'mainCollection',
    headerText: 'Collection',
  },
  {
    field: 'sku',
    headerText: 'SKU',
  },
  {
    field: 'price',
    headerText: 'Price',
  },
];

export const CUSTOMER_COLUMNS = [
  {
    field: '_id',
    headerText: 'ID',
  },
  {
    field: 'name',
    headerText: 'Name',
  },
  {
    field: 'email',
    headerText: 'Email',
  },
  {
    field: 'active',
    headerText: 'Status',
  },
];

export const ORDER_COLUMNS = [
  {
    field: '_id',
    headerText: 'ID',
  },
  {
    field: 'user',
    headerText: 'Customer',
  },
  {
    field: 'products',
    headerText: 'Product',
  },
  {
    field: 'price',
    headerText: 'Price',
  },
  {
    field: 'paid',
    headerText: 'Payment Status',
  },
];

export const POST_COLUMNS = [
  {
    field: '_id',
    headerText: 'ID',
  },
  {
    field: 'title',
    headerText: 'Title',
  },
  {
    field: 'user',
    headerText: 'Creator',
  },
];

export const ACTIONS = {
  SET_MODE: 'SET_MODE',
  SET_COLOR: 'SET_COLOR',
  SET_ACTIVE_MENU: 'SET_ACTIVE_MENU',
  SET_SCREEN_SIZE: 'SET_SCREEN_SIZE',
  SET_THEME_SETTINGS: 'SET_THEME_SETTINGS',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_ERROR: 'SET_ERROR',

  SET_LOGIN: 'SET_LOGIN',
  SET_LOGOUT: 'SET_LOGOUT',
  UPDATE_DATA: 'UPDATE_DATA',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',

  SET_EMPLOYEES: 'SET_EMPLOYEES',

  SET_COLLECTIONS: 'SET_COLLECTIONS',

  SET_PRODUCTS: 'SET_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',

  SET_CUSTOMERS: 'SET_CUSTOMERS',

  SET_ORDERS: 'SET_ORDERS',

  SET_POSTS: 'SET_POSTS',

  SET_STATS: 'SET_STATS',
};
